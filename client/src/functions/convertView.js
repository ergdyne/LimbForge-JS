import { keyStringToJSON, listToJSON } from './ergJSON'
import _ from 'underscore'

function groupStatesToGroups(ats) {
  const groupSets = _.pairs(_.groupBy(ats, (g) => g.groupId))
  return groupSets.map(g => {
    //Not safe...
    var group = keyStringToJSON('attribute', 'value', g[1])
    group.id = parseInt(g[0])
    return group
  })
}

function fullUserGroupsToGroups(viewGroups) {
  const groupSets = _.pairs(_.groupBy(viewGroups, (g) => g.groupId))
  return groupSets.map(g => {
    //Not safe...
    var group = keyStringToJSON('attribute', 'value', g[1])
    group.id = parseInt(g[0])
    //g[1] is a list of full user groups (from pairs). Since they are all the same, we can take the access level in a brittle fashion.
    group.groupAccess = g[1][0].access
    return group
  })
}

function fullUserGroupsToUsers(ugs) {
  const userSets = _.pairs(_.groupBy(ugs, (ug) => ug.userId))
  return userSets.map(s => {
    //Pairs makes the s a list of [id, [ugs]]
    //We only need one of the ugs to get the user information.
    const rawUser = s[1][0]
    return {
      id: parseInt(s[0]),
      email: rawUser.email,
      groupAccess: rawUser.access
    }
  })
}

//TODO think about how to handle some other cases...
//A boolean type without a value is true kind of things
function listToValidationObject(vs) {
  return listToJSON(vs.map(v => {
    var newV = { ...v }
    newV.attribute = v.attribute.split("-").pop()
    return newV
  }))
}

function measureStatesToMeasures(mss) {
  const measureSets = _.pairs(_.groupBy(mss, (ms) => ms.measureId))
  return measureSets.map(set => {
    const validations = set[1].filter(i => i.attribute.includes('validation-'))
    const attributes = set[1].filter(i => !i.attribute.includes('validation-'))
    var measure = listToJSON(attributes)
    measure.validation = listToValidationObject(validations)
    return measure
  })
}

function patientStatesToPatients(pss) {
  const patientSets = _.pairs(_.groupBy(pss, (ps) => ps.patientId))
  return patientSets.map(s => {
    //The second part of the pair is the list of attributes.
    var patient = listToJSON(s[1])
    //The first part of the pair is the patient Id
    patient.id = parseInt(s[0])

    return patient
  })
}

function patientMeasurementStatesToMeasurements(pmss) {
  //ARG this is the wrong way to do this, should just have a better view!
  var measurements = {}
  pmss.forEach(pms => {
    measurements[pms.accessor] = parseFloat(pms.value)
  })
  return measurements
}



export {
  fullUserGroupsToGroups,
  fullUserGroupsToUsers,
  groupStatesToGroups,
  listToValidationObject,
  measureStatesToMeasures,
  patientStatesToPatients,
  patientMeasurementStatesToMeasurements
}