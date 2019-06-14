import axios from 'axios'
import _ from 'underscore'
import{fullUserGroupsToUsers, groupStatesToGroups} from '../functions/convertView'

export function getGroups() {
  return function (dispatch) {
    axios.get('http://localhost:3000/group/all')
      .then((response) => {
        const groups = groupStatesToGroups(response.data.groupAttributes)
        dispatch({ type: "GET_GROUPS", payload: groups })
      })
      .catch((err) => {
        dispatch({ type: "GET_GROUPS_REJECTED", payload: err })
      })
  }
}

export function getGroup(groupId) {
  return function (dispatch) {
    axios.post('http://localhost:3000/group/one',{
      groupId:groupId
    })
      .then((response) => {
        const group = _.first(groupStatesToGroups(response.data.groupAttributes))
        const allUsers = fullUserGroupsToUsers(response.data.userGroups)
        group.requestedUsers = allUsers.filter(u=> u.groupAccess === 'requested')
        group.approvedUsers = allUsers.filter(u=>u.groupAccess ==='user' || u.groupAccess === 'groupAdmin')
        dispatch({ type: "GET_GROUP", payload: group })
      })
      .catch((err) => {
        dispatch({ type: "GET_GROUP_REJECTED", payload: err })
      })
  }
}

export function addGroup(newGroup) {
  const { name, description } = newGroup

  if (name.length > 0 && description.length > 0) {
    return function (dispatch) {
      axios.post('http://localhost:3000/group/add', {
        name: name,
        description: description
      })
        .then((response) => {
          //We don't really care about the response yet. Only would care if going to update state.
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

