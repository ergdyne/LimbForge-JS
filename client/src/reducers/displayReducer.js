//import test data
import {
  groupColHeaders,
  groupInputs,
  userColHeaders,
  userGroupColHeaders,
  patientColHeaders,
  patientInputs,
  measurementInputs
} from '../config/defaultDisplay'

//Define all the display data that can in the future be pulled from the DB
export default function reducer(state = {
  //Named Forms and Tables with eventually multiple versions
  //Currently all static
  groupColHeaders: groupColHeaders,
  groupInputs: groupInputs,
  userColHeaders: userColHeaders,
  userGroupColHeaders: userGroupColHeaders,
  patientColHeaders: patientColHeaders,
  patientInputs: patientInputs,
  measurementInputs: measurementInputs
}, action) {
  switch (action.type) {
    case "GET_COLS": {
      return { ...state }
    }
    default: return state
  }

}