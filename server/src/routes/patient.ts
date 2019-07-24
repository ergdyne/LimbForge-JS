import { Router } from 'express'
import PatientController from '../controllers/PatientController'

const router = Router()

router.post('/save',PatientController.savePatient)
// router.post('/save_measurements', PatientController.saveMeasurement)
router.get('/all',PatientController.getAllPatients)
router.post('/one',PatientController.getPatient)

export default router
