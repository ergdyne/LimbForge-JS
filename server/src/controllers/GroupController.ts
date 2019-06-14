import { Request, Response } from "express"
import { getRepository, getManager } from "typeorm"
import { GroupState } from '../entity/ViewGroupState'
import { Group } from '../entity/Group'
import { GroupAttribute } from '../entity/GroupAttribute'
import {FullUserGroup} from '../entity/ViewFullUserGroup'

export default class GroupController {
  static getGroup = async (req: Request, res: Response) => {
    //Also requires user session bit
    let { groupId } = req.body
    try {
      //Get the group. 
      const groupAttributes = await getRepository(GroupState).find({ where: { groupId: groupId } })

      const fullUserGroups = await getRepository(FullUserGroup).find({ where: { groupId: groupId } })
      //Get the users of the group.
      res.send({ groupAttributes: groupAttributes, userGroups:fullUserGroups })
    } catch{
      res.status(400).send()
    }

  }

  static getGroupOptions = async (req: Request, res: Response) => {
    //Maybe some filtering here...
    try {
      getRepository(GroupState).find({where:{attribute:'name'}})
      .then(gss => 
        res.send({ groupNames: gss.map(g=>g.value) })
      )
      
    } catch{
      res.status(400).send()
    }
  }

  static getAll = async (req: Request, res: Response) => {
    //TODO would add in a user session bit.
    try {
      const groupAttributes = await getRepository(GroupState).find()
      res.send({ groupAttributes: groupAttributes })

    } catch{
      res.status(400).send()
    }
  }
  static addGroup = async (req: Request, res: Response) => {
    let { name, description } = req.body
    if (!(name && description)) {
      res.status(400).send()
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