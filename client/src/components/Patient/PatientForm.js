import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from '../FormBuilder'

const PatientForm = props => {
  return (<div className='card large'>
    <div className='row'>
      <FormBuilder
        title={props.patientForm.name}
        key={props.patientForm.accessor}
        accessor={props.patientForm.accessor}
        elements={props.patientForm.inputs}
        onSubmit={props.patientSubmit}
        buttonLabel={props.patientForm.button}
        preventDefault={true}
        //At the moment patient seems to always be at least {id:null}, which means this Ternary is probably not needed
        initial={(props.patient) ? props.patient : {}}
        onCancel={props.onCancel}
      />
    </div>
    {/* If the patient has been saved and in edit mode, if the option to delete. */}
    {(props.patient.id > 0) ?
      <div className='row'>
        <button onClick={() => props.deletePatient(props.patient.id)}>{`Delete Patient`}</button>
      </div> : <span />
    }
  </div>)
}

PatientForm.propTypes = {
  patientForm: PropTypes.object,
  patient: PropTypes.object,
  patientSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  deletePatient: PropTypes.func
}

export default PatientForm