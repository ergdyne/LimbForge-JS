import {combineReducers} from 'redux'
import groups from './groupsReducer'
import patients from './patientsReducer'
import session from './sessionReducer'
import users from './usersReducer'

//:D
function api(state={
  link:'http://localhost:3000/'
},action){
  return state
}

export default combineReducers({api,groups,patients,session,users})