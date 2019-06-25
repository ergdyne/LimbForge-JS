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
      //Don't really care about the ADD_GROUP yet, unless to do something with keeping state going.
      return {...state}
    }
    default: return state
  }
}