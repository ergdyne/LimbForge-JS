import React from 'react'
import { connect } from 'react-redux'
import PatientData from '../components/PatientData'
import PatientDevices from '../components/PatientDevices'
import PatientDevice from '../components/PatientDevice'
import { getPatient, savePatient, deletePatient, clearPatient, setDeviceType, setDevice } from '../actions/patientsActions'
import { getForm, getColHeaders, setEditPatient, setEditDevice, setShowDevice } from '../actions/displayActions'
import { getGroupOptions } from '../actions/displayActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user, //matters for new patient
    patient: store.patients.patient,
    isEditPatient: store.display.editPatient,
    showDevice: store.display.showDevice,
    optionStore: store.display.optionStore,
    addDeviceForm: store.display.addDevice,
    groupForm: store.display.selectGroup,
    patientForm: store.display.patientForm,
    deviceCols: store.display.deviceCols,
    devices: store.patients.devices
  })
})
export default class Patient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: null //TODO move to store
    }
  }

  componentWillMount() {
    const d = this.props.dispatch
    d(getForm('patientData'))
    d(getForm('selectGroup'))
    d(getForm('addDevice'))
    d(getColHeaders('deviceCols'))
    d(getGroupOptions())
    const { patientId } = this.props.match.params

    const id = parseInt(patientId)
    if (patientId && !(isNaN(id))) {
      //Existing Patient, get patient Data.
      d(getPatient(id))
      d(setEditPatient(false))
    } else {
      //New patient, get group options and open the form.
      d(getGroupOptions())
      d(setEditPatient(true))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearPatient())
  }

  componentDidUpdate() {
    //Two ways that the groupName can get set automatically
    //New patient for a user with one group
    if (this.props.optionStore.groupOptions.length === 1 && this.state.groupName == null) {
      this.setState({ groupName: this.props.optionStore.groupOptions[0] })
    }
    //existing patient
    if (this.state.groupName == null && this.props.patient.groupName) {
      this.setState({ groupName: this.props.patient.groupName })
    }
  }

  groupSubmit = (group) => {
    //TODO fix the form instead of using this hack
    if (group.groupName) {
      this.setState({ groupName: group.groupName })
    } else {
      this.setState({ groupName: this.props.optionStore.groupOptions[0] })
    }
  }

  //Callback for patient Data form.
  patientSubmit = (patient) => {
    //Check if patient exists
    if (this.props.patient.id) {
      patient.id = this.props.patient.id
    }
    this.props.dispatch(savePatient(patient, this.props.patientForm.inputs, this.state.groupName))
  }

  //Permanently deletes the patient.
  removePatient = (patientId) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      this.props.dispatch(deletePatient(patientId))
      this.props.history.push('/patients/')
    }
  }

  //TODO move some of this to patientActions
  addDevice = (deviceData) => {
    const d = this.props.dispatch
    var device = { ...deviceData }
    device.deviceId = 1
    device.patientDeviceId = null
    d(setDeviceType(device, deviceData, this.props.addDeviceForm.inputs))
    d(setShowDevice(true))
    d(setEditDevice(true))
    //When adding more devices, change this.
    d(getForm('transradialDevice'))
  }

  //TODO move some of this to patientActions
  viewDevice = (patientDeviceId) => {
    const device = this.props.devices.find(dev => dev.patientDeviceId === patientDeviceId)
    const d = this.props.dispatch
    d(setDevice(device))
    d(setShowDevice(true))
    d(setEditDevice(false))
    //When adding more devices, change this.
    d(getForm('transradialDevice'))
  }

  //TODO This page looks rather messy at the moment.
  render() {
    return (
      <div className="container row">
        <PatientData
          hasGroupSelect={(
            (!this.props.patient.id) &&
            this.state.groupName == null &&
            this.props.optionStore.groupOptions.length > 1
          )}
          groupForm={this.props.groupForm}
          optionStore={this.props.optionStore}
          groupSubmit={this.groupSubmit}
          patient={this.props.patient}
          editPatient={() => this.props.dispatch(setEditPatient(true))}
          deletePatient={this.removePatient}
          hasPatientForm={this.props.isEditPatient}
          patientForm={this.props.patientForm}
          patientSubmit={this.patientSubmit}
        />
        {(this.props.showDevice) ?
          <PatientDevice
          /> : <span />
        }

        {
          (this.props.patient.id) ?
            <PatientDevices
              addDeviceForm={this.props.addDeviceForm}
              addDevice={this.addDevice}
              viewDevice={this.viewDevice}
              deviceCols={this.props.deviceCols}
              devices={this.props.devices}
            /> : <span />
        }

      </div >
    )
  }
}
