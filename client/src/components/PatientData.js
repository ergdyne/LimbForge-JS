import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from './FormBuilder'
import formatValue from '../functions/formatValue'

export default class PatientData extends React.Component {
  attributeMap = (x, p) => {
    return ((p[x.accessor]) ?
      <label key={`header-${x.accessor}`} className="row">
        {`${x.name}: `}
        <span className="col-sm-2" >
          {formatValue(x.type, p[x.accessor])}
        </span>
      </label> : <span />
    )
  }

  render() {
    //CSS
    const p = this.props.patient
    const explicitData = ['firstName', 'lastName', 'city', 'country', 'groupName']
    const extraData = this.props.patientForm.inputs.filter(x => !explicitData.includes(x.accessor))

    return (
      <div className="container">
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
              /> :
              <div className="Patient container">

                <h2 className='row'>
                  {`Patient: ${(p.firstName) ? p.firstName : ''} ${(p.lastName) ? p.lastName : ''}`}
                </h2>
                <h3 className='row'>
                  {`${(p.city != null) ? `${p.city}${(p.city != null && p.country != null) ? ',' : ''}` : ''} ${(p.country != null) ? `${p.country}` : ''}`}
                </h3>
                {/* Temporary formating */}
                <div>
                  {extraData.map(x => this.attributeMap(x, p))}

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

PatientData.propTypes = {
  patient: PropTypes.object,
  patientInputs: PropTypes.array
}