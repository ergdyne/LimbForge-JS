import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import passport from 'passport'

const router = Router()

const googleAuth = passport.authenticate('google', {scope:['profile','https://www.googleapis.com/auth/userinfo.email']})

router.post('/login',AuthController.login)
router.get('/logout',AuthController.logout)
router.post('/signup',AuthController.signUp)

router.get('/google/callback', googleAuth, AuthController.google)

router.get('/google', googleAuth)

export default router
