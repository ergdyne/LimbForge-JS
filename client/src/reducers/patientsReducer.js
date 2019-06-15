import { patients } from '../testData'
import isEmpty from '../functions/isEmpty'

const emptyPatient ={
  id:null,
    //Other attributes exists in patient but are not given defaults.
}

export default function reducer(state={
  //The outside layer is patients. Access by state.patients.item
  //state.patients.patients, state.patients.patientFormLevel
  patientFormLevel:'patient',
  patients:[],
  patient:emptyPatient,
  measurements:{}

},action){
  switch(action.type){
    case "GET_PATIENTS":{
      //TODO Will take input from action.payload.
      return {...state, patients:patients}
    }
    case "GET_PATIENT":{
      const patient = patients[action.payload.patientId]

      if(isEmpty(measurements)){
        return {...state,patient:patient,patientFormLevel:'measurement'}
      }

      return {...state,patient:patient,patientFormLevel:'preview'}
    }

    case "SAVE_PATIENT":{
      console.log("saving patient to store", action.payload)
      return {...state,patient:action.payload}
    }

    case "SAVE_MEASUREMENTS":{
      //would only save the measurements to the db based on the patient information
      console.log('saving me to store', action.payload)
      return {...state,measurements:action.payload}
    }

    case "UPDATE_FORM_LEVEL":{
      return {...state,patientFormLevel:action.payload.level}
    }

    case "DELETE_PATIENT":{
      return {...state}
    }

    case "CLEAR_PATIENT":{
      return {...state,patient:emptyPatient,measurements:{},patientFormLevel:'patient'}
    }
    

    default: return state
  }

}