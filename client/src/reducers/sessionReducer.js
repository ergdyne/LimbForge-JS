//All about the person using the site
export default function reducer(state = {
  user: {
    id: null,
    siteAccess: null,
    home: '/',
    loggedIn: false,
    groups: []
  },
  patientFormLevel: 'patient'
}, action) {

  console.log('user reducer', state)

  //Temp sessions
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
    default: return state
  }
}