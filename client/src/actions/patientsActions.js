import axios from 'axios'

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

export function savePatient(patient, inputs, groupId) {
  console.log("ats for for ", patient.id, patient, inputs, groupId)
  const patientAttributes = inputs.map(i => (
    {
      attribute: i.accessor,
      value: patient[i.accessor], //TODO add safety...
      type: i.type
    }
  )
  ).filter(a => a.value != null)

  //TODO check if changes
  if (patientAttributes.length > 0) {
    return function (dispatch) {
      axios.post('http://localhost:3000/patient/save', {
        patientId: patient.id,
        patientInputs: patientAttributes,
        groupId: groupId //TODO make it come from somewhere else
      })
        .then((response) => {
          //We only need the patient id
          
          patient.id = response.data.patientId
          console.log(patient.id)
          dispatch({ type: "SAVE_PATIENT", payload: patient })
        })
        .catch((err) => {
          dispatch({ type: "SAVE_PATIENT_REJECTED", payload: err })
        })
    }
  }
  return {
    type: "SAVE_PATIENT_REJECTED",
    payload: {}
  }
  //let { patientInputs, groupId, patientId } = req.body
}

export function saveMeasurements(measurements, inputs, patientId) {
  console.log("m for ", patientId)
  const patientMeasurements = inputs.map(i => (
    {
      accessor: i.accessor,
      value: measurements[i.accessor]//parse float?
    }
  )
  ).filter(a => a.value != null)

  //TODO validate data and check for changes
  if (patientMeasurements.length > 0) {
    return function (dispatch) {
      axios.post('http://localhost:3000/patient/save_measurements', {
        patientId: patientId,
        measurements: patientMeasurements
      })
        .then((response) => {
          //The response doesn't matter much...
          console.log('resp',response.data.patientId)
          dispatch({ type: "SAVE_MEASUREMENTS", payload: measurements })
        })
        .catch((err) => {
          dispatch({ type: "SAVE_MEASUREMENTS_REJECTED", payload: err })
        })
    }
  }
  return {
    type: "SAVE_MEASUREMENTS_REJECTED",
    payload: {}
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


