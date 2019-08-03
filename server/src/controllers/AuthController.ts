import { Request, Response } from "express"
import { getRepository, getManager } from "typeorm"
import bcrypt from 'bcrypt'
import { User } from '../entity/User'
import { SiteAuth } from '../entity/SiteAuth'
import { GroupState } from '../entity/ViewGroupState'
import { UserGroup } from '../entity/UserGroup'
import { Group } from '../entity/Group'
import { ViewSiteAuth } from '../entity/ViewSiteAuth'
import { FullUserGroup } from '../entity/ViewFullUserGroup'
import { ViewAdminAccess } from '../entity/ViewAdminAccess'

const saltRounds = 11

//Support functions
function siteAccess(vg: FullUserGroup[]) {
  const accessLevels = vg.map(g => g.access)

  if (accessLevels.includes('groupAdmin')) {
    return 'groupAdmin'
  }

  if (accessLevels.includes('user')) {
    return 'user'
  }
  return 'requested'
}

export default class AuthController {
  static google = async(req: Request, res: Response) =>{
    console.log('google auth')
    res.send("hello from google")
  }
  static logout = async (req: Request, res: Response) => {
    req.session.destroy(() => res.send({ msg: 'logged out' }))
  }

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
      user = await userRepo.findOne({ where: { email: email.toLowerCase() } })

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
      bcrypt.hash(auth, saltRounds, (err, hash) => {
        if (!err) {
          try {
            getManager().transaction(async transactionalEntityManager => {
              let siteAuth = new SiteAuth()
              siteAuth.user = user
              //BCRYPT HERE
              siteAuth.hash = hash
              await transactionalEntityManager.save(siteAuth)
            }).then(_result => {
              //need viewGroups and admin access even though it should be rare.
              //TODO part of the functionalize code todo (this is repeated code)
              getRepository(FullUserGroup).find({ where: { userId: user.id } })
                .then(viewGroups => {
                  getRepository(ViewAdminAccess).findOne({ where: { userId: user.id } })
                    .then(adminAccess => {
                      const admin = (adminAccess == null) ? false : adminAccess.isAdmin
                      const userData = {
                        id: user.id,
                        email: user.email,
                        viewGroups: viewGroups,
                        siteAccess: admin ? 'admin' : siteAccess(viewGroups)
                      }
                      req.session.user = userData
                      req.session.save(() => {
                        return res.status(200).send(userData)
                      })
                    })
                })
            })
          } catch (err) {
            res.send({ msg: "Failed to Save SiteAuth" })
            return
          }
        } else {
          res.send({ msg: 'bcrypt error' })
          return
        }

      })
    }

    //Now it is the normal Signup stuff for a user that wasn't preapproved

    //Confirm the group exists or is 'New Group' flag
    const isNewGroup = (groupName === 'New Group')
    let group: Group

    //Only care to look for a group if not 'New Group.'
    if (!isNewGroup) {
      try {
        const groupStateRepo = getRepository(GroupState)
        let groupAttribute: GroupState
        groupAttribute = await groupStateRepo.findOneOrFail({ attribute: 'name', value: groupName })
        group = await getRepository(Group).findOneOrFail(groupAttribute.groupId)
      } catch (error) {
        res.status(401).send({ msg: 'group not found' })
        return
      }
    }

    //Set up user and the main relations.
    let newUser = new User()
    newUser.email = email.toLowerCase()

    //Save the data. Note: can use decorators here too.
    bcrypt.hash(auth, saltRounds, (err, hash) => {
      if (!err) {
        try {
          getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(newUser)
            let siteAuth = new SiteAuth
            siteAuth.hash = hash
            siteAuth.user = newUser
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
          }).then(_result => {
            //For the result, we don't need to check on anything else
            const viewGroups: FullUserGroup[] = []
            const userData = {
              id: newUser.id,
              email: newUser.email,
              viewGroups: viewGroups,
              siteAccess: 'requested'
            }
            req.session.user = userData
            req.session.save(() => {
              return res.status(200).send(userData)
            })
          })
        } catch (error) {
          res.status(409).send({ msg: 'email is already registered' })
          return
        }
      } else {
        res.send({ msg: 'bcrypt error' })
      }
    })
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

    //BCRYPT HERE
    bcrypt.compare(auth, authView.hash, (err, result) => {
      if (!err && result) {
        //If auth passes

        //FullUserGroup can be converted into "Group" objects in a non-typesafe way on the client side.
        //See that function for more explaination.
        getRepository(FullUserGroup).find({ where: { userId: user.id } })
          .then(viewGroups => {
            getRepository(ViewAdminAccess).findOne({ where: { userId: user.id } })
              .then(adminAccess => {
                const admin = (adminAccess == null) ? false : adminAccess.isAdmin
                const userData = {
                  id: user.id,
                  email: user.email,
                  viewGroups: viewGroups,
                  siteAccess: admin ? 'admin' : siteAccess(viewGroups)
                }

                req.session.user = userData
                req.session.save(() => {
                  return res.status(200).send(userData)
                })
              })
          }).catch(error => res.status(401).send())
      } else {
        res.status(409).send({ msg: 'Authorization is not valid.' })
        return
      }
    })

  }
  //TODO password reset type things
}