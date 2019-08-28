import isEmpty from '../functions/isEmpty'

//TODO with bouncing around to different patient locations, sometime, the patient is not cleared
const emptyPatient = {
  id:null,
    //Other attributes exists in patient but are not given defaults.
}
//TODO simplify device store
const emptyDevice ={
  deviceId:null,
  patientDeviceId:null,
  deviceData:[],
  measurements:{}
}

export default function reducer(state={
  //The outside layer is patients. Access by state.patients.item
  patients:[],
  patient:emptyPatient,
  device:emptyDevice,
  devices:[]

},action){
  switch(action.type){
    case "GET_PATIENTS":{
      return {...state, patients:action.payload}
    }
    case "GET_PATIENT":{
      const patient = action.payload.patient
      const devices = action.payload.devices
      if(isEmpty(devices)){
        return {...state,patient:patient}
      }

      return {...state,patient:patient,devices:devices}
    }
    case "SET_DEVICE":{
      return {...state,device:action.payload}
    }

    case "SET_PATIENT_DEVICE_ID":{
      const device = state.devices.find(dev => dev.patientDeviceId === action.payload)
      //TODO possibly check if device found, otherwise do something else
      return{...state,device:device}
    }
    case "SAVE_PATIENT":{
      return {...state,patient:action.payload}
    }

    case "DELETE_PATIENT":
    case "CLEAR_PATIENT":{
      return {...state,patient:emptyPatient,devices:[],device:emptyDevice}
    }
    default: return state
  }

}