import React from 'react'
import PropTypes from 'prop-types'
import formatValue from '../functions/formatValue'
import isEmpty from '../functions/isEmpty'
import { patientInputs } from '../config/defaultDisplay'

export default class PatientData extends React.Component {
  render() {
    //CSS
    const p = this.props.patient
    const explicitData = ['firstName', 'lastName', 'city', 'country', 'groupName']
    const extraData = patientInputs.filter(x => !explicitData.includes(x.accessor))

    return (
      <div className="container">

        <h2 className='row'>
          {`Patient: ${(p.firstName) ? p.firstName : ''} ${(p.lastName) ? p.lastName : ''}`}
        </h2>
        <h3 className='row'>
          {`${(p.city) ? `${p.city},` : ''} ${p.country} - ${p.groupName}`}
        </h3>
        {/* Temporary formating */}
        <div>
          {extraData.map(x => {
            return ((p[x.accessor]) ?
              <div className='row' key={`header-${x.accessor}`}>
                <span className="col-sm-1">{`${x.name}: `}</span>
                <span className="col-sm-2" > {formatValue(x.type, p[x.accessor])}</span>
              </div> : <span />
            )
          })}

        </div >
        <div>{(this.props.editPatient) ?
          <button onClick={() => this.props.editPatient()}>{`Edit`}</button> :
          <span></span>
        }</div>
        <hr />
        <div>
          {(!isEmpty(this.props.measurements)) ?
            <div>
              {
                <div>
                  <div>{'Measurements:'}</div>
                  <div>{this.props.measurementInputs.map(x => { return <span key={`header-${x.accessor}`}><span>{x.name}</span><span>{" - "}</span></span> })}</div>
                  <div>{this.props.measurementInputs.map(x => { return (<span key={x.accessor}><span>{formatValue(x.type, this.props.measurements[x.accessor])}</span><span>{" - "}</span></span>) })}</div>
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
      </div >
    )
  }
}

//WELL, this might not be valid any longer...
PatientData.propTypes = {
  measurements: PropTypes.object,
  patient: PropTypes.object,
  measurementInputs: PropTypes.array
}