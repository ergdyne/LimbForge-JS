import { Request, Response } from "express"
import { Patient } from '../entity/Patient'
import { Group } from '../entity/Group'
import { PatientGroup } from '../entity/PatientGroup'
import { PatientAttribute } from '../entity/PatientAttribute'
import { PatientState } from '../entity/ViewPatientState'
import { getManager, getRepository } from "typeorm"

export default class PatientController {
  static savePatient = async (req: Request, res: Response) => {
    //incoming list of {attribute, value:string, type (string or date)}
    let { patientInputs, groupId, patientId } = req.body
    //would at least confirm there is a patient name
    //there is a question of new patient or not
    //remember to send back something... at least the id 
    if (patientId != null) {
      //existing patient
      //we only care about the delta
      res.send({msg:'temp'})
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

            let patientAttributes = patientInputs.map((i: { attribute: string; value: string; type: string; }) =>{
              let a = new PatientAttribute()
              a.attribute = i.attribute
              a.value = i.value
              a.type = i.type
              return a
            })
            await transactionalEntityManager.save(patientAttributes)

          }).then(_=> res.send(newPatient))
        })
      }catch(err){
        res.status(400).send(err)
      }
    }

  }
}