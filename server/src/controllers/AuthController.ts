import { Request, Response } from "express"
import { getRepository, getManager } from "typeorm"
import { User } from '../entity/User'
import { SiteAuth } from '../entity/SiteAuth'
import { GroupState } from '../entity/ViewGroupState'
import { UserGroup } from '../entity/UserGroup'
import { Group } from '../entity/Group'
import { ViewSiteAuth } from '../entity/ViewSiteAuth'
import { ViewGroups } from '../entity/ViewGroups'
import { ViewAdminAccess } from "../entity/ViewAdminAccess"

//Support functions
function siteAccess(vg: ViewGroups[]){
  const accessLevels = vg.map(g=>g.access)

  if(accessLevels.includes('groupAdmin')){
    return 'groupAdmin'
  }

  if(accessLevels.includes('user')){
    return 'user'
  }
  return 'requested'
}


export default class AuthController {
  //TODO do full implimentation of security
  static signUp = async (req: Request, res: Response) => {
    let { email, auth, groupName } = req.body
    if (!(email && auth && groupName)) {
      res.status(400).send()
      return
    }

    //Does the User Exists
    const userRepo = getRepository(User)
    const authViewRepo = getRepository(ViewSiteAuth)
    let user: User

    let authView: ViewSiteAuth
    try {
      user = await userRepo.findOne({ where: { email } })

      //If user, then get the authView
      if (user != null) {
        authView = await authViewRepo.findOne({ userId: user.id })
      }

    } catch (error) {
      res.status(401).send({ msg: "error at lookup" })
      return
    }

    //If both the user and auth exists, then the user is already registered
    if (user != null && authView != null) {
      res.status(409).send({ msg: 'email is already registered' })
      return
    }

    //if the user exists, but no auth record, then the user was preapproved
    if (user != null) {
      //Ignore the group
      //Set auth
      try {
        await getManager().transaction(async transactionalEntityManager => {
          let siteAuth = new SiteAuth()
          siteAuth.user = user
          siteAuth.hash = auth
          await transactionalEntityManager.save(siteAuth)
        })
        //TODO run a full login thing
        res.send({ msg: "Set login and password - should return what you need to login" })
        return
      } catch (err) {
        res.send({ msg: "Failed to Save SiteAuth" })
        return
      }
    }

    //Now it is the normal Signup stuff for a user that wasn't preapproved

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
        return
      }
    }

    //Set up user and the main relations.
    let newUser = new User()
    newUser.email = email

    //Save the data. Note: can use decorators here too.
    try {
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(newUser)
        let siteAuth = new SiteAuth
        siteAuth.hash = auth
        siteAuth.user = newUser
        //TODO ENCRYPT USING BCRYPT!!!!
        await transactionalEntityManager.save(siteAuth)

        //If it has a group, then we create the userGroup
        if (!isNewGroup) {
          let userGroup = new UserGroup()
          userGroup.group = group
          userGroup.access = 'requested'
          userGroup.user = newUser
          await transactionalEntityManager.save(userGroup)
        }
        //If it is a new group, we created a request with not group. This will be handled in the front end?
      })
    } catch (error) {
      res.status(409).send({ msg: 'email is already registered' })
      return
    }
    res.send({msg: 'would return temporary login stuff'})

    //Can I create a function that takes in the response?
  }

  static login = async (req: Request, res: Response) => {
    let { email, auth } = req.body
    if (!(email && auth)) {
      res.status(400).send()
      return
    }

    const userRepo = getRepository(User)
    const authViewRepo = getRepository(ViewSiteAuth)

    let user: User
    let authView: ViewSiteAuth
    try {
      //Does the user exist?
      user = await userRepo.findOneOrFail({ where: { email } })
      authView = await authViewRepo.findOneOrFail({ userId: user.id })
    } catch (error) {
      res.status(401).send()
      return
    }

    if (authView.hash === auth) {
      //If auth passes
      let viewGroups: ViewGroups[]
      let adminAccess: ViewAdminAccess
      try {
        const viewGroupsRepo = getRepository(ViewGroups)
        const adminAccessRepo = getRepository(ViewAdminAccess)
        //ViewGroups can be converted into "Group" objects in a non-typesafe way on the client side.
        //See that function for more explaination.
        viewGroups = await viewGroupsRepo.find({ where: { userId: user.id } })
        adminAccess = await adminAccessRepo.findOne({where:{userId: user.id}})
      } catch (error) {
        res.status(401).send()
        return
      }

      const admin = (adminAccess ==null)?false:adminAccess.isAdmin

      const userData = {
        id: user.id,
        email: user.email,
        viewGroups: viewGroups,
        siteAccess: admin?'admin':siteAccess(viewGroups)
      }
      res.status(200).send(userData)
      return

    } else {
      res.status(409).send({ msg: 'Authorization is not valid.' })
      return
    }
  }
}