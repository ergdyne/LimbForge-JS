import React from 'react'
import { connect } from 'react-redux'
import PatientData from '../components/PatientData'
import PatientDevices from '../components/PatientDevices'
import PatientDevice from '../components/PatientDevice'
import { getPatient, savePatient, deletePatient, clearPatient,setDevice } from '../actions/patientsActions'
import { getForm, getColHeaders,setEditPatient, setEditDevice,setShowDevice } from '../actions/displayActions'
import { getGroupOptions } from '../actions/displayActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user, //matters for new patient
    patient: store.patients.patient,
    isEditPatient: store.display.editPatient,
    showDevice: store.display.showDevice,
    optionStore: store.display.optionStore,
    addBuildForm: store.display.addBuild,
    groupForm: store.display.selectGroup,
    patientForm: store.display.patientForm,
    deviceCols: store.display.deviceCols
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
    d(getForm('addBuild'))
    d(getColHeaders('deviceCols'))
    d(getGroupOptions())
    const { patientId } = this.props.match.params
    //well some more filtering than this...? Also there is a 0 index, but not a 0 patientId ;)
    const id = parseInt(patientId)
    if (patientId && !(isNaN(id))) {
      d(getPatient(id))
      d(setEditPatient(false))
    } else {
      d(getGroupOptions())
      d(setEditPatient(true))
    }

    //TODO should trigger somewhere else?
    //TODO replace with actual device information
    //this.props.dispatch(getMeasures('nothing'))
  }

  componentWillUnmount() {
    this.props.dispatch(clearPatient())
    this.setState({ measuresSRC: null })
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
    //These should only be called if required as updating state in componentDidUpdate can cause an infinit loop.
  }

  groupSubmit = (group) => {
    //TODO fix the form instead of using this hack
    if (group.group) {
      this.setState({ groupName: group.group })
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

  //TODO add to patient data
  removePatient = (patientId) => {
    console.log("Would be like are you sure?")
    this.props.dispatch(deletePatient(patientId))
  }

  addDevice = (deviceData) => {
    console.log('Device data', deviceData) //TODO move to store
    const d = this.props.dispatch
    d(setDevice({
      deviceId:1,
      patientDeviceId:null,
      side:deviceData.side,
      nozzleSize:deviceData.nozzleSize
    }))
    d(setShowDevice(true))
    d(setEditDevice(true))
    d(getForm('transradialBuild'))
  }

  render() {
    //TODO adjust location. This can be pulled when the user logs in. See multiple reducers in action from tutorial.
    return (
      //if new patient and group options exist, give a dropdown.
      //If no option or exising patient display group Name
      //CSS - Initial
      <div className="container">
        <PatientData
          className="row"
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
          hasPatientForm={this.props.isEditPatient}
          patientForm={this.props.patientForm}
          patientSubmit={this.patientSubmit}
        />
        {
          (this.props.patient.id) ?
            <PatientDevices
              className="row"
              addDeviceForm={this.props.addBuildForm}
              addDevice={this.addDevice}
              viewDevice={()=>{console.log('view device')}}
              deviceCols={this.props.deviceCols}
              devices={[]}

            /> : <span/>
        }
        {/* Adjust position of this section... */}
        {(this.props.showDevice) ?
          // On unmount -> clear both patient and measurements.
          // On add build -> clear measurements
          <PatientDevice
            className="row"
          /> : <span/>
        }
      </div>
    )
  }
}
