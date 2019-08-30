import React from 'react'
import { connect } from 'react-redux'
import ImageCard from '../components/ImageCard'
import PatientAddDevice from '../components/Patient/PatientAddDevice'
import PatientForm from '../components/Patient/PatientForm'
import PatientDataBox from '../components/Patient/PatientDataBox'
import PatientGroupSelect from '../components/Patient/PatientGroupSelect'
import PatientDeviceForm from '../components/Patient/PatientDeviceForm'
import PatientDeviceData from '../components/Patient/PatientDeviceData'
import PatientDevices from '../components/Patient/PatientDevices'
import isEmpty from '../functions/isEmpty'
import {
  getPatient,
  savePatient,
  deletePatient,
  clearPatient,
  setDeviceType,
  setDevice,
  saveMeasurements
} from '../actions/patientsActions'
import {
  getColHeaders,
  getGroupOptions,
  getForm,
  setEditPatient,
  setEditDevice,
  setShowDevice
} from '../actions/displayActions'

@connect((store) => {
  return ({
    addDeviceForm: store.display.addDevice,
    device: store.patients.device,
    deviceCols: store.display.deviceCols,
    devices: store.patients.devices,
    groupForm: store.display.selectGroup,
    isEditPatient: store.display.editPatient,
    isEditDevice: store.display.editDevice,
    measurementForm: store.display.measurementForm,
    optionStore: store.display.optionStore,
    patient: store.patients.patient,
    patientForm: store.display.patientForm,
    showDevice: store.display.showDevice
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
    device.deviceId = 1 //TODO When adding more devices, change this to look up the device.
    device.patientDeviceId = null
    d(setDeviceType(device, deviceData, this.props.addDeviceForm.inputs))
    d(setShowDevice(true))
    d(setEditDevice(true))
    //TODO When adding more devices, change this.
    d(getForm('transradialDevice'))
  }

  //TODO move some of this to patientActions
  viewDevice = (patientDeviceId) => {
    //TODO, this is sloppy! Why, because it shouldn't need the props...
    const device = this.props.devices.find(dev => dev.patientDeviceId === patientDeviceId)
    const d = this.props.dispatch
    d(setDevice(device))
    d(setShowDevice(true))
    d(setEditDevice(false))
    //When adding more devices, change this.
    d(getForm('transradialDevice'))
  }

  cancelPatient = () => {
    if (this.props.patient.id > 0) {
      //if there is a patient, just close edit
      this.props.dispatch(setEditPatient(false))
    } else {
      //If no patient, return to home
      this.props.history.push('/patients/')
    }
  }

  editPatient = () => this.props.dispatch(setEditPatient(true))


  editDevice = () => {
    this.props.dispatch(setEditDevice(true))
  }

  submitMeasurements = (measurements) => {
    this.props.dispatch(saveMeasurements(measurements, this.props.measurementForm.inputs, this.props.patient.id, this.props.device))

  }

  cancelDevice = () => {
    this.props.dispatch(setEditDevice(false))
  }

  deviceImage = (gender, side) => {
    return `https://limbfore-js-assets.s3.amazonaws.com/${gender.toLowerCase()}-transradial-${side.charAt(0).toUpperCase()}.svg`
  }


  //TODO This page looks rather messy at the moment.
  render() {
    //Multi used props
    const device = this.props.device
    const patient = this.props.patient
    const patientForm = this.props.patientForm
    const ms = device.measurments
    const measurementForm = this.props.measurementForm
    const optionStore = this.props.optionStore

    //Booleans for determining form elements
    const hasGroupSelect = (
      (!this.props.patient.id) &&
      this.state.groupName == null &&
      optionStore.groupOptions.length > 1
    )

    const isEditPatient = this.props.isEditPatient
    const isEditDevice = this.props.isEditDevice
    const showDevice = this.props.showDevice && !this.props.isEditPatient
    const hasDevices = this.props.patient.id && !this.props.isEditPatient
    const hasMeasures = !isEmpty(ms)

    return (
      <div className="container" >
        <div className="row">
          {(hasGroupSelect) ?
            <PatientGroupSelect
              groupForm={this.props.groupForm}
              optionStore={optionStore}
              onCancel={this.cancelPatient}
              groupSubmit={this.groupSubmit}
            /> : <span />
          }

          {(!hasGroupSelect && isEditPatient) ?
            <PatientForm
              patientForm={patientForm}
              patient={patient}
              patientSubmit={this.patientSubmit}
              onCancel={this.cancelPatient}
              deletePatient={this.removePatient}
            /> : <span />
          }

          {(!hasGroupSelect && !isEditPatient) ?
            <PatientDataBox
              patient={patient}
              inputs={patientForm.inputs}
              editPatient={this.editPatient}
            /> : <span />
          }

          {(showDevice && hasMeasures) ?
              <PatientDeviceData
                patient={patient}
                device={device}
                measurements={ms}
                inputs={measurementForm.inputs}
                editDevice={this.editDevice}
                isEditDevice={isEditDevice}
              /> : <span />
          }

          {(showDevice && isEditDevice) ?
            <PatientDeviceForm
              patient={patient}
              device={device}
              measurments={ms}
              measurementForm={measurementForm}
              submitMeasurements={this.submitMeasurements}
              onCancel={this.cancelDevice}
            /> : <span />
          }

          {(showDevice && isEditDevice)?
          <ImageCard
            imageSource={this.deviceImage(patient.gender, device.side)}
          />:<span/>}


          {(hasDevices && !isEditDevice) ?
            <PatientAddDevice
              addDeviceForm={this.props.addDeviceForm}
              addDevice={this.addDevice}
            /> : <span />
          }

          {(hasDevices && this.props.devices.length > 0) ?
            <PatientDevices
              viewDevice={this.viewDevice}
              deviceCols={this.props.deviceCols}
              devices={this.props.devices}
            /> : <span />
          }
        </div>
      </div >
    )
  }
}
