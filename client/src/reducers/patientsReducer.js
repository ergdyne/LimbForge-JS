import { patients } from '../testData'

export default function reducer(state={
  //The outside layer is patients. Access by state.patients.item
  //state.patients.patients, state.patients.patientFormLevel
  patientFormLevel:'patient',
  patients:[],
  patient:{
    id:null,
    //Other attributes exists in patient but are not given defaults.
    measurements:{}
  }

},action){
  switch(action.type){
    case "GET_PATIENTS":{
      //TODO Will take input from action.payload.
      return {...state, patients:patients}
    }
    case "GET_PATIENT":{
      return {...state,patient:patients[action.payload.patientId]}
    }

    case "SAVE_PATIENT":{
      //would also do save to db... but for now
      return {...state,patient:action.payload.patient}
    }

    case "SAVE_MEASUREMENTS":{
      //would only save the measurements to the db based on the patient information
      return {...state,patient:action.payload.patient}
    }

    case "UPDATE_FORM_LEVEL":{
      return {...state,patientFormLevel:action.payload.level}
    }

    case "DELETE_PATIENT":{
      return {...state}
    }

    default: return state
  }

}