import {combineReducers} from 'redux'
import groups from './groupsReducer'
import patients from './patientsReducer'
import session from './sessionReducer'
import users from './usersReducer'

export default combineReducers({groups,patients,session,users})