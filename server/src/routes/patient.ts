import { Router } from 'express'
import PatientController from '../controllers/PatientController'

const router = Router()

router.post('/save',PatientController.savePatient)
router.post('/save_measurements', PatientController.saveMeasurement)

export default router
