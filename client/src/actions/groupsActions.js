import axios from 'axios'

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

export function addGroup(newGroup){
  const {name, description } = newGroup

  console.log("group",newGroup)

  if (name.length > 0 && description.length >0) {
    return function (dispatch) {
      axios.post('http://localhost:3000/group/add', {
        name: name,
        description: description
      })
        .then((response) => {
          //We don't really care about the response yet.
          dispatch({ type: "ADD_GROUP", payload: response.data })
        })
        .catch((err) => {
          dispatch({ type: "ADD_GROUP_REJECTED", payload: err })
        })
    }
  }

  return {
    type: "ADD_GROUP_REJECTED",
    payload: { msg: "no input" }
  }
}

