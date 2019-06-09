export function getGroups(){
  return{
    type:"GET_GROUPS",
    payload:{}
  }
}

export function getGroup(groupId){
  return{
    type:"GET_GROUP",
    payload:{groupId:groupId}
  }
}

export function addGroup(group){
  return{
    type:"ADD_GROUP",
    payload:{group:group}
  }
}

