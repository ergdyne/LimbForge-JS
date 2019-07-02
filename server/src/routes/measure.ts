import { Router } from 'express'
import MeasureController from '../controllers/MeasureController'

const router = Router()

router.post('/all',MeasureController.getMeasures)

export default router