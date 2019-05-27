import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import {patientInputs, measurementInputs} from '../testData'
import formatValue from '../functions/formatValue'

export default class Patient extends React.Component {
  constructor(props) {
    super(props)
  }

 
  //Temporary
  render() {
    console.log(this.props.patient)
    return (
      <div>
        {(this.props.back)?<button onClick={() => this.props.back()}>{`Back`}</button>:<div/>}
        <div>{`Patient:`}</div>
        {/* Temporary formating */}
        <div>{patientInputs.map(x=>{return <span key={`header-${x.accessor}`}><span>{x.label}</span><span>{" - "}</span></span>})}</div>
        <div>{patientInputs.map(x=>{return(<span key={x.accessor}><span>{formatValue(x.type,this.props.patient[x.accessor])}</span><span>{" - "}</span></span>)})}</div>
        <hr/>
        <div>{(this.props.patient.measurements)?<div>{
          <div>
            <div>{measurementInputs.map(x=>{return <span key={`header-${x.accessor}`}><span>{x.label}</span><span>{" - "}</span></span>})}</div>
            <div>{measurementInputs.map(x=>{return(<span key={x.accessor}><span>{formatValue(x.type,this.props.patient.measurements[x.accessor])}</span><span>{" - "}</span></span>)})}</div>
          </div>
        }</div>:<div></div>}</div>
      </div>
    )
  }
}

//WELL, this might not be valid any longer...
Patient.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.instanceOf(Date),
    dateOfAmputation: PropTypes.instanceOf(Date),
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    amputationLevel: PropTypes.string.isRequired,
    amputationCause: PropTypes.string.isRequired,
    measurements: PropTypes.object,
  }).isRequired,
  back: PropTypes.func
}