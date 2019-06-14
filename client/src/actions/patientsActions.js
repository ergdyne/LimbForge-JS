import isEmpty from '../functions/isEmpty'

export function getPatients(payload) {
  return {
    type: "GET_PATIENTS",
    payload: payload
  }
}

export function getPatient(patientId) {
  return {
    type: "GET_PATIENT",
    payload: { patientId: patientId }
  }
}

export function savePatient(patient, inputs) {
  console.log('saving', patient)
  console.log(inputs)
  const patientAttributes = inputs.map(i =>(
      {
        attribute: i.accessor,
        value: patient[i.accessor],
        type: i.type
      }
    )
  ).filter(a=>a.value != null)
  console.log('pats', patientAttributes)

  //START HERE with connect up
  //TODO seperate measurements from the patient item
  return {
    type: "SAVE_PATIENT",
    payload: { patient: patient }
  }
}

export function saveMeasurements(patient) {
  return {
    type: "SAVE_MEASUREMENTS",
    payload: { patient: patient }
  }
}

export function updateLevel(level) {
  return {
    type: "UPDATE_FORM_LEVEL",
    payload: { level: level }
  }
}

export function deletePatient(patientId) {
  return {
    type: "DELETE_PATIENT",
    payload: { patientId: patientId }
  }
}

export function clearPatient() {
  return {
    type: "CLEAR_PATIENT",
    payload: {}
  }
}


