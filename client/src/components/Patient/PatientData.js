import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from '../FormBuilder'
import PatientDataBox from './PatientDataBox'

export default class PatientData extends React.Component {
  render() {

    return (
      <span >
        {/* Patient Data is in Group Select, edit, or display mode. */}
        {/* For new patients, where the user is in multiple groups, select group first. */}
        {(this.props.hasGroupSelect) ?
          <div className="card large">
            <FormBuilder
              key={this.props.groupForm.accessor}
              accessor={this.props.groupForm.accessor}
              elements={this.props.groupForm.inputs}
              optionStore={this.props.optionStore}
              onSubmit={this.props.groupSubmit}
              buttonLabel={this.props.groupForm.button}
              preventDefault={true}
              onCancel={this.props.onCancel}
            /> </div> :
          // If group is determined, show patient form or Patient Data
          <span>
            {(this.props.hasPatientForm) ?
              <div className='card large'>
                <div className='row'>
                  <FormBuilder
                    title={this.props.patientForm.name}
                    key={this.props.patientForm.accessor}
                    accessor={this.props.patientForm.accessor}
                    elements={this.props.patientForm.inputs}
                    onSubmit={this.props.patientSubmit}
                    buttonLabel={this.props.patientForm.button}
                    preventDefault={true}
                    initial={(this.props.patient) ? this.props.patient : {}} 
                    //At the moment patient seems to always be at least {id:null}, which means this Ternary is probably not needed
                    onCancel={this.props.onCancel}
                  />
                </div>
                {/* If the patient has been saved and in edit mode, if the option to delete. */}
                {(this.props.patient.id > 0) ?
                  <div className='row'>
                    <button onClick={() => this.props.deletePatient(this.props.patient.id)}>{`Delete Patient`}</button>
                  </div> :
                  <span />
                }
              </div> :
              // If not editing, show the patient data. className defined in Component.
              <PatientDataBox
                patient={this.props.patient}
                inputs={this.props.patientForm.inputs}
                editPatient={this.props.editPatient}
              />
            }
          </span>
        }
      </span>
    )
  }
}

//TODO all props
PatientData.propTypes = {
  patient: PropTypes.object,
  editPatient: PropTypes.func,
  onCancel: PropTypes.func
}