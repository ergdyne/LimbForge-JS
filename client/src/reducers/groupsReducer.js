import { groups, users } from '../testData'

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
      return {...state, groups:groups}
    }
    case "GET_GROUP":{
      const groupId = action.payload.groupId
      const group = groups[groupId]
      const groupUsers = users.filter(u => u.groups.map(g => g.groupId).includes(action.payload.groupId))
      const approvedUsers = groupUsers.filter(u => !u.groups.filter(g => g.groupId === groupId).map(g => g.groupAccess).includes("request"))
      const requestedUsers = groupUsers.filter(u => u.groups.filter(g => g.groupId === groupId).map(g => g.groupAccess).includes("request"))
      
      return {...state, group:{...group,approvedUsers:approvedUsers,requestedUsers:requestedUsers}}
    }
    case "ADD_GROUP":{
      console.log('add group', action.payload)
      return {...state}
    }
    default: return state
  }
}