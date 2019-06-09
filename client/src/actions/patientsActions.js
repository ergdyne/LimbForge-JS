export function getPatients(payload) {
  return {
    type: "GET_PATIENTS",
    payload: payload
  }
}

export function getPatient(patientId) {
  return {
    type: "GET_PATIENT",
    payload: {patientId:patientId}
  }
}

export function savePatient(patient) {
  return {
    type: "SAVE_PATIENT",
    payload: {patient:patient}
  }
}

export function saveMeasurements(patient) {
  return {
    type: "SAVE_MEASUREMENTS",
    payload: {patient:patient}
  }
}

export function updateLevel(level) {
  return {
    type: "UPDATE_FORM_LEVEL",
    payload: {level:level}
  }
}

export function deletePatient(patientId){
  return {
    type: "DELETE_PATIENT",
    payload: {patientId:patientId}
  }
}




