import axios from 'axios'
import { userDataToUser } from '../functions/convertView'
import { AXIOS_CONFIG, API_URL } from '../config/API'

//Login runs after the user has been logged via OAuth and Sockets.
//This API get's the user's data.
export function login() {
  return function (dispatch) {
    axios.get(`${API_URL}auth/login`, AXIOS_CONFIG)
      .then((response) => {
        dispatch({ type: "LOGIN", payload: userDataToUser(response) })
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_REJECTED", payload: err })
      })
  }
}

//Kills the session on the server.
export function logout() {
  return function (dispatch) {
    axios.get(`${API_URL}auth/logout`, AXIOS_CONFIG)
      .then((_response) => {
        dispatch({ type: "LOGOUT", payload: {} })
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT_REJECTED", payload: err })
      })
  }
}


