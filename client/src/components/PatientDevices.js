import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import FormBuilder from './FormBuilder'
import formatColumns from '../functions/formatColumns'

//If Patient Data
////Add button 
////List

export default class PatientDevices extends React.Component {
  render() {
    const columns =
      formatColumns(
        this.props.deviceCols,
        this.props.viewDevice,
        `View`
      )

    return (
      <div>
        {/* This form (and list) will just adjust settings on the Patient Device area */}
        <div className="row">
          {/* TODO add in amputation level selection - decide what to do with nozzle --- in the download form?*/}
          <FormBuilder
            title={this.props.addDeviceForm.name}
            className="card large"
            key={this.props.addDeviceForm.accessor}
            accessor={this.props.addDeviceForm.accessor}
            elements={this.props.addDeviceForm.inputs}
            onSubmit={this.addDevice}
            submitValue={this.props.addDeviceForm.button}
            clearOnSubmit={true}
            preventDefault={true}
          />
        </div>
        {(this.props.devices.length>0)?
          <ReactTable
            className="row"
            data={this.props.devices}
            columns={columns}
            filterable={true}
            minRows={0}
          />:<span/>
        }
      </div>
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