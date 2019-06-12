//All about the person using the site
const emptyUser = {
  id: null,
  siteAccess: null,
  home: '/',
  loggedIn: false,
  groups: []
}

const pendingUser ={
  id: null,
  siteAccess: 'requested',
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
      console.log(action.payload)
      if (action.payload === 'admin') {
        return { ...state, user: admin }
      }
      if (action.payload === 'groupAdmin') {
        return { ...state, user: groupAdmin }
      }
      if (action.payload === 'user') {
        return { ...state, user: user }
      }

      return state
    }
    case "LOGOUT": {
      return {...state, user:emptyUser}
    }
    case "SIGN_UP":{
      console.log('new one',action.payload)
      //TODO, create the temporary user credential ("pending approval")
      //email: "x@a.com", id: 19, create_at: "2019-06-12T20:43:27.646Z"

      return {...state, user:action.payload}
    }

    //signup failed and such
    default: return state
  }
}

//Temporary Sessions
const admin = {
  id: 0,
  siteAccess: 'admin',
  home: '/users/',
  loggedIn: true,
  groups: []
}

const groupAdmin = {
  id: 1,
  siteAccess: 'groupAdmin',
  home: '/patients/',
  loggedIn: true,
  groups: []//should call out groups
}
const user = {
  id: 2,
  siteAccess: 'user',
  home: '/patients/',
  loggedIn: true,
  groups: []//should call out groups
}