import {combineReducers} from 'redux'
import session from './sessionReducer'
import users from './usersReducer'

export default combineReducers({session,users})