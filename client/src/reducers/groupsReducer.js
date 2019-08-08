//Section of store used by admin groups page.
export default function reducer(state = {
  groups: [],
  group: {
    id: null,
    name: '',
    description: '',
    approvedUsers: [],
    requestedUsers: []
  }
}, action) {
  switch (action.type) {
    case "GET_GROUPS":{
      return {...state, groups:action.payload}
    }
    case "GET_GROUP":{
      return {...state, group:action.payload}
    }
    case "ADD_GROUP":{
      return {...state}
    }
    default: return state
  }
}