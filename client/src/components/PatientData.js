import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from './FormBuilder'
import attributeMap from '../functions/attributeMap'

export default class PatientData extends React.Component {
  

  render() {
    //CSS
    const p = this.props.patient
    const explicitData = ['firstName', 'lastName', 'city', 'country', 'groupName']
    const extraData = this.props.patientForm.inputs.filter(x => !explicitData.includes(x.accessor))

    return (
      <div >
        {(this.props.hasGroupSelect) ?
          <FormBuilder
            className="card large"
            key={this.props.groupForm.accessor}
            accessor={this.props.groupForm.accessor}
            elements={this.props.groupForm.inputs}
            optionStore={this.props.optionStore}
            onSubmit={this.props.groupSubmit}
            buttonLabel={this.props.groupForm.button}
            preventDefault={true}
          /> :
          <div>
            {(this.props.hasPatientForm) ?
              <div className='container'>
                <div className='row'>
                  <FormBuilder
                    title={this.props.patientForm.name}
                    key={this.props.patientForm.accessor}
                    accessor={this.props.patientForm.accessor}
                    className="card large"
                    elements={this.props.patientForm.inputs}
                    onSubmit={this.props.patientSubmit}
                    buttonLabel={this.props.patientForm.button}
                    preventDefault={true}
                    initial={(this.props.patient) ? this.props.patient : {}}
                  />
                </div>
                {(this.props.patient.id >0)?
                  <div className='row'>
                    <button onClick={() => this.props.deletePatient(this.props.patient.id)}>{`Delete Patient`}</button>
                  </div>:
                  <span/>
                }
              </div> :
              <div className="Patient container card large">

                <h2 className='row'>
                  {`Patient: ${(p.firstName) ? p.firstName : ''} ${(p.lastName) ? p.lastName : ''}`}
                </h2>
                <h3 className='row'>
                  {`${(p.city != null) ? `${p.city}${(p.city != null && p.country != null) ? ',' : ''}` : ''} ${(p.country != null) ? `${p.country}` : ''}`}
                </h3>
                {/* Temporary formating */}
                <div>
                  {extraData.map(x => attributeMap(x, p))}

                </div >
                <div>{(this.props.editPatient) ?
                  <button onClick={() => this.props.editPatient()}>{`Edit`}</button> :
                  <span></span>
                }</div>
                <hr />
              </div >
            }
          </div>
        }
      </div>
    )
  }
}

//TODO all props
PatientData.propTypes = {
  patient: PropTypes.object,
  patientInputs: PropTypes.array
}