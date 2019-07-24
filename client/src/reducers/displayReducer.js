import {
  groupColHeaders,
  groupInputs,
  usersColHeaders,
  usersGroupColHeaders,
  userGroupsColHeaders
} from '../config/defaultDisplay'

//TEMP
import {measurementForm} from '../testData'

//Define all the display data that can in the future be pulled from the DB
export default function reducer(state = {
  //Named Forms and Tables with eventually multiple versions
  //Currently all static
  groupColHeaders: groupColHeaders,
  groupInputs: groupInputs,
  selectGroup:{inputs:[]},
  measurementForm: measurementForm,//TODO//{inputs:[]},
  patientColHeaders: [],
  deviceCols:[],
  showDevice:false,
  editPatient: false,
  editDevice: false,
  patientForm: {inputs:[]},
  addBuild: {inputs:[]},
  usersColHeaders: usersColHeaders,
  usersGroupColHeaders: usersGroupColHeaders,
  userGroupsColHeaders: userGroupsColHeaders,
  optionStore:{
    groupOptions:[],
    publicGroupOptions:['New Group']
  }
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
        case 'addBuild': return {...state, addBuild:action.payload}
        default: return { ...state,measurementForm:form }
      }
      
    }
    case "GET_GROUP_OPTIONS":{
      const groups = action.payload
      const pubGroups = groups.concat(['New Group'])
      const newOps = {...state.optionStore,groupOptions:groups,publicGroupOptions:pubGroups }
      return{...state, optionStore: newOps}
    }



    case "TOGGLE_SHOW_DEVICE": {
      const x = {...state.showDevice}
      return{...state, showDevice:!x}
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