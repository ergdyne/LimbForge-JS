import {combineReducers} from 'redux'

const tempReducer = (state={hi:'Hey'}, action)=>{
  return state
}

export default combineReducers({tempReducer})