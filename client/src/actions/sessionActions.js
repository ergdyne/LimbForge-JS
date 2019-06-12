import axios from 'axios'

export function login(payload) {

  //Can preprocess the login credentials within the axios
  //START HERE
  return {
    type: "LOGIN",
    payload: payload
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
    type:"SIGN_UP_REJECTED",
    payload:{msg:"passwords don't match"}
  }
}