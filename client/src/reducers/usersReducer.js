import { users, groups } from '../testData'
import { approveUser } from '../actions/usersActions';

//All about the users of the site with whom the current persion using the site interacts.
//The admin sees all users. The groupAdmin sees the users of the groups they administer.
export default function reducer(state={
  //The outside layer is users. Each of these is accessed by state.users.item
  //state.users.approvedUsers, state.users.user...
  approvedUsers:[],
  requestedUsers:[],
  user:{ //for looking at a particular user
    id:null,
    email:'',
    isAdmin:'',
    groups:[]
  },
  groupOptions:[],
  publicGroupOptions:['New Group']
},action){

  switch (action.type){
    case "GET_GROUP_OPTIONS":{
      const groups = action.payload
      const pubGroups = groups.concat(['New Group'])
      return{...state, groupOptions:groups,publicGroupOptions:pubGroups }
    }
    case "GET_USERS":{
      const {approvedUsers, requestedUsers} = action.payload

      return{...state, approvedUsers:approvedUsers, requestedUsers:requestedUsers}
    }
    
    case "GET_USER":{

      return {...state, user:action.payload}
    }
    case "APPROVE_USER":{
      //userId,groupId,groupAccess
      console.log('approve user', action.payload)
      return {...state}
    }
    case "ADD_USER":{
      //newUser
      console.log('add user', action.payload)
      return {...state}
    }
    default: return state
  }
}
