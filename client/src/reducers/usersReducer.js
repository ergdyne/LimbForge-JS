import { users, groups } from '../testData'

//All about the users of the site with whom the current persion using the site interacts.
//The admin sees all users. The groupAdmin sees the users of the groups they administer.
//The users and user page are merged
export default function reducer(state={
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
    default: return state
  }

  
}
