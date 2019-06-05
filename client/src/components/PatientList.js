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
    //TODO if using ReactTable in more places, add version of formatColumns with multiple callback availability (list of callbacks?).
    const columns =
      formatColumns(
        this.props.patientColHeaders,
        this.props.viewPatient,
        `View`
      )

    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12"><div className="card round white"><div className="container padding">
        {/* ReactTable provides a bunch of built in functionality for tables. */}
        <ReactTable
          data={this.props.patients}
          columns={columns}
          filterable={true}
        />
      </div></div></div></div></div></div>
    )
  }
}

PatientList.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      pkPatient: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      dateOfBirth: PropTypes.instanceOf(Date),
      dateOfAmputation: PropTypes.instanceOf(Date),
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      amputationLevel: PropTypes.string.isRequired,
      amputationCause: PropTypes.string
    })
  ),
  viewPatient: PropTypes.func.isRequired,
  patientColHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  )
}