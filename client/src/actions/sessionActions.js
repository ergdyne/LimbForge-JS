import axios from 'axios'
import { fullUserGroupsToGroups } from '../functions/convertView'
import { AXIOS_CONFIG, API_URL } from '../config/API'
import { isString } from 'util' //TEMP
//NOTE! I believe that encryption of credentials is handled by HTTPS.
//So when the site is live, as long as we use HTTPS, everything should be fine.


//support functions
//ENUM?
function home(siteAccess) {
  switch (siteAccess) {
    case 'admin': return '/users/'
    case 'requested': return '/'
    default: return '/patients/'
  }
}

function userDataToUser(response) {
  const { id, email, viewGroups, siteAccess } = response.data
  const ourUser = {
    id: id,
    email: email,
    siteAccess: siteAccess,
    home: home(siteAccess),
    loggedIn: true,
    groups: fullUserGroupsToGroups(viewGroups)
  }
  return ourUser
}

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

export function signUp(newUser) {
  const { email, password, group } = newUser
  return function (dispatch) {
    axios.post(`${API_URL}auth/signup`, {
      email: email,
      auth: password,
      groupName: group
    }, AXIOS_CONFIG)
      .then((response) => {
        dispatch({ type: "SIGN_UP", payload: userDataToUser(response) })
      })
      .catch((err) => {
        dispatch({ type: "SIGN_UP_REJECTED", payload: err })
      })
  }
}
