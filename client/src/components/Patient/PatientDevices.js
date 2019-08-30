import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import formatColumns from '../../functions/formatColumns'

const PatientDevices = props => {
  const columns =
    formatColumns(
      props.deviceCols,
      props.viewDevice,
      `View`
    )
  return (<div className="card large">
    <ReactTable
      data={props.devices}
      columns={columns}
      filterable={true}
      minRows={0}
    />
  </div>)
}

PatientDevices.propTypes = {
  viewDevice: PropTypes.func,
  deviceCols: PropTypes.array,
  devices: PropTypes.array
}

export default PatientDevices