import axios from 'axios'
import { userDataToUser } from '../functions/convertView'
import { AXIOS_CONFIG, API_URL } from '../config/API'
//NOTE! I believe that encryption of credentials is handled by HTTPS.
//So when the site is live, as long as we use HTTPS, everything should be fine.

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

export function logout() {
  return function (dispatch) {
    axios.get(`${API_URL}auth/logout`, AXIOS_CONFIG)
      .then((response) => {
        //response doesn't really matter
        dispatch({ type: "LOGOUT", payload: {} })
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT_REJECTED", payload: err })
      })
  }
  //todo server request
}


