//Data stored about the current user of the site.
//The settings here does not impact DB access for the user. It only speeds access locally.
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
      return {...state, user:action.payload}
    }
    case "LOGOUT": {
      return {...state, user:emptyUser}
    }
    case "SIGN_UP":{
      return {...state, user:action.payload}
    }
    default: return state
  }
}