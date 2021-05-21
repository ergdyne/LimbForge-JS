import { Router, Request,Response,NextFunction } from 'express'
import AuthController from '../controllers/AuthController'
import passport from 'passport'

const router = Router()

const googleAuth = passport.authenticate('google', {scope:['profile','https://www.googleapis.com/auth/userinfo.email']})

router.get('/login', AuthController.login)
router.get('/logout', AuthController.logout)

router.get('/google/callback', googleAuth, AuthController.google)

function addSocketIdtoSession(req:Request, res:Response, next:NextFunction){
  req.session.socketId = req.query.socketId
  next()
}

router.get('/google', addSocketIdtoSession, googleAuth)

export default router
