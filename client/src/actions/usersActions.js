export function getGroupOptions(){
  return {
    type:"GET_GROUP_OPTIONS",
    payload:{}
  }
}

export function getRequestedUsers(){
  return {
    type:"GET_REQUESTED_USERS",
    payload:{}
  }
}

export function getApprovedUsers(){
  return {
    type:"GET_APPROVED_USERS",
    payload:{}
  }
}

export function getUser(userId){
  return {
    type:"GET_USER",
    payload:{userId:userId}
  }
}

export function approveUser(userId,groupId,groupAccess){
  return {
    type:"APPROVE_USER",
    payload:{userId:userId,groupId:groupId,groupAccess:groupAccess}
  }
}

export function addUser(newUser){
  return {
    type:"ADD_USER",
    payload:{newUser:newUser}
  }
}