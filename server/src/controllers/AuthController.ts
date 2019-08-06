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
  static google = async (req: Request, res: Response) => {
    const io = req.app.get('io')

    io.in(req.session.socketId).emit('google', { loggedIn: true })
    res.end()//on login, run the request for user details
  }
  static logout = async (req: Request, res: Response) => {
    req.session.destroy(() => res.send({ msg: 'logged out' }))
  }

  static login = async (req: Request, res: Response) => {
    const id = req.session.passport.user

    //FullUserGroup can be converted into "Group" objects in a non-typesafe way on the client side.
    //See that function for more explaination.
    getRepository(User).findOneOrFail({ where: { id: id } }).then(user => {
      getRepository(FullUserGroup).find({ where: { userId: id } })
        .then(viewGroups => {
          getRepository(ViewAdminAccess).findOne({ where: { userId: id } })
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
    }).catch(error => res.status(401).send())

  }
}
