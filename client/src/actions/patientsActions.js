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
  console.log('saving', patient)
  console.log(inputs)
  const patientAttributes = inputs.map(i => (
    {
      attribute: i.accessor,
      value: patient[i.accessor],
      type: i.type
    }
  )
  ).filter(a => a.value != null)
  console.log('pats', patientAttributes)

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
          console.log(response.data.patientId)
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

export function saveMeasurements(measurements) {
  return {
    type: "SAVE_MEASUREMENTS",
    payload: measurements
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


