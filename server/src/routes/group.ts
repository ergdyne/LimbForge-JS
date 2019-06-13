import { Router } from "express"
import GroupController from '../controllers/GroupController'

const router = Router()

router.post("/add",GroupController.addGroup)

export default router