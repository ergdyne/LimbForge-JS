import React from 'react'
import PropTypes from 'prop-types'
import formatValue from '../functions/formatValue'
import isEmpty from '../functions/isEmpty'
import { patientInputs} from '../config/defaultDisplay'

export default class PatientData extends React.Component {
  render() {
    //CSS
    return (
      <div>
        
        <div>{`Patient:`}</div>
        {/* Temporary formating */}
        <div>
          {patientInputs.map(x => { return <span key={`header-${x.accessor}`}><span>{x.name}</span><span>{" - "}</span></span> })}

        </div>
        <div>{patientInputs.map(x => { return (<span key={x.accessor}><span>{formatValue(x.type, this.props.patient[x.accessor])}</span><span>{" - "}</span></span>) })}</div>
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
      </div>
    )
  }
}

//WELL, this might not be valid any longer...
PatientData.propTypes = {
  measurements: PropTypes.object,
  patient: PropTypes.object,
  measurementInputs: PropTypes.array
}