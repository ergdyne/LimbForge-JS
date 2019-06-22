import { Request, Response } from "express"
import { getRepository, getManager, In } from "typeorm"
import _ from 'underscore'
import { Group } from '../entity/Group'
import { User } from '../entity/User'
import { UserGroup } from '../entity/UserGroup'
import { FullUserGroup } from '../entity/ViewFullUserGroup'
import { GroupState } from '../entity/ViewGroupState'
import { ViewAdminAccess } from "../entity/ViewAdminAccess"
import { groupAccess } from "../functions/access"

const groupAccessLevels = ['user', 'groupAdmin', 'requested', 'none']

//Group access deal

export default class UserController {
  //CONTROL
  //Promote/demote User (includes approve)
  //Admin - all - only admin can demote a groupAdmin. Only person with access to DB can remove admin rights
  //If someone has access to the DB, they aready have access to everything.
  //groupAdmin - can promote/demote requested/none to user, promote user/requested/none to groupAdmin

  static getUser = async (req: Request, res: Response) => {
    let { userId } = req.body
    //TODO change this repeated code to be function
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(400).send({ msg: 'session failed' })
    }
    //Need the user, admin access (for promotion option), and groups
    //CONTROL-OK
    try {
      getRepository(User).findOneOrFail({ where: { id: userId } })
        .then(user => {
          getRepository(FullUserGroup).find({ where: { userId: userId } })
            .then(fullUserGroups => {
              const adminAccessRepo = getRepository(ViewAdminAccess)
              adminAccessRepo.findOne({ where: { userId: userId } })
                .then(adminAccess => {

                  const sessionGroupIds = groupAccess(['groupAdmin'], sessionUser.viewGroups)
                  const usersGroupIds = fullUserGroups.map(fug => fug.groupId)
                  const commonGroups = _.intersection(sessionGroupIds, usersGroupIds)
                  //If session is admin - OK
                  //If session is groupAdmin -> must share group + fullUserGroups limited session groupAdmin
                  //otherwise -> only session user information
                  if (sessionUser.siteAccess == 'admin' || commonGroups.length > 0 || user.id == sessionUser.id) {
                    const userData = {
                      id: user.id,
                      email: user.email,
                      fullUserGroups: fullUserGroups,
                      isAdmin: (adminAccess == null) ? false : adminAccess.isAdmin
                    }
                    //success
                    res.send(userData)
                  } else {
                    res.status(400).send({ msg: 'not authorized' })
                  }
                })
            })
        }).catch(err => res.status(400).send(err))
    } catch (err) {

      res.status(400).send(err)
    }
  }
  static getAllUsers = async (req: Request, res: Response) => {
    //TODO change this repeated code to be function
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(400).send({ msg: 'session failed' })
    }
    //CONTROL - OK
    //if user admin -All
    //if user groupAdmin -user from their groups
    //otherwise -> reject
    if (sessionUser.siteAccess == 'admin') {
      getRepository(FullUserGroup).find()
        .then(fugs =>
          res.send({ fullUserGroups: fugs })
        )
    } else {

      const acceptableGroupIds = groupAccess(['groupAdmin'], sessionUser.viewGroups)
      getRepository(FullUserGroup).find({ where: { groupId: In(acceptableGroupIds) } })
        .then(fugs =>
          res.send({ fullUserGroups: fugs })
        )
      //TODO reject case?
    }
  }
  static addUser = async (req: Request, res: Response) => {
    //TODO check if user has authority
    //CONTROL - BROKEN
    //admin -> anything - works?
    //groupAdmin -> only session groups with groupAdmin - doesn't work at all in either
    console.log('adduser',req.session.user)
    let { email, userGroupAccess, groupName } = req.body

    console.log(email, userGroupAccess,groupName)
    if (!(email && userGroupAccess && groupName && groupAccessLevels.includes(userGroupAccess))) {
      res.status(400).send()
      return
    }

    //Standard reject if no session
    const sessionUser = req.session.user
    console.log('user',sessionUser)
    if (sessionUser == null) {
      res.status(400).send({ msg: 'session failed' })
    }

    //Find if the user exists.
    getRepository(User).findOne({ where: { email: email } })
      .then(user => {
        if (user != null) {
          //If exists, then meh... maybe in the future will go through access
          res.status(409).send({ msg: 'email is already registered' })
          return
        }
        //OK, we can check on the group
        //Copy paste from Auth controller... so think about functions...
        try {
          getRepository(GroupState).findOneOrFail({ attribute: 'name', value: groupName })
            .then(groupState => {
              getRepository(Group).findOneOrFail(groupState.groupId)
                .then(group => {
                  //have a group and no user
                  //we want to create the user and user group
                  console.log('group found')
                  const acceptableGroupIds = groupAccess(['groupAdmin'], sessionUser.viewGroups)
                  //At this point, either user is admin or value is in, or reject
                  console.log('site access',sessionUser.siteAccess)
                  if (sessionUser.siteAccess == 'admin' || acceptableGroupIds.includes(group.id)) {
                    getManager().transaction(async transactionalEntityManager => {
                      let newUser = new User()
                      newUser.email = email.toLowerCase()
                      await transactionalEntityManager.save(newUser)
                      let userGroup = new UserGroup()
                      userGroup.group = group
                      userGroup.access = userGroupAccess
                      userGroup.user = newUser
                      await transactionalEntityManager.save(userGroup)
                    }).then(_ => res.send({ msg: 'user created' }))
                  }else{
                    res.send({msg: 'not authorized'})
                  }
                })
            })
        } catch (error) {
          res.status(401).send({ err: error, msg: 'some problem finding or creating' })
          return
        }

      }).catch(err =>
        res.status(400).send(err)
      )
  }
}