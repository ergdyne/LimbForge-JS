import React from 'react'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import {patientInputs} from '../testData'
import moment from 'moment'

export default class Patient extends React.Component {
  constructor(props) {
    super(props)
  }

  //Generalize
  formatValue = (t, v) =>{
    switch (t) {
      case 'date': return moment(v).format('LL')
      default: return v
    }
  }

  //Temporary
  render() {
    console.log(this.props.patient)
    return (
      <div>
        {(this.props.back)?<button onClick={() => this.props.back()}>{`Back`}</button>:<div/>}
        <div>{`Patient:`}</div>
        <div>{patientInputs.map(x=>{return(<span key={x.accessor}><span>{this.formatValue(x.type,this.props.patient[x.accessor])}</span><span>{" - "}</span></span>)})}</div>
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
    measurements: PropTypes.array,
  }).isRequired,
  back: PropTypes.func
}