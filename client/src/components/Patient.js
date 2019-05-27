import React from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'

export default class Patient extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.back()}>{`Back`}</button>
        <div>{`This is patient: ${this.props.patient.firstName}`}</div>
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
  back: PropTypes.func.isRequired
}