import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import formatColumns from '../functions/formatColumns'

export default class PatientList extends React.Component {
  constructor(props) {
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
        className="row"
        data={this.props.patients}
        columns={columns}
        filterable={true}
        minRows={0}
      />
    )
  }
}

PatientList.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.object
  ),
  viewPatient: PropTypes.func.isRequired,
  patientColHeaders: PropTypes.array.isRequired
  
}