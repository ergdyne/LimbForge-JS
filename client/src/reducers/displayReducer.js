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
  patientColHeaders: patientColHeaders,
  patientInputs: patientInputs,
  usersColHeaders: usersColHeaders,
  usersGroupColHeaders: usersGroupColHeaders,
  userGroupsColHeaders: userGroupsColHeaders
}, action) {
  switch (action.type) {
    case "GET_COLS": {
      return { ...state }
    }
    default: return state
  }

}