import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'

export default class PatientList extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const columns = 
      formatColumns(
        this.props.patientColHeaders,
        this.props.viewPatient,
        `View`
      )

    return (
      <ReactTable 
        data={this.props.patients}
        columns={columns}
        filterable={true}
      />       
    )
  }
}

PatientList.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.instanceOf(Date),
      dateOfAmputation: PropTypes.instanceOf(Date),
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      amputationLevel: PropTypes.string.isRequired,
      amputationCause: PropTypes.string.isRequired
    })
  ),
  viewPatient: PropTypes.func.isRequired,
  patientColHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  )
}