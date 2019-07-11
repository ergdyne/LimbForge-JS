import { Router } from 'express'
import AuthController from '../controllers/AuthController'

const router = Router()

router.post('/login',AuthController.login)
router.get('/logout',AuthController.logout)
router.post('/signup',AuthController.signUp)

export default router