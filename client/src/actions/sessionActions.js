export function login(payload){
  return {
    type:"LOGIN",
    payload:payload
  }
}

export function logout(){
  return {
    type:"LOGOUT",
    payload:{}
  }
}

export function signUp(newUser){
  return {
    type:"SIGN_UP",
    payload:newUser
  }
}