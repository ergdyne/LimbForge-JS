import axios from 'axios'
import { measureStatesToMeasures } from '../functions/convertView'
import { uxToColumns, uxToForm } from '../functions/uxConvert'

import { AXIOS_CONFIG, API_URL } from '../config/API'

export function getGroupOptions(){
  return function (dispatch) {
    axios.get(`${API_URL}group/options`,AXIOS_CONFIG)
      .then((response) => {
        dispatch({ type: "GET_GROUP_OPTIONS", payload: response.data.groupNames })
      })
      .catch((err) => {
        dispatch({ type: "GET_GROUP_OPTIONS_REJECTED", payload: err })
      })
  }
}

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
      }).catch(err=>{ dispatch({type: "GET_COL_HEADERS_REJECTED",payload:err})})
  }
}

export function getForm(formAccessor){
  return function (dispatch){
    axios.get(`${API_URL}ux/${formAccessor}`)
    .then(response=>{
      const {accessor,attributes,records} = response.data
      const form = uxToForm(accessor,attributes,records)
      dispatch({
        type: "GET_FORM",
        payload: form
      })
    }).catch(err=>{ dispatch({type: "GET_FORM_REJECTED",payload:err})})
  }
}

//Can add device here?
export function getMeasures(device) {
  return function (dispatch) {
    axios.post(`${API_URL}measure/all`, { device: device }, AXIOS_CONFIG)
      .then(response => {
        const measures = measureStatesToMeasures(response.data.messureStates)
        dispatch({
          type: "GET_MEASURE_INPUTS",
          payload: measures
        })
      }).catch(err => {
        dispatch({ type: "GET_MEASURE_INPUTS_REJECTED", payload: err })
      })
  }
}