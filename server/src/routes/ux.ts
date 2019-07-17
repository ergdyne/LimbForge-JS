import { Router } from "express"
import UXController from "../controllers/UXController";

const router = Router()

router.get('/:accessor',UXController.getUX)

export default router