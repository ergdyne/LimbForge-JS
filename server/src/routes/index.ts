import { Router } from 'express'
import auth from './auth'
import group from './group'
import user from './user'

const routes = Router()

routes.use('/auth', auth)
routes.use('/group', group)
routes.use('/user',user)


export default routes