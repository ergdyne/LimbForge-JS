import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
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
//CSS
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12"><div className="card round white"><div className="container padding">
        {/* ReactTable provides a bunch of built in functionality for tables. */}
        <ReactTable
          data={this.props.patients}
          columns={columns}
          filterable={true}
          minRows={0}
        />
      </div></div></div></div></div></div>
    )
  }
}

PatientList.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.object
  ),
  viewPatient: PropTypes.func.isRequired,
  patientColHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  )
}