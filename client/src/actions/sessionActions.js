import axios from 'axios'
import { fullUserGroupsToGroups } from '../functions/convertView'
import { axiosConfig } from '../testData'

//NOTE! I believe that encryption of credentials is handled by HTTPS.
//So when the site is live, as long as we use HTTPS, everything should be fine.
//Check out strategy in ergdyne/Graina.
import { isString } from 'util';

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

export function login(payload) {
  //Can preprocess the login credentials within the axios
  //TEMP quick login
  var email = ''
  var password = ''
  // TEMPORARY
  if (isString(payload)) {
    switch (payload) {
      case 'admin': {
        email = 'admin@admin.com'
        password = 'a'
        break
      }
      case 'groupAdmin': {
        email = 'j@j.com'
        password = 'moo'
        break
      }
      case 'user': {
        email = 'x@b.com'
        password = 'as'
        break
      }
    }
  } else { //END TEMPORARY
    email = payload.email
    password = payload.password
  }

  return function (dispatch) {
    axios.post('http://localhost:3000/auth/login', {
      email: email,
      auth: password
    }, axiosConfig)
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
    axios.get('http://localhost:3000/auth/logout', axiosConfig)
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
  const { email, password, passwordConfirm, group } = newUser
  if (password === passwordConfirm) {
    return function (dispatch) {
      axios.post('http://localhost:3000/auth/signup', {
        email: email,
        auth: password,
        groupName: group
      }, axiosConfig)
        .then((response) => {
          dispatch({ type: "SIGN_UP", payload: userDataToUser(response) })
        })
        .catch((err) => {
          dispatch({ type: "SIGN_UP_REJECTED", payload: err })
        })
    }
  }

  return {
    type: "SIGN_UP_REJECTED",
    payload: { msg: "passwords don't match" }
  }
}