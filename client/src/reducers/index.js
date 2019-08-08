import {combineReducers} from 'redux'
import display from './displayReducer'
import groups from './groupsReducer'
import patients from './patientsReducer'
import session from './sessionReducer'
import users from './usersReducer'

export default combineReducers({display,groups,patients,session,users})

//Reducers + Actions drive the REDUX system.