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

export function getGroups() {
  return function (dispatch) {
    axios.get('http://localhost:3000/group/all')
      .then((response) => {
        //We don't really care about the response yet.
        const groups = convertAttributes(response.data.groupAttributes)
        dispatch({ type: "GET_GROUPS", payload: groups })
      })
      .catch((err) => {
        dispatch({ type: "GET_GROUPS_REJECTED", payload: err })
      })
  }
}

export function getGroup(groupId) {
  return {
    type: "GET_GROUP",
    payload: { groupId: groupId }
  }
}

export function addGroup(newGroup) {
  const { name, description } = newGroup

  console.log("group", newGroup)

  if (name.length > 0 && description.length > 0) {
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

