import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { User } from '../entity/User'
import { FullUserGroup } from '../entity/ViewFullUserGroup'
import { ViewAdminAccess } from '../entity/ViewAdminAccess'

const saltRounds = 11

//Support function
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
  //Returns socket response for google login.
  static google = async (req: Request, res: Response) => {
    const io = req.app.get('io')
    io.in(req.session.socketId).emit('google', { loggedIn: true })
    res.end()
  }
  
  //Destroys session.
  static logout = async (req: Request, res: Response) => {
    req.session.destroy(() => res.status(200).send({ msg: 'logged out' }))
  }

  //After session has been established by passport, provide user details.
  static login = async (req: Request, res: Response) => {
    if(!req.session.passport){
      return res.status(403).send({msg:'failed to auth'})
    }

    const id =  req.session.passport.user

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
                email: user.email, //needed for admin
                viewGroups: viewGroups,
                siteAccess: admin ? 'admin' : siteAccess(viewGroups)
              }

              req.session.user = userData
              req.session.save(() => {
                return res.status(200).send(userData)
              })
            })
        })
    }).catch(error => res.status(400).send())

  }
}
