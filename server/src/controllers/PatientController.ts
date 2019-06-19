import { Request, Response } from "express"
import { getManager, getRepository, In } from "typeorm"
import { Patient } from '../entity/Patient'
import { Group } from '../entity/Group'
import { PatientGroup } from '../entity/PatientGroup'
import { PatientAttribute } from '../entity/PatientAttribute'
import { PatientState } from '../entity/ViewPatientState'
import { Measure } from '../entity/Measure'
import { MeasureState } from '../entity/ViewMeasureState'
import { PatientMeasurement } from '../entity/PatientMeasurement'
import { PatientMeasurementState } from '../entity/ViewPatientMeasurementState'
import { groupAccess } from "../functions/access"
import { ViewPatientGroup } from "../entity/ViewPatientGroup"

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
  //CONTROL-OK
  //Admin - all
  //groupAdmin or User -> only if patient in a group that the user has user or groupAdmin access for
  //Untested due to reloading killing cookie
  static getPatient = async (req: Request, res: Response) => {
    let { patientId } = req.body
    const sessionUser = req.session.user

    if(sessionUser == null) {
      
      res.status(400).send({ msg: 'session failed' })
    }
    getRepository(PatientState).find({ where: { patientId: patientId } })
      .then(pss => {
        getRepository(PatientMeasurementState).find({ where: { patientId: patientId } })
          .then(pmss => {
            if (sessionUser.siteAccess == 'admin') {
              res.send({ patientStates: pss, patientMeasurementStates: pmss })
            } else {
              //Get patient's grou
              try {
                const acceptableGroupIds = groupAccess(['user', 'groupAdmin'], sessionUser.viewGroups)
                getRepository(ViewPatientGroup)
                  .findOneOrFail({
                    where: {
                      patientId: patientId,
                      groupId: In(acceptableGroupIds)
                    }
                  }).then(_result => res.send({ patientStates: pss, patientMeasurementStates: pmss }))
              } catch{
                res.status(400).send({ msg: 'no access' })
                return
              }
            }
          })

      })
      .catch(err => res.status(400).send(err))
  }

  //CONTROL-OK
  //Admin - all
  //groupAdmin or User -> only patients in groups that the user has user or groupAdmin access for
  //Tested for user... seems to work
  static getAllPatients = async (req: Request, res: Response) => {
    //Auth stuff and limit to user's groups, or no limit if admin
    const sessionUser = req.session.user
    if(sessionUser == null) {
      console.log('session failed in getPatients')
      res.status(400).send({ msg: 'session failed' })
    }

    if (sessionUser.siteAccess == 'admin') {
      getRepository(PatientState).find()
        .then(patients => {
          res.send(patients)
        }).catch(err => res.status(400).send(err))
    } else {
      const acceptableGroupIds = groupAccess(['user', 'groupAdmin'], sessionUser.viewGroups)
      getRepository(PatientState).find({ where: { groupId: In(acceptableGroupIds) } })
        .then(patients => {
          res.send(patients)
        }).catch(err => res.status(400).send(err))
    }
  }

  static saveMeasurement = async (req: Request, res: Response) => {
    let { measurements, patientId } = req.body
    //Going to create Patient Measurements
    //CONTROL-OK
    //For any user, groupadmin, or admin go ahead
    const sessionUser = req.session.user
    if(sessionUser == null) {
      console.log('session failed in saveMeasurement')
      res.status(400).send({ msg: 'session failed' })
    }

    if (['admin', 'groupAdmin', 'user'].includes(sessionUser.siteAccess)) {
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
    } else {
      res.status(400).send({ msg: 'not authorized' })
    }
  }
  static savePatient = async (req: Request, res: Response) => {
    //CONTROL-OK
    //For any user, groupadmin, or admin go ahead
    const sessionUser = req.session.user
    if(sessionUser == null) {
      console.log('session failed in saveMeasurement')
      res.status(400).send({ msg: 'session failed' })
    }

    if (['admin', 'groupAdmin', 'user'].includes(sessionUser.siteAccess)) {
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
    }else{
      res.status(400).send({ msg: 'not authorized' })
    }
  }
}