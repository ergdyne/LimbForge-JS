import { Request, Response } from "express"
import { getRepository, getManager } from "typeorm"
import { User } from '../entity/User'
import {SiteAuth} from '../entity/SiteAuth'
import {GroupState} from '../entity/ViewGroupState'
import {UserGroup} from '../entity/UserGroup'
import {Group} from '../entity/Group'

export default class AuthController {
  //TODO do full implimentation of security
  //And don't forget about seeding...
  static signUp = async (req: Request, res: Response) => {
    let { email, auth, groupName } = req.body
    if (!(email && auth && groupName)) {
      res.status(400).send()
    }

    //TODO handle the New Group version
    //Confirm the group exists
    const groupStateRepo = getRepository(GroupState)
    const groupRepo = getRepository(Group)
    let groupAttribute: GroupState
    let group: Group

    try {
      groupAttribute = await groupStateRepo.findOneOrFail({attribute:'name', value: groupName})
      group = await groupRepo.findOneOrFail(groupAttribute.groupId)
    } catch (error) {
      res.status(401).send({msg:'group not found'})
    }

    console.log('g',group)
    //Set up user and the main relations
    let user = new User()
    user.email = email

    let siteAuth = new SiteAuth()
    siteAuth.hash = auth

    let userGroup = new UserGroup()
    userGroup.group = group
    userGroup.access = 'requested'

    //Save the data. Note: can use decorators here too.
    try {
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(user)
        siteAuth.user = user
        userGroup.user = user
        await transactionalEntityManager.save(siteAuth)
        await transactionalEntityManager.save(userGroup)
      })
    } catch (error) {
      res.status(409).send({ msg: 'email is already registered' })
    }
    res.send(user)
  }


  static login = async (req: Request, res: Response) => {

    let { email, auth } = req.body
    if (!(email && auth)) {
      res.status(400).send()
    }

    const userRepo = getRepository(User)

    let user: User
    try {
      user = await userRepo.findOneOrFail({ where: { email } })
    } catch (error) {
      res.status(401).send()
    }

    res.send(user)
  }



}