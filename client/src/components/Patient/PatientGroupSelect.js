import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from '../FormBuilder'

const PatientGroupSelect = props => {
  return (<div className="card large">
    <FormBuilder
      key={props.groupForm.accessor}
      accessor={props.groupForm.accessor}
      elements={props.groupForm.inputs}
      optionStore={props.optionStore}
      onSubmit={props.groupSubmit}
      buttonLabel={props.groupForm.button}
      preventDefault={true}
      onCancel={props.onCancel}
    />
  </div>)
}

PatientGroupSelect.propTypes = {
  groupForm: PropTypes.object,
  optionStore: PropTypes.object,
  onCancel: PropTypes.func,
  groupSubmit: PropTypes.func
}

export default PatientGroupSelect