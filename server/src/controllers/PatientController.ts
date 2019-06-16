import { Request, Response } from "express"
import { Patient } from '../entity/Patient'
import { Group } from '../entity/Group'
import { PatientGroup } from '../entity/PatientGroup'
import { PatientAttribute } from '../entity/PatientAttribute'
import { PatientState } from '../entity/ViewPatientState'
import { Measure } from '../entity/Measure'
import { MeasureState } from '../entity/ViewMeasureState'
import { PatientMeasurement } from '../entity/PatientMeasurement'
import { PatientMeasurementState } from '../entity/ViewPatientMeasurementState'

import { getManager, getRepository } from "typeorm"

function patientInputsToAttributes(p: Patient, inputs: { attribute: string; value: string; type: string; }[]) {
  return inputs.map(i => {
    let a = new PatientAttribute()
    a.attribute = i.attribute
    a.value = i.value
    a.type = i.type
    a.patient = p
    return a
  })
}

export default class PatientController {
  static getPatient = async (req: Request, res: Response) => {
    let { patientId } = req.body
    getRepository(PatientState).find({ where: { patientId: patientId } })
      .then(pss => {
        getRepository(PatientMeasurementState).find({where:{ patientId: patientId }})
        .then(pmss=>{
          res.send({patientStates:pss,patientMeasurementStates:pmss})
        })

      })
      .catch(err => res.status(400).send(err))
  }

  static getAllPatients = async (req: Request, res: Response) => {
    //Auth stuff and limit to user's groups, or no limit if admin
    console.log('user',req.session, req.sessionID)
    getRepository(PatientState).find()
      .then(patients => {
        res.send(patients)
      }).catch(err => res.status(400).send(err))

  }

  static saveMeasurement = async (req: Request, res: Response) => {
    let { measurements, patientId } = req.body
    //Going to create Patient Measurements
    try {
      //Get the patient
      getRepository(Patient).findOneOrFail(patientId).then(patient => {
        measurements.forEach((m: { accessor: string; value: string; }) => {
          let measurement = new PatientMeasurement()
          getRepository(MeasureState).findOne({ where: { attribute: 'accessor', value: m.accessor } })
            .then(ms => {
              getRepository(Measure).findOne({ where: { id: ms.measureId } })
                .then(measure => {
                  measurement.patient = patient
                  measurement.measure = measure
                  measurement.value = parseFloat(m.value)//not safe
                  getRepository(PatientMeasurement).save(measurement)//.then(x=>{console.log('ok...',x)})
                })
            })
        })
      })
      res.send({ patientId: patientId, msg: 'measurements saved' })
    } catch (err) {
      res.status(400).send(err)
    }
  }
  static savePatient = async (req: Request, res: Response) => {
    //incoming list of {attribute, value:string, type (string or date)}
    let { patientInputs, groupId, patientId } = req.body
    //Existing patient case is different then new one
    if (patientId != null) {
      try {
        getRepository(Patient).findOneOrFail(patientId).then(patient => {
          let patientAttributes = patientInputsToAttributes(patient, patientInputs).filter(p => p.value != null)
          getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(patientAttributes)
          }).then(_ => res.send({ patientId: patientId, msg: 'updated' }))
        })
      } catch (err) {
        res.status(400).send(err)
      }

    } else {
      //new patient
      //TODO replace 1 with groupId
      try {
        getRepository(Group).findOneOrFail(1).then(group => {
          let newPatient = new Patient()
          getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(newPatient)
            let patientGroup = new PatientGroup()
            patientGroup.patient = newPatient
            patientGroup.group = group
            await transactionalEntityManager.save(patientGroup)

            let patientAttributes = patientInputsToAttributes(newPatient, patientInputs).filter(p => p.value != null)

            await transactionalEntityManager.save(patientAttributes)

          }).then(_ => res.send({ patientId: newPatient.id, msg: 'new patient' }))
        })
      } catch (err) {
        res.status(400).send(err)
      }
    }
  }
}