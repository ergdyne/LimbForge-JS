import axios from 'axios'
import { patientStatesToPatients, patientMeasurementStatesToMeasurements } from '../functions/convertView'
import {measurements as ms} from '../testData'
import {AXIOS_CONFIG, API_URL} from '../config/API'

export function getPatients() {
  return function (dispatch) {
    axios.get(`${API_URL}patient/all`,AXIOS_CONFIG)
      .then((response) => {
        const patients = patientStatesToPatients(response.data)
        dispatch({ type: "GET_PATIENTS", payload: patients })
      })
      .catch((err) => {
        dispatch({ type: "GET_PATIENTS_REJECTED", payload: err })
      })
  }
}

export function getPatient(patientId) {
  return function (dispatch) {
    axios.post(`${API_URL}patient/one`, {
      patientId: patientId
    },AXIOS_CONFIG)
      .then((response) => {
        //Well really just one patient...
        const patients = patientStatesToPatients(response.data.patientStates)
        
        const measurements = patientMeasurementStatesToMeasurements(response.data.patientMeasurementStates,ms)
        //But just in case there is a problem...TODO should ===1?
        if (patients.length > 0) {
          var patient = patients[0]
          //add the groupName to the patient
          patient.groupName = response.data.groupName
          dispatch({ type: "GET_PATIENT", payload: {patient: patient, measurements:measurements} })
        }else{
          dispatch({ type: "GET_PATIENT_REJECTED", payload: 'Something wrong with data.' })
        }
      })
      .catch((err) => {
        dispatch({ type: "GET_PATIENT_REJECTED", payload: err })
      })
  }
}

export function savePatient(patient, inputs, groupName) {
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
      axios.post(`${API_URL}patient/save`, {
        patientId: patient.id,
        patientInputs: patientAttributes,
        groupName: groupName
      }, AXIOS_CONFIG)
        .then((response) => {
          //We only need the patient id

          patient.id = response.data.patientId
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
      axios.post(`${API_URL}patient/save_measurements`, {
        patientId: patientId,
        measurements: patientMeasurements
      },AXIOS_CONFIG)
        .then((response) => {
          //The response doesn't matter much...
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


