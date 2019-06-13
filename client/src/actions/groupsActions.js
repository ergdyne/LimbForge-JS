import axios from 'axios'
import _ from 'underscore'
import {keyStringToJSON }from '../functions/ergJSON'

function convertAttributes(ats){
  const groupSets = _.pairs(_.groupBy(ats,(g)=>g.groupId))
  return groupSets.map(g => {
    //Not safe...
    var group = keyStringToJSON('attribute','value',g[1])
    group.id = parseInt(g[0])
    return group
  })
}

function convertUserGroups(ugs){
  const userSets = _.pairs(_.groupBy(ugs,(u)=>u.userId))
  return userSets.map(s=> {
    //Pairs makes the s a list of [id, [ugs]]
    //We only need one of the ugs to get the user information.
    const rawUser = s[1][0]
    return {
      userId: parseInt(s[0]),
      email: rawUser.email,
      groupAccess: rawUser.access
    }
  })

}

export function getGroups() {
  return function (dispatch) {
    axios.get('http://localhost:3000/group/all')
      .then((response) => {
        const groups = convertAttributes(response.data.groupAttributes)
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
        const group = _.first(convertAttributes(response.data.groupAttributes))
        const allUsers = convertUserGroups(response.data.userGroups)
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

