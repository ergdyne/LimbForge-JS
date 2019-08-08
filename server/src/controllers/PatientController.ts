import { Request, Response } from "express"
import { getManager, getRepository, In } from "typeorm"
import { Patient } from '../entity/Patient'
import { PatientRecord } from '../entity/PatientRecord'
import { Record } from '../entity/Record'
import { Group } from '../entity/Group'
import { PatientGroup } from '../entity/PatientGroup'
import { PatientRecordState } from '../entity/ViewPatientRecordState'
import { groupAccess } from "../functions/access"
import { ViewPatientGroup } from "../entity/ViewPatientGroup"
import { GroupState } from "../entity/ViewGroupState"
import { PatientDevice } from "../entity/PatientDevice"
import { PatientDeviceRecord } from "../entity/PatientDeviceRecord"
import { PatientDeviceRecordState } from "../entity/ViewPatientDeviceRecordState"
import { Device } from "../entity/Device"

async function inputToPatientRecord(patient: Patient, input: { recordId: number; value: string; }) {
  return getRepository(Record).findOneOrFail(input.recordId).then(
    (r) => {
      let p = new PatientRecord()
      p.patient = patient
      p.record = r
      p.value = input.value
      return p
    }
  ).catch(err => { return new PatientRecord() })
}

async function inputToPatientDeviceRecord(d: PatientDevice, input: { recordId: number; value: string; }) {
  return getRepository(Record).findOneOrFail(input.recordId).then(
    (r) => {
      let p = new PatientDeviceRecord()
      p.patientDevice = d
      p.record = r
      p.value = input.value
      return p
    }
  ).catch(err => { return new PatientDeviceRecord() })
}

async function inputsToPatientRecords(p: Patient, inputs: { recordId: number; value: string; }[]) {
  return Promise.all(inputs.map(i => inputToPatientRecord(p, i)))
}

async function inputsToPatientDeviceRecords(d: PatientDevice, inputs: { recordId: number; value: string; }[]) {
  return Promise.all(inputs.map(i => inputToPatientDeviceRecord(d, i)))
}

export default class PatientController {
  static savePatient = async (req: Request, res: Response) => {
    let { patientInputs, groupName, patientId } = req.body
    //TODO add check to see if attributes have changed instead of saving all of them.
    //For any user, groupadmin, or admin go ahead
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(403).send()
      return
    }
    if (['admin', 'groupAdmin', 'user'].includes(sessionUser.siteAccess)) {
      //incoming list of {attribute, value:string, type (string or date)}
      //Existing patient case is different then new one
      if (patientId != null) {
        try {
          //TODO confirm existing works
          getRepository(Patient).findOneOrFail(patientId).then(patient => {
            getManager().transaction(async transactionalEntityManager => {
              let records = (await inputsToPatientRecords(patient, patientInputs)).filter(r => r.value != null)
              await transactionalEntityManager.save(records)
            }).then(_ => {
              res.status(200).send({ patientId: patientId, msg: 'updated' })
              return
            })
          })
        } catch (err) {
          res.status(400).send(err)
          return
        }

      } else {
        //new patient
        try {
          //Add group feeding in correctly
          getRepository(GroupState)
            .findOneOrFail({
              where: {
                attribute: 'name',
                value: groupName
              }
            }).then(groupState => {
              getRepository(Group).findOneOrFail(groupState.groupId).then(group => {
                let newPatient = new Patient()
                getManager().transaction(async transactionalEntityManager => {
                  await transactionalEntityManager.save(newPatient)
                  let patientGroup = new PatientGroup()
                  patientGroup.patient = newPatient
                  patientGroup.group = group
                  await transactionalEntityManager.save(patientGroup)
                  let records = (await inputsToPatientRecords(newPatient, patientInputs)).filter(r => r.value != null)
                  await transactionalEntityManager.save(records)

                }).then(_ => {
                  res.status(200).send({ patientId: newPatient.id, msg: 'new patient' })
                  return
                })
              })
            })
        } catch (err) {
          res.status(400).send(err)
          return
        }
      }
    } else {
      res.status(403).send()
      return
    }
  }

  //Admin - all
  //groupAdmin or User -> only if patient in a group that the user has user or groupAdmin access for
  static deletePatient = async (req: Request, res: Response) => {
    let { patientId } = req.body
    const sessionUser = req.session.user

    //TODO error handling for not found
    if (sessionUser == null) {
      return res.status(403).send()
    }

    if (sessionUser.siteAccess == 'admin') {
      getRepository(Patient).delete(patientId).then(_r => {
        
        res.status(200).send({ msg: 'success' })//success is redundent with 200
      }).catch(err => res.status(400).send(err))
    } else {
      //For users and groupAdmins, deleting a patient is group limited
      const acceptableGroupIds = groupAccess(['user', 'groupAdmin'], sessionUser.viewGroups)
      getRepository(ViewPatientGroup)
        .findOneOrFail({
          where: {
            patientId: patientId,
            groupId: In(acceptableGroupIds)
          }
        }).then(_group => {
          //Delete
          getRepository(Patient).delete(patientId).then(_r => {
            res.status(200).send({ msg: 'success' })
          })
        }).catch(err => res.status(400).send(err))
    }
  }
  //Admin - all
  //groupAdmin or User -> only if patient in a group that the user has user or groupAdmin access for
  static getPatient = async (req: Request, res: Response) => {
    let { patientId } = req.body
    const sessionUser = req.session.user

    //TODO error handling for not found
    if (sessionUser == null) {
      res.status(403).send()
      return
    }
    getRepository(PatientRecordState).find({ where: { patientId: patientId } })
      .then(pss => {
        getRepository(PatientDeviceRecordState).find({ where: { patientId: patientId } })
          .then(devices => {
            try {
              //Get patient's groupName
              if (sessionUser.siteAccess == 'admin') {
                //get the group name
                getRepository(ViewPatientGroup)
                  .findOneOrFail({ where: { patientId: patientId } })
                  .then(group => {
                    //Get the group name
                    res.status(200).send({
                      patientRecords: pss,
                      patientDeviceRecords: devices,
                      groupName: group.groupName
                    })
                  })
              } else {
                //For users and groupAdmins, seeing a patient is group limited
                const acceptableGroupIds = groupAccess(['user', 'groupAdmin'], sessionUser.viewGroups)
                getRepository(ViewPatientGroup)
                  .findOneOrFail({
                    where: {
                      patientId: patientId,
                      groupId: In(acceptableGroupIds)
                    }
                  }).then(group => {
                    //Get the group name
                    res.status(200).send({
                      patientRecords: pss,
                      patientDeviceRecords: devices,
                      groupName: group.groupName
                    })
                  })
              }
            } catch{
              res.status(400).send()
              return
            }
          })
      })
      .catch(err => res.status(400).send(err))
  }

  //Admin - all
  //groupAdmin or User -> only patients in groups that the user has user or groupAdmin access for
  //Tested for user... seems to work
  static getAllPatients = async (req: Request, res: Response) => {
    //Auth stuff and limit to user's groups, or no limit if admin
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(403).send()
      return
    }
    if (sessionUser.siteAccess == 'admin') {
      getRepository(PatientRecordState).find()
        .then(patients => {
          res.status(200).send(patients)
        }).catch(err => res.status(400).send(err))
    } else {
      const acceptableGroupIds = groupAccess(['user', 'groupAdmin'], sessionUser.viewGroups)
      
      getRepository(PatientRecordState).find({ where: { groupId: In(acceptableGroupIds) } })
        .then(patients => {
          res.status(200).send(patients)
        }).catch(err => res.status(400).send(err))
    }
  }

  static saveDevice = async (req: Request, res: Response) => {
    let { measurements, deviceId, patientDeviceId, patientId } = req.body
    //Going to create Patient Measurements
    //For any user, groupadmin, or admin go ahead
    const sessionUser = req.session.user
    if (sessionUser == null) {
      res.status(403).send()
      return
    }
    if (['admin', 'groupAdmin', 'user'].includes(sessionUser.siteAccess)) {
      try {
        if (patientDeviceId != null) {
          //existing device
          getRepository(PatientDevice).findOneOrFail(patientDeviceId).then(pDevice => {
            //Save measurements
            getManager().transaction(async transactionalEntityManager => {
              let records = (await inputsToPatientDeviceRecords(pDevice, measurements)).filter(r => r.value != null)
              await transactionalEntityManager.save(records)

            }).then(_ => {
              res.status(200).send({ patientDeviceId: pDevice.id, msg: 'device updated' })
              return
            })
          })
        } else {
          //new device
          //Get the patient
          getRepository(Patient).findOneOrFail(patientId).then(patient => {
            //Get the device
            getRepository(Device).findOneOrFail(deviceId).then(device => {
              let pDevice = new PatientDevice()
              pDevice.patient = patient
              pDevice.device = device
              getManager().transaction(async transactionalEntityManager => {
                await transactionalEntityManager.save(pDevice)
                let records = (await inputsToPatientDeviceRecords(pDevice, measurements)).filter(r => r.value != null)
                await transactionalEntityManager.save(records)

              }).then(_ => {
                res.status(200).send({ patientDeviceId: pDevice.id, msg: 'new device' })
                return
              })
            })
          })
        }

      } catch (err) {
        res.status(400).send(err)
        return
      }
    } else {
      res.status(403).send()
      return
    }
  }

}