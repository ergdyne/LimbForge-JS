import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import formatValue from '../functions/formatValue'
import { patientInputs, measurementInputs } from '../testData'

export default class PatientData extends React.Component {
  constructor(props) {
    super(props)
  }

  //Temporary
  render() {
    return (
      <div>
        
        <div>{`Patient:`}</div>
        {/* Temporary formating */}
        <div>
          {patientInputs.map(x => { return <span key={`header-${x.accessor}`}><span>{x.label}</span><span>{" - "}</span></span> })}

        </div>
        <div>{patientInputs.map(x => { return (<span key={x.accessor}><span>{formatValue(x.type, this.props.patient[x.accessor])}</span><span>{" - "}</span></span>) })}</div>
        <div>{(this.props.editPatient) ?
          <button onClick={() => this.props.editPatient()}>{`Edit`}</button> :
          <span></span>
        }</div>
        <hr />
        <div>
          {(this.props.patient.measurements) ?
            <div>
              {
                <div>
                  <div>{'Measurements:'}</div>
                  <div>{measurementInputs.map(x => { return <span key={`header-${x.accessor}`}><span>{x.label}</span><span>{" - "}</span></span> })}</div>
                  <div>{measurementInputs.map(x => { return (<span key={x.accessor}><span>{formatValue(x.type, this.props.patient.measurements[x.accessor])}</span><span>{" - "}</span></span>) })}</div>
                  <div>
                    {(this.props.editMeasurement) ?
                      <button onClick={() => this.props.editMeasurement()}>{`Edit`}</button> :
                      <span></span>
                    }
                  </div>
                </div>
              }
            </div> :
            <div></div>
          }</div>
      </div>
    )
  }
}

//WELL, this might not be valid any longer...
PatientData.propTypes = {
  patient: PropTypes.shape({
    pkPatient: PropTypes.number,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    dateOfAmputation: PropTypes.instanceOf(Date),
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    amputationCause: PropTypes.string,
    measurements: PropTypes.object,
  }).isRequired
}