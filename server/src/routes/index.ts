import { Router, Request, Response } from 'express'
import auth from './auth'
import group from './group'

const routes = Router()

routes.use('/auth', auth)
routes.use('/group', group)


export default routes