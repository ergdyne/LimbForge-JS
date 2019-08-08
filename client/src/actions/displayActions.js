import axios from 'axios'
import { uxToColumns, uxToForm } from '../functions/uxConvert'

import { AXIOS_CONFIG, API_URL } from '../config/API'

export function getGroupOptions() {
  return function (dispatch) {
    axios.get(`${API_URL}group/options`, AXIOS_CONFIG)
      .then((response) => {
        dispatch({ type: "GET_GROUP_OPTIONS", payload: response.data.groupNames })
      })
      .catch((err) => {
        dispatch({ type: "GET_GROUP_OPTIONS_REJECTED", payload: err })
      })
  }
}

//Column headers can be stored in an ux document in the DB allowing for admin to adjust tables.
export function getColHeaders(table) {
  return function (dispatch) {
    axios.get(`${API_URL}ux/${table}`)
      .then(response => {
        const columns = uxToColumns(response.data.records)
        dispatch({
          type: "GET_COL_HEADERS",
          payload: {
            table: table,
            data: columns
          }
        })
      }).catch(err => { dispatch({ type: "GET_COL_HEADERS_REJECTED", payload: err }) })
  }
}

//Forms can be defined with a ux document in the DB allowing for admin to create forms and devices to have different inputs/measurments.
export function getForm(formAccessor) {
  return function (dispatch) {
    axios.get(`${API_URL}ux/${formAccessor}`)
      .then(response => {
        const { accessor, attributes, records } = response.data
        const form = uxToForm(accessor, attributes, records)
        dispatch({
          type: "GET_FORM",
          payload: form
        })
      }).catch(err => { dispatch({ type: "GET_FORM_REJECTED", payload: err }) })
  }
}

//Turns the edit patient form on/off with boolean.
export function setEditPatient(b){
  return {
    type: "SET_EDIT_PATIENT",
    payload: b
  }
}

//Turns the edit device form on/off with boolean.
export function setEditDevice(b){
  return {
    type: "SET_EDIT_DEVICE",
    payload: b
  }
}

//Turns device area on/off with boolean
export function setShowDevice(b){
  return {
    type: "SET_SHOW_DEVICE",
    payload: b
  }
}