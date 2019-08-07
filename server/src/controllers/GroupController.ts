import { Request, Response } from "express"
import { getRepository, getManager, In } from "typeorm"
import { GroupState } from '../entity/ViewGroupState'
import { Group } from '../entity/Group'
import {User} from '../entity/User'
import {UserGroup} from '../entity/UserGroup'
import { GroupAttribute } from '../entity/GroupAttribute'
import { FullUserGroup } from '../entity/ViewFullUserGroup'
import { groupAccess } from "../functions/access"

export default class GroupController {
  static getGroup = async (req: Request, res: Response) => {
    //For admin - all ok
    //For groupAdmin - only groups they have groupAdmin for
    //For users - none
    let { groupId } = req.body
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(400).send({ msg: 'session failed' })
      return
    }

    const acceptableGroupIds = groupAccess(['groupAdmin'], sessionUser.viewGroups)
    //At this point, either user is admin or value is in, or reject
    if (sessionUser.siteAccess == 'admin' || acceptableGroupIds.includes(groupId)) {
      try {
        //Get the group. 
        const groupAttributes = await getRepository(GroupState).find({ where: { groupId: groupId } })

        const fullUserGroups = await getRepository(FullUserGroup).find({ where: { groupId: groupId } })
        //Get the users of the group.
        res.send({ groupAttributes: groupAttributes, userGroups: fullUserGroups })
      } catch{
        res.status(400).send()
      }
    }
    else {
      res.status(400).send()
    }

  }

  static getGroupOptions = async (req: Request, res: Response) => {
    //If session has a user with groupAccess groupAdmin, then limit results to those groups...
    //Otherwise admin or user or requested or none -> list all groups
    const sessionUser = req.session.user
    //admin gets all group options. user or groupAdmin gets some
    //TODO confirm that getGroupOptions doing triple duty like this does not cause problems.
    //A possible fix could be to add a parameter for the type of get.
    if (sessionUser == null || sessionUser.siteAccess == 'admin') {
      getRepository(GroupState).find({ where: { attribute: 'name' } })
        .then(gss =>
          res.send({ groupNames: gss.map(g => g.value) })
        )
    } else {
      const acceptableGroupIds = groupAccess(['groupAdmin', 'user'], sessionUser.viewGroups)
      getRepository(GroupState).find({ where: { attribute: 'name', groupId: In(acceptableGroupIds) } })
        .then(gss =>
          res.send({ groupNames: gss.map(g => g.value) })
        )
    }

  }

  static signUp = async (req: Request, res: Response) => {
    const { groupName } = req.body
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(400).send({ msg: 'not authorized' })
      return
    }
    //Find the group or none
    const isNewGroup = (groupName === 'New Group')
    let group: Group

    //Only care to look for a group if not 'New Group.'
    if (!isNewGroup) {
      try {
        let groupAttribute = await getRepository(GroupState).findOneOrFail({ attribute: 'name', value: groupName })
        group = await getRepository(Group).findOneOrFail(groupAttribute.groupId)
      } catch (error) {
        res.status(401).send({ msg: 'group not found' })
        return
      }
    }

    //Find user and create user group or not
    getRepository(User).findOneOrFail({ where: { id: sessionUser.id } }).then(user => {
      getManager().transaction(async transactionalEntityManager => {
        //If it has a group, then we create the userGroup
        if (!isNewGroup) {
          let userGroup = new UserGroup()
          userGroup.group = group
          userGroup.access = 'requested'
          userGroup.user = user
          await transactionalEntityManager.save(userGroup)
        }
      }).then(_result => {

        getRepository(FullUserGroup).find({ where: { userId: user.id } })
          .then(viewGroups => {
            const userData = {
              id: user.id,
              email: user.email,
              viewGroups: viewGroups,
              siteAccess: 'requested'
            }
            req.session.user = userData
            req.session.save(() => {
              return res.status(200).send(userData)
            })
          })
      })
    })
  }

  static getAll = async (req: Request, res: Response) => {
    //admin - only admin access
    //Check access.
    const sessionUser = req.session.user
    if (sessionUser == null || sessionUser.siteAccess != 'admin') {
      res.status(400).send({ msg: 'not authorized' })
      return
    }
    try {
      const groupAttributes = await getRepository(GroupState).find()
      res.send({ groupAttributes: groupAttributes })

    } catch{
      res.status(400).send()
    }
  }

  static addGroup = async (req: Request, res: Response) => {
    //for admin only
    let { name, description } = req.body
    if (!(name && description)) {
      res.status(400).send()
      return
    }

    //Check access.
    const sessionUser = req.session.user
    if (sessionUser == null || sessionUser.siteAccess != 'admin') {
      res.status(400).send({ msg: 'not authorized' })
      return
    }

    //Does the name exist
    try {
      const groupStateRepo = getRepository(GroupState)
      let groupAttribute: GroupState
      groupAttribute = await groupStateRepo.findOne({ attribute: 'name', value: name })
      //if it does, then we got an error.
      if (groupAttribute != null) {
        res.status(401).send({ msg: 'group name exists' })
        return
      }
    } catch (error) {
      //DB based error right?
      res.status(400).send()
      return
    }
    //OK lets make a group and attributes
    try {
      await getManager().transaction(async transactionalEntityManager => {
        let newGroup = new Group()
        await transactionalEntityManager.save(newGroup)
        //This could be potentially changed up if the incoming body is a list of attributes {key: , value:, type}
        //then map ()
        let groupName = new GroupAttribute()
        groupName.attribute = 'name'
        groupName.value = name
        groupName.type = 'string'
        groupName.group = newGroup
        await transactionalEntityManager.save(groupName)

        let groupDescription = new GroupAttribute()
        groupDescription.attribute = 'description'
        groupDescription.value = description
        groupDescription.type = 'string'
        groupDescription.group = newGroup
        await transactionalEntityManager.save(groupDescription)
      })

      res.send({ msg: "Group Saved" })
      return
    } catch (err) {
      res.send({ msg: "Failed to save Group" })
      return
    }
  }
}