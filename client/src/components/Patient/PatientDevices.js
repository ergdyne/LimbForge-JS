import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import FormBuilder from '../FormBuilder'
import formatColumns from '../../functions/formatColumns'

export default class PatientDevices extends React.Component {
  render() {
    const columns =
      formatColumns(
        this.props.deviceCols,
        this.props.viewDevice,
        `View`
      )

    return (
      <span >
        {/* This form (and list) will adjust settings on the Patient Device area */}
        <div className="card large">
          <FormBuilder
            title={this.props.addDeviceForm.name}
            key={this.props.addDeviceForm.accessor}
            accessor={this.props.addDeviceForm.accessor}
            elements={this.props.addDeviceForm.inputs}
            onSubmit={this.props.addDevice}
            buttonLabel={this.props.addDeviceForm.button}
            clearOnSubmit={true}
            preventDefault={true}
          />
        </div>
        {(this.props.devices.length > 0) ?
          <div className="card large">
            <ReactTable
              data={this.props.devices}
              columns={columns}
              filterable={true}
              minRows={0}
            />
          </div> : <span />
        }
      </span>
    )
  }
}

PatientDevices.propTypes = {
  addDeviceForm: PropTypes.object,
  addDevice: PropTypes.func,
  viewDevice: PropTypes.func,
  deviceCols: PropTypes.array,
  devices: PropTypes.array
}