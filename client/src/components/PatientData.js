import React from 'react'
import PropTypes from 'prop-types'
import formatValue from '../functions/formatValue'
import isEmpty from '../functions/isEmpty'
import { patientInputs } from '../config/defaultDisplay'

export default class PatientData extends React.Component {

  attributeMap = (x, p) => {
    return ((p[x.accessor]) ?
        <label key={`header-${x.accessor}`} className="row">{`${x.name}: `}
          <span className="col-sm-2" > {formatValue(x.type, p[x.accessor])}</span>
        </label> : <span />
    )
  }

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
          {extraData.map(x => this.attributeMap(x, p))}

        </div >
        <div>{(this.props.editPatient) ?
          <button onClick={() => this.props.editPatient()}>{`Edit`}</button> :
          <span></span>
        }</div>
        <hr />
        <div>
          {(!isEmpty(this.props.measurements)) ?
            <div>
              <h3 className="row">{'Measurements'}</h3>
              {this.props.measurementInputs.map(x => this.attributeMap(x, this.props.measurements))}
              {(this.props.editMeasurement) ?
                <button className="row" onClick={() => this.props.editMeasurement()}>{`Edit`}</button> :
                <span/>
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