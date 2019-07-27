import { Router } from 'express'
import auth from './auth'
import group from './group'
import patient from './patient'
import user from './user'
import ux from './ux'

const routes = Router()

routes.use('/auth', auth)
routes.use('/group', group)
routes.use('/patient',patient)
routes.use('/user',user)
routes.use('/ux', ux)

export default routes