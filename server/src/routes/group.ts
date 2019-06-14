import { Router } from "express"
import GroupController from '../controllers/GroupController'

const router = Router()

router.post("/add",GroupController.addGroup)
router.get("/all", GroupController.getAll)
router.get("/options", GroupController.getGroupOptions)
router.post("/one", GroupController.getGroup)

export default router