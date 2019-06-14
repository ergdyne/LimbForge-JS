import {keyStringToJSON} from './ergJSON'
import _ from 'underscore'

function groupStatesToGroups(ats){
  const groupSets = _.pairs(_.groupBy(ats,(g)=>g.groupId))
  return groupSets.map(g => {
    //Not safe...
    var group = keyStringToJSON('attribute','value',g[1])
    group.id = parseInt(g[0])
    return group
  })
}

function fullUserGroupsToGroups(viewGroups) {
  const groupSets = _.pairs(_.groupBy(viewGroups,(g)=>g.groupId))
  return groupSets.map(g => {
    //Not safe...
    var group = keyStringToJSON('attribute','value',g[1])
    group.id = parseInt(g[0])
    //g[1] is a list of full user groups (from pairs). Since they are all the same, we can take the access level in a brittle fashion.
    group.groupAccess = g[1][0].access
    return group
  })
}

function fullUserGroupsToUsers(ugs){
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

export {fullUserGroupsToGroups,groupStatesToGroups,fullUserGroupsToUsers}