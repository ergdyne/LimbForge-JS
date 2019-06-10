import { Request, Response } from "express"
import { getRepository, getManager } from "typeorm"
import { User } from '../entity/User'
import { SiteAuth } from '../entity/SiteAuth'
import { GroupState } from '../entity/ViewGroupState'
import { UserGroup } from '../entity/UserGroup'
import { Group } from '../entity/Group'
import { ViewSiteAuth } from '../entity/ViewSiteAuth'

export default class AuthController {
  //TODO do full implimentation of security
  //And don't forget about seeding...
  static signUp = async (req: Request, res: Response) => {
    let { email, auth, groupName } = req.body
    if (!(email && auth && groupName)) {
      res.status(400).send()
    }

    //Confirm the group exists or is 'New Group' flag
    const isNewGroup = (groupName === 'New Group')
    const groupRepo = getRepository(Group)
    let group: Group

    //Only care to look for a group if not 'New Group.'
    if (!isNewGroup) {
      try {
        const groupStateRepo = getRepository(GroupState)
        let groupAttribute: GroupState
        groupAttribute = await groupStateRepo.findOneOrFail({ attribute: 'name', value: groupName })
        group = await groupRepo.findOneOrFail(groupAttribute.groupId)
      } catch (error) {
        res.status(401).send({ msg: 'group not found' })
      }
    }

    //Set up user and the main relations.
    let user = new User()
    user.email = email

    let siteAuth = new SiteAuth()
    siteAuth.hash = auth

    //Save the data. Note: can use decorators here too.
    try {
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(user)
        siteAuth.user = user
        await transactionalEntityManager.save(siteAuth)

        //If it has a group, then we create the userGroup
        if (!isNewGroup) {
          let userGroup = new UserGroup()
          userGroup.group = group
          userGroup.access = 'requested'
          userGroup.user = user
          await transactionalEntityManager.save(userGroup)
        }
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
    const authViewRepo = getRepository(ViewSiteAuth)

    let user: User
    let authView: ViewSiteAuth
    try {
      user = await userRepo.findOneOrFail({ where: { email } })
      authView = await authViewRepo.findOneOrFail({ userId: user.id })
    } catch (error) {
      res.status(401).send()
    }
    console.log('user', user, 'auth', authView)
    if (authView.hash === auth) {
      const userData = {
        id: user.id,
        email: user.email,
        siteAccess: '',
        //groups: [] //needs another view
        //groupId, name, description, access
      }

      res.status(200).send(user)
    } else {
      res.status(409).send({ msg: 'Authorization is not valid.' })
    }


  }

}