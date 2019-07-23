import React from 'react'
import { connect } from 'react-redux'
import PatientData from '../components/PatientData'
import PatientDevices from '../components/PatientDevices'
import PatientDevice from '../components/PatientDevice'
import { getPatient, saveMeasurements, savePatient, updateLevel, deletePatient, clearPatient } from '../actions/patientsActions'
import { getForm, getColHeaders } from '../actions/displayActions'
import isEmpty from '../functions/isEmpty'
import { getGroupOptions } from '../actions/displayActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user, //matters for new patient
    patient: store.patients.patient,
    level: store.patients.patientFormLevel, //TODO refactor this to session?
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
      groupName: null
    }
  }

  componentWillMount() {
    this.props.dispatch(getForm('patientData'))
    this.props.dispatch(getForm('selectGroup'))
    this.props.dispatch(getForm('addBuild'))
    this.props.dispatch(getColHeaders('deviceCols'))
    this.props.dispatch(getGroupOptions())
    const { patientId } = this.props.match.params
    //well some more filtering than this...? Also there is a 0 index, but not a 0 patientId ;)
    const id = parseInt(patientId)
    if (patientId && !(isNaN(id))) {
      this.props.dispatch(getPatient(id))
    } else {
      this.props.dispatch(getGroupOptions())
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
    //This might be ok without a check?
    if (this.props.patient.id) {
      patient.id = this.props.patient.id
    }

    if (!this.props.patient.amputationLevel) {
      patient.amputationLevel = `Transradial`
    }

    this.setState({ measuresSRC: this.imageLocation(patient.gender, patient.side) })
    this.props.dispatch(savePatient(patient, this.props.patientForm.inputs, this.state.groupName))
    this.props.dispatch(updateLevel(isEmpty('') ? 'measurement' : 'preview'))//TODO remove

  }

  removePatient = (patientId) => {
    console.log("Would be like are you sure?")
    this.props.dispatch(deletePatient(patientId))
  }

  addBuild = (buildData) => {
    this.setState({ buildData: buildData })
    this.props.dispatch(getForm('transradialBuild'))
  }

  //Callback for measurements form.
  measurementSubmit = (measurements) => {
    //TODO change for correct saving that includes the build
    this.props.dispatch(saveMeasurements(measurements, this.props.measurementForm.inputs, this.props.patient.id))
    this.props.dispatch(updateLevel('preview'))
  }

  render() {
    const l = this.props.level
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
          editPatient={() => this.props.dispatch(updateLevel('patient'))}
          hasPatientForm={(l === 'patient')}
          patientForm={this.props.patientForm}
          patientSubmit={this.patientSubmit}
        />
        {
          (this.props.patient.id) ?
            <PatientDevices
              className="row"
              addDeviceForm={this.props.addBuildForm}
              addDevice={()=>{}}
              viewDevice={()=>{console.log('view device')}}
              deviceCols={this.props.deviceCols}
              devices={[]}

            /> : <span/>
        }
        {/* Adjust position of this section... */}
        {(l === 'device') ?
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
