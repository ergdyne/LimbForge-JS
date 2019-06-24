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
  //CONTROL - can be rolled into addUser
  //Promote/demote User (includes approve)
  //TODO create function to roll checks into addUser
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
    //CONTROL - OK - TODO retest - some weird error despite users created
    //admin -> anything - works?
    //groupAdmin -> only session groups with groupAdmin
    let { email, userGroupAccess, groupName } = req.body
    if (!(email && userGroupAccess && groupName && groupAccessLevels.includes(userGroupAccess))) {
      res.status(400).send()
      return
    }

    //Standard reject if no session
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(400).send({ msg: 'session failed' })
    }

    //Find if the user exists.
    getRepository(User).findOne({ where: { email: email } })
      .then(user => {
        //OK, we can check on the group
        getRepository(GroupState).findOneOrFail({ attribute: 'name', value: groupName })
          .then(groupState => {
            getRepository(Group).findOneOrFail(groupState.groupId)
              .then(group => {
                //have a group and maybe a user
                const acceptableGroupIds = groupAccess(['groupAdmin'], sessionUser.viewGroups)
                //At this point, either user is admin or value is in, or reject
                if (sessionUser.siteAccess == 'admin' || acceptableGroupIds.includes(group.id)) {
                  try {
                    getManager().transaction(async transactionalEntityManager => {
                      function createUserGroup(g: Group, a: string, u: User) {
                        let userGroup = new UserGroup()
                        userGroup.group = g
                        userGroup.access = a
                        userGroup.user = u
                        return userGroup
                      }
                      //For the user doesn't exist -> creat it and add it to the group.
                      if (user == null) {
                        let newUser = new User()
                        newUser.email = email.toLowerCase()
                        await transactionalEntityManager.save(newUser)
                        await transactionalEntityManager.save(createUserGroup(group, userGroupAccess, newUser))
                      } else {
                        //user exists, add to a group -> this is another way to approve people.
                        //In fact, this route could be reused for access control adjustments
                        await transactionalEntityManager.save(createUserGroup(group, userGroupAccess, user))
                      }
                    }).then(_ => {
                      res.send({ msg: 'user created' })
                    })
                  }catch (error) { res.send({msg:`rejected`})}
                } else {
                  res.send({ msg: 'not authorized' })
                }
              })
          })

      }).catch(err =>
        res.status(400).send(err)
      )
  }
}