import passport from 'passport'
import passportLocal from "passport-local"
import { Request, Response } from "express"
import User from '../entity/User'
import { getRepository, getManager } from "typeorm"
import { ViewSiteAuth } from '../entity/ViewSiteAuth'
import { FullUserGroup } from '../entity/ViewFullUserGroup'
import { ViewAdminAccess } from '../entity/ViewAdminAccess'

//TEMP location
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

export const passportConfig = () => {

  passport.serializeUser<any, any>((user, cb) => {
    console.log('serializing', user)
    cb(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    //uhm...
    console.log('deserializing', id)
    getRepository(User).findOne({ where: { id: id } })
      .then(user => done(null, user))
  })

  const LocalStrategy = passportLocal.Strategy


  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'auth'
  },(email, auth, done) => {
    console.log('pp inside')
    //Check if user exits
    getRepository(User).findOneOrFail({ where: { email: email.toLowerCase() } })
      .then(user => {
        //check if authoerized
        const authViewRepo = getRepository(ViewSiteAuth)
        authViewRepo.findOneOrFail({ userId: user.id })
          .then(authView => {
            //check if auth
            //TODO make it bcrypt
            if (authView.hash === auth) {
              // //good
              // let viewGroups: FullUserGroup[]
              // let adminAccess: ViewAdminAccess

              const viewGroupsRepo = getRepository(FullUserGroup)

              viewGroupsRepo.find({ where: { userId: user.id } })
                .then(viewGroups => {
                  const adminAccessRepo = getRepository(ViewAdminAccess)
                  adminAccessRepo.findOne({ where: { userId: user.id } })
                    .then(adminAccess => {
                      const admin = (adminAccess == null) ? false : adminAccess.isAdmin

                      const userData = {
                        id: user.id,
                        email: user.email,
                        viewGroups: viewGroups,
                        siteAccess: admin ? 'admin' : siteAccess(viewGroups)
                      }
                      console.log('everything is good, so done...')
                      done(undefined, userData)
                    })
                })
              //catch?
              //return 
            } else {

              done(undefined, false, { message: "Invalid email or password." })
            }
          })
        //do need catch?

      })
      .catch(error => done(undefined, false, { message: "Invalid email or password." }))

  }))
}
