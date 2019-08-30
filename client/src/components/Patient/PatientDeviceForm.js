import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from '../FormBuilder'

const PatientDeviceForm = props => {
  return (<div className="card large" >
    <FormBuilder
      title={props.measurementForm.name}
      key={props.measurementForm.accessor}
      accessor={props.measurementForm.accessor}
      elements={props.measurementForm.inputs}
      onSubmit={props.submitMeasurements}
      onCancel={props.onCancel}
      buttonLabel={props.measurementForm.button}
      preventDefault={true}
      initial={props.measurments}
    />
  </div>)
}

PatientDeviceForm.propTypes = {
  patient: PropTypes.object,
  device: PropTypes.object,
  measurments: PropTypes.object,
  measurementForm: PropTypes.object,
  submitMeasurements: PropTypes.func,
  onCancel: PropTypes.func
}

export default PatientDeviceForm
