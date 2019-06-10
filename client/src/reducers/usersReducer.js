import { users, groups } from '../testData'

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
    siteAccess:'',
    groups:[]
  },
  groupOptions:[]
},action){

  switch (action.type){
    case "GET_GROUP_OPTIONS":{
      const groupOptions = groups.map(g=>g.name)
      return{...state, groupOptions:groupOptions}
    }
    case "GET_APPROVED_USERS":{

      const approvedUsers = users.filter(u => u.siteAccess !== "request")//Truth is not quite right here.
      return{...state, approvedUsers:approvedUsers}
    }
    case "GET_REQUESTED_USERS":{
      const requestedUsers = users.filter(u => u.siteAccess === "request")
      return {...state, requestedUsers:requestedUsers}
    }
    case "GET_USER":{
      const user = users[action.payload.userId]
      const usersGroups = user.groups.map(g=> {
        const group = groups[g.groupId]
        return{...g,name:group.name,description:group.description}
      })

      return {...state, user:{...user,groups:usersGroups}}
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
