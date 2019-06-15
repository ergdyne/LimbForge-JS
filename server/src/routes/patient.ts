import { Router } from 'express'
import PatientController from '../controllers/PatientController'

const router = Router()

router.post('/save',PatientController.savePatient)

export default router
