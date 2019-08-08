import {
  groupColHeaders,
  groupInputs,
  userGroupsColHeaders,
  usersColHeaders,
  usersGroupColHeaders
} from '../config/defaultDisplay'

//Define all the display items that is or could be pulled in from the DB.
//Named Forms and Tables.
export default function reducer(state = {
  addDevice: {inputs:[]},
  deviceCols:[],
  editPatient: false,
  editDevice: false,
  groupColHeaders: groupColHeaders,
  groupInputs: groupInputs,
  measurementForm: {inputs:[]},
  optionStore:{
    groupOptions:[],
    publicGroupOptions:['New Group']
  },
  patientColHeaders: [],
  patientForm: {inputs:[]},
  selectGroup:{inputs:[]},
  showDevice:false,
  usersColHeaders: usersColHeaders,
  userGroupsColHeaders: userGroupsColHeaders,
  usersGroupColHeaders: usersGroupColHeaders
}, action) {
  switch (action.type) {
    case "GET_COL_HEADERS": {
      switch(action.payload.table){
        case 'patientCols':{
          return{...state, patientColHeaders:action.payload.data}
        }
        case 'deviceCols':{
          return{...state, deviceCols:action.payload.data}
        }
        default:return { ...state }
      }
    }
    case "GET_FORM":{
      switch(action.payload.accessor){
        case 'selectGroup': return {...state, selectGroup:action.payload}
        case 'patientData': return {...state, patientForm:action.payload}
        case 'addDevice': return {...state, addDevice:action.payload}
        default: return { ...state,measurementForm:action.payload }
      }
    }
    case "GET_GROUP_OPTIONS":{
      const groups = action.payload
      const pubGroups = groups.concat(['New Group'])
      const newOps = {...state.optionStore,groupOptions:groups,publicGroupOptions:pubGroups }
      return{...state, optionStore: newOps}
    }
    
    case "SET_SHOW_DEVICE": {
      return{...state, showDevice:action.payload}
    }
    case "SET_EDIT_PATIENT": {
      return{...state, editPatient:action.payload}
    }
    case "SET_EDIT_DEVICE": {
      return{...state, editDevice:action.payload}
    }
    default: return state
  }

}