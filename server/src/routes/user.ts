import { Router } from 'express'
import Usercontroller from '../controllers/UserController'

const router = Router()

router.post('/add',Usercontroller.addUser)
router.post('/one',Usercontroller.getUser)
router.get('/all', Usercontroller.getAllUsers)

export default router