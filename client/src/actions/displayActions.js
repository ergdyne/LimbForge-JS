import axios from 'axios'
import { measureStatesToMeasures } from '../functions/convertView'
import { uxToColumns } from '../functions/uxConvert'

import { AXIOS_CONFIG, API_URL } from '../config/API'

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