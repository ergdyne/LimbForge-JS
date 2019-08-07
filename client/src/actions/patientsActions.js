import axios from 'axios'
import { recordsToPatients, recordsToDevices } from '../functions/convertView'
import { AXIOS_CONFIG, API_URL } from '../config/API'

export function getPatients() {
  return function (dispatch) {
    axios.get(`${API_URL}patient/all`, AXIOS_CONFIG)
      .then((response) => {
        const patients = recordsToPatients(response.data)
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
    }, AXIOS_CONFIG)
      .then((response) => {
        //Well really just one patient...
        const patients = recordsToPatients(response.data.patientRecords)
        const devices = recordsToDevices(response.data.patientDeviceRecords)
        //TODO add devices?
        //But just in case there is a problem...TODO should ===1?
        if (patients.length > 0) {
          var patient = patients[0]
          //add the groupName to the patient
          patient.groupName = response.data.groupName
          dispatch({ type: "GET_PATIENT", payload: { patient: patient, devices: devices } })
        } else {
          dispatch({ type: "GET_PATIENT_REJECTED", payload: 'Something wrong with data.' })
        }
      })
      .catch((err) => {
        dispatch({ type: "GET_PATIENT_REJECTED", payload: err })
      })
  }
}

export function savePatient(patient, inputs, groupName) {
  var patientAttributes = inputs.map(i => (
    {
      recordId: i.recordId,
      value: patient[i.accessor]
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
          //This updates the patient id locally
          patient.id = response.data.patientId
          dispatch({ type: "SAVE_PATIENT", payload: patient })
          dispatch({ type: "SET_EDIT_PATIENT", payload: false })
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
}

export function viewDevice(device) {
  return {
    type: "SET_DEVICE",
    payload: device
  }
}

export function setDevice(device, deviceData, deviceInputs) {
  const deviceAttributes = deviceInputs.map(i => (
    {
      recordId: i.recordId,
      value: deviceData[i.accessor]
    }
  )
  ).filter(a => a.value != null)

  device.deviceData = deviceAttributes
  return {
    type: "SET_DEVICE",
    payload: device
  }
}

//TODO better define what inputs is and such
export function saveMeasurements(measurements, measurementInputs, patientId, device) {
  const deviceMeasurements = measurementInputs.map(i => (
    {
      recordId: i.recordId,
      value: measurements[i.accessor]//parse float?
    }
  )
  ).filter(a => a.value != null)
  //TODO validate data and check for changes
  //TODO on save device might also have to reload patient data (esp device list)
  if (deviceMeasurements.length > 0) {
    return function (dispatch) {
      axios.post(`${API_URL}patient/save_device`, {
        patientId: patientId,
        deviceId: device.deviceId,
        patientDeviceId: device.patientDeviceId,
        measurements: deviceMeasurements.concat(device.deviceData)
      }, AXIOS_CONFIG)
        .then((response) => {
          //use the response to set device id
          const newDevice = { ...device, patientDeviceId: response.data.patientDeviceId, measurements: measurements }

          dispatch({ type: "SET_DEVICE", payload: newDevice })
          dispatch({ type: "SET_EDIT_DEVICE", payload: false })
          dispatch(getPatient(patientId))
        })
        .catch((err) => {
          dispatch({ type: "SAVE_DEVICE_REJECTED", payload: err })
        })
    }
  }
  return {
    type: "SAVE_DEVICE_REJECTED",
    payload: {}
  }
}


export function deletePatient(patientId) {
  return function (dispatch) {
    axios.post(`${API_URL}patient/delete`, {
      patientId: patientId
    }, AXIOS_CONFIG).then(response => {
      dispatch({
        type: "DELETE_PATIENT",
        payload: { }
      })
      dispatch(getPatients())

    })
  }
}

export function clearPatient() {
  return {
    type: "CLEAR_PATIENT",
    payload: {}
  }
}


