import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from '../FormBuilder'

const PatientAddDevice = props => {
  return (<div className="card large">
    <FormBuilder
      title={props.addDeviceForm.name}
      key={props.addDeviceForm.accessor}
      accessor={props.addDeviceForm.accessor}
      elements={props.addDeviceForm.inputs}
      onSubmit={props.addDevice}
      buttonLabel={props.addDeviceForm.button}
      clearOnSubmit={true}
      preventDefault={true}
    />
  </div>)
}

PatientAddDevice.propTypes = {
  addDeviceForm: PropTypes.object,
  addDevice: PropTypes.func
}

export default PatientAddDevice