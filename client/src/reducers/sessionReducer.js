//All about the person using the site
const emptyUser = {
  id: null,
  email: '',
  siteAccess: null,
  home: '/',
  loggedIn: false,
  groups: []
}

export default function reducer(state = {
  user: emptyUser,
  patientFormLevel: 'patient'
}, action) {

  switch (action.type) {
    case "LOGIN": {
      //Temp
      return {...state, user:action.payload}
    }
    case "LOGOUT": {
      return {...state, user:emptyUser}
    }
    case "SIGN_UP":{
      return {...state, user:action.payload}
    }
    //signup failed and such
    default: return state
  }
}