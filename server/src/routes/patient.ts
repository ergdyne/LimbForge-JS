import { Router } from 'express'
import PatientController from '../controllers/PatientController'

const router = Router()

router.post('/save',PatientController.savePatient)
router.post('/save_device', PatientController.saveDevice)
router.get('/all',PatientController.getAllPatients)
router.post('/one',PatientController.getPatient)
router.post('/delete',PatientController.deletePatient)

export default router
