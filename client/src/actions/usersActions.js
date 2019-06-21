import axios from 'axios'
import{fullUserGroupsToUsers, fullUserGroupsToGroups} from '../functions/convertView'
import {axiosConfig} from '../testData'


export function getGroupOptions(){
  return function (dispatch) {
    axios.get('http://localhost:3000/group/options',axiosConfig)
      .then((response) => {
        dispatch({ type: "GET_GROUP_OPTIONS", payload: response.data.groupNames })
      })
      .catch((err) => {
        dispatch({ type: "GET_GROUP_OPTIONS_REJECTED", payload: err })
      })
  }
}

export function getUsers(){
  return function (dispatch) {
    axios.get('http://localhost:3000/user/all',axiosConfig)
      .then((response) => {
        const allUsers = fullUserGroupsToUsers(response.data.fullUserGroups)
        const requestedUsers = allUsers.filter(u=> u.groupAccess === 'requested')
        const approvedUsers = allUsers.filter(u=>u.groupAccess ==='user' || u.groupAccess === 'groupAdmin')
        dispatch({ type: "GET_USERS", payload: {requestedUsers: requestedUsers, approvedUsers:approvedUsers} })
      })
      .catch((err) => {
        dispatch({ type: "GET_USERS_REJECTED", payload: err })
      })
  }
}

export function getUser(userId){
  return function (dispatch) {
    axios.post('http://localhost:3000/user/one',{
      userId:userId
    },axiosConfig)
      .then((response) => {
        const data = response.data
        const ourUser ={
          id: userId,
          email: data.id,
          isAdmin: data.isAdmin,
          groups: fullUserGroupsToGroups(data.fullUserGroups)
        }
        dispatch({ type: "GET_USER", payload: ourUser })
      })
      .catch((err) => {
        dispatch({ type: "GET_USER_REJECTED", payload: err })
      })
  }
}

export function approveUser(userId,groupId,groupAccess){
  return {
    type:"APPROVE_USER",
    payload:{userId:userId,groupId:groupId,groupAccess:groupAccess}
  }
}

export function addUser(newUser){
  const { email, groupAccess, groupName } = newUser

  if (email.length > 0 && groupAccess.length > 0 && groupName.length > 0) {
    return function (dispatch) {
      axios.post('http://localhost:3000/user/add', {
        email:email, 
        groupAccess:groupAccess, 
        groupName:groupName
      },axiosConfig)
        .then((response) => {
          //We don't really care about the response yet. Only would care if going to update state.
          dispatch({ type: "ADD_USER", payload: response.data })
        })
        .catch((err) => {
          dispatch({ type: "ADD_USER_REJECTED", payload: err })
        })
    }
  }
  return {
    type: "ADD_USER_REJECTED",
    payload: { msg: "no input" }
  }
}