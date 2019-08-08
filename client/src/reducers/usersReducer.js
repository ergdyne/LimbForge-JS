//All about the users of the site with whom the current persion using the site interacts.
//The admin sees all users. The groupAdmin sees the users of the groups they administer.
export default function reducer(state={
  //The outside layer is users. Each of these is accessed by state.users.item
  //state.users.approvedUsers, state.users.user...
  approvedUsers:[],
  requestedUsers:[],
  user:{ //When a particular user's information is accessed, it loads here to be displayed.
    id:null,
    email:'',
    isAdmin:'',
    groups:[]
  }
},action){

  switch (action.type){
    case "GET_USERS":{
      const {approvedUsers, requestedUsers} = action.payload
      return{...state, approvedUsers:approvedUsers, requestedUsers:requestedUsers}
    }
    case "GET_USER":{
      return {...state, user:action.payload}
    }
    case "APPROVE_USER":{
      return {...state}
    }
    case "ADD_USER":{
      return {...state}
    }
    default: return state
  }
}
