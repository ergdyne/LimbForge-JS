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

  console.log('user reducer', state)

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
      return {...state, user:pendingUser}
    }
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