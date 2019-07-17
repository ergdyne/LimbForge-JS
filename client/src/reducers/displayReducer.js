//import test data
import {
  groupColHeaders,
  groupInputs,
  patientColHeaders,
  patientInputs,
  measurementInputs,
  usersColHeaders,
  usersGroupColHeaders,
  userGroupsColHeaders
} from '../config/defaultDisplay'



//Define all the display data that can in the future be pulled from the DB
export default function reducer(state = {
  //Named Forms and Tables with eventually multiple versions
  //Currently all static
  groupColHeaders: groupColHeaders,
  groupInputs: groupInputs,
  measurementInputs: measurementInputs,
  patientColHeaders: [],
  patientInputs: patientInputs,
  usersColHeaders: usersColHeaders,
  usersGroupColHeaders: usersGroupColHeaders,
  userGroupsColHeaders: userGroupsColHeaders
}, action) {
  switch (action.type) {
    case "GET_COL_HEADERS": {
      switch(action.payload.table){
        case 'patientCols':{
          return{...state, patientColHeaders:action.payload.data}
        }
        default:return { ...state }
      }
    }
    case "GET_MEASURE_INPUTS":{
      return {...state, measurementInputs:action.payload}
    }
    default: return state
  }

}