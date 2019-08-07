import axios from 'axios'
import _ from 'underscore'
import { fullUserGroupsToUsers, groupStatesToGroups, userDataToUser } from '../functions/convertView'
import { AXIOS_CONFIG, API_URL } from '../config/API'

export function getGroups() {
  return function (dispatch) {
    axios.get(`${API_URL}group/all`, AXIOS_CONFIG)
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
    axios.post(`${API_URL}group/one`, {
      groupId: groupId
    }, AXIOS_CONFIG)
      .then((response) => {
        const group = _.first(groupStatesToGroups(response.data.groupAttributes))
        const allUsers = fullUserGroupsToUsers(response.data.userGroups)
        group.requestedUsers = allUsers.filter(u => u.groupAccess === 'requested')
        group.approvedUsers = allUsers.filter(u => u.groupAccess === 'user' || u.groupAccess === 'groupAdmin')
        dispatch({ type: "GET_GROUP", payload: group })
      })
      .catch((err) => {
        dispatch({ type: "GET_GROUP_REJECTED", payload: err })
      })
  }
}

export function addGroup(newGroup) {
  const { name, description } = newGroup
  return function (dispatch) {
    axios.post(`${API_URL}group/add`, {
      name: name,
      description: description
    }, AXIOS_CONFIG)
      .then((response) => {
        dispatch(getGroups())
        dispatch({ type: "ADD_GROUP", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "ADD_GROUP_REJECTED", payload: err })
      })
  }
}

//When a user requests access through the sign in button, they will be prompted to signup for a group.
export function signUp(groupData) {
  const { group } = groupData
  return function (dispatch) {
    axios.post(`${API_URL}group/signup`, {
      groupName: group
    }, AXIOS_CONFIG)
      .then((response) => {
        dispatch({ type: "SIGN_UP", payload: userDataToUser(response) })
      })
      .catch((err) => {
        dispatch({ type: "SIGN_UP_REJECTED", payload: err })
      })
  }
}