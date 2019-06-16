import axios from 'axios'
import { fullUserGroupsToGroups } from '../functions/convertView'
import {axiosConfig} from '../testData'

//TEMP
import { isString } from 'util';

//support functions
function home(siteAccess) {
  switch (siteAccess) {
    case 'admin': return '/users/'
    case 'requested': return '/'
    default: return '/patients/'
  }
}



export function login(payload) {
  //Can preprocess the login credentials within the axios
  //TEMP quick login
  var email = ''
  var password = ''
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
  } else {
    email = payload.email
    password = payload.password
  }

  return function (dispatch) {
    axios.post('http://localhost:3000/auth/login', {
      email: email,
      auth: password
    }, axiosConfig)
      .then((response) => {

        //can pre process this data
        // axios.post('http://localhost:3000/auth/meep',
        //   { user: response.data }, axiosConfig).then(() => {
            const { id, email, viewGroups, siteAccess } = response.data
            console.log('response got')
            const ourUser = {
              id: id,
              email: email,
              siteAccess: siteAccess,
              home: home(siteAccess),
              loggedIn: true,
              groups: fullUserGroupsToGroups(viewGroups)
            }
            console.log('oour user', ourUser)
            dispatch({ type: "LOGIN", payload: ourUser })
          // })

      })
      .catch((err) => {
        dispatch({ type: "LOGIN_REJECTED", payload: err })
      })
  }
}

export function logout() {
  return {
    type: "LOGOUT",
    payload: {}
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
      },axiosConfig)
        .then((response) => {
          //can pre process this data

          dispatch({ type: "SIGN_UP", payload: response.data })
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