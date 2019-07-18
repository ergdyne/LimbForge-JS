import axios from 'axios'
import{fullUserGroupsToUsers, fullUserGroupsToGroups} from '../functions/convertView'
import {AXIOS_CONFIG, API_URL} from '../config/API'

export function getUsers(){
  return function (dispatch) {
    axios.get(`${API_URL}user/all`,AXIOS_CONFIG)
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
    axios.post(`${API_URL}user/one`,{
      userId:userId
    },AXIOS_CONFIG)
      .then((response) => {
        const data = response.data
        const ourUser ={
          id: userId,
          email: data.email,
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

export function approveUser(userId, email,group,groupAccess){
  return function (dispatch) {
    //Add does double duty of adjusting group access
    axios.post(`${API_URL}user/add`, {
      email:email, 
      userGroupAccess:groupAccess, 
      groupName:group
    },AXIOS_CONFIG)
      .then((response) => {
        dispatch(getUser(userId))
        dispatch({ type: "APPROVE_USER", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "APPROVE_USER_REJECTED", payload: err })
      })
  }
}

export function addUser(newUser){
  const { email, userGroupAccess, groupName } = newUser

  if (email.length > 0 && userGroupAccess.length > 0 && groupName.length > 0) {
    return function (dispatch) {
      axios.post(`${API_URL}user/add`, {
        email:email, 
        userGroupAccess:userGroupAccess, 
        groupName:groupName
      },AXIOS_CONFIG)
        .then((response) => {
          dispatch(getUsers())
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