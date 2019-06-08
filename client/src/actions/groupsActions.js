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