import { Request, Response } from "express"

export default class PatientController{
  static savePatient = async(req:Request, res:Response)=>{
    //incoming list of {attribute, value:string, type (string or date)}
    let {patientInputs, groupId} = req.body
    //would at least confirm there is a patient name
    
    //Find the group
    
    //transaction
      //save patient
      //patientGroup
      //patient attributes <= map of inputs
  }
  //START HERE
}