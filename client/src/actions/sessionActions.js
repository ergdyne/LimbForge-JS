import axios from 'axios'
//TEMP
import { isString } from 'util';

//support functions

function groups(viewGroups){
  return [{hi:"meow"}]
}

function home(siteAccess){
  switch(siteAccess){
    case 'admin': return '/users/'
    case 'requested': return '/'
    default: return '/patients/'
  }
}

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
}


export function login(payload) {
  //Can preprocess the login credentials within the axios
  if(isString(payload)){return { type: "LOGIN", payload: payload }}

  return function (dispatch) {
    axios.post('http://localhost:3000/auth/login', {
      email: payload.email,
      auth: payload.password
    }, axiosConfig)
      .then((response) => {
        //can pre process this data
        const {id, email, viewGroups,siteAccess} = response.data
        const ourUser = {
          id: id,
          email: email,
          siteAccess: siteAccess,
          home: home(siteAccess),
          loggedIn: true,
          groups: groups(viewGroups)
        }
        console.log('oour user', ourUser)
        dispatch({ type: "LOGIN", payload: ourUser })
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
}

export function signUp(newUser) {
  const { email, password, passwordConfirm, group } = newUser

  if (password === passwordConfirm) {
    return function (dispatch) {
      axios.post('http://localhost:3000/auth/signup', {
        email: email,
        auth: password,
        groupName: group
      })
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