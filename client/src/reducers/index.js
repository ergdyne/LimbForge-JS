import {combineReducers} from 'redux'
import patients from './patientsReducer'
import session from './sessionReducer'
import users from './usersReducer'

export default combineReducers({patients,session,users})