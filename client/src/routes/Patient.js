import React from 'react'
import { connect } from 'react-redux'
import FormBuilder from '../components/FormBuilder'
import PatientData from '../components/PatientData'
import Download from '../components/Download'
import { getPatient, saveMeasurements, savePatient, updateLevel, deletePatient, clearPatient } from '../actions/patientsActions'
import { getForm } from '../actions/displayActions'
import isEmpty from '../functions/isEmpty'
import { getGroupOptions, getMeasures } from '../actions/displayActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user, //matters for new patient
    patient: store.patients.patient,
    measurements: store.patients.measurements,
    level: store.patients.patientFormLevel,
    optionStore: store.display.optionStore,
    groupForm: store.display.selectGroup,
    patientForm: store.display.patientForm,
    measurementForm: store.display.measurementForm
  })
})
export default class Patient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupName: null,
      measuresSRC: null,
      fetchedGroups: false
    }
  }

  componentWillMount() {
    this.props.dispatch(getForm('patientData'))
    this.props.dispatch(getForm('selectGroup'))
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
    if (this.props.optionStore.groupOptions.length === 1 && this.state.groupName == null && this.state.fetchedGroups) {
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
    this.props.dispatch(updateLevel(isEmpty(this.props.measurements) ? 'measurement' : 'preview'))

  }

  removePatient = (patientId) => {
    console.log("Would be like are you sure?")
    this.props.dispatch(deletePatient(patientId))
  }

  //Callback for measurements form.
  measurementSubmit = (measurements) => {
    //TODO change for correct saving that includes the build
    this.props.dispatch(saveMeasurements(measurements, this.props.measurementForm.inputs, this.props.patient.id))
    this.props.dispatch(updateLevel('preview'))
  }

  //map side and gender to image used
  imageLocation = (gender, side) => {
    return `https://limbfore-js-assets.s3.amazonaws.com/${gender.toLowerCase()}-transradial-${side.charAt(0).toUpperCase()}.svg`
  }

  render() {
    const l = this.props.level

    //TODO adjust location. This can be pulled when the user logs in. See multiple reducers in action from tutorial.
    return (
      //if new patient and group options exist, give a dropdown.
      //If no option or exising patient display group Name
      //CSS - Initial
      <div className="container">
        {
          <div>
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

            {/* Measurement Form */}
            {(l === 'measurement') ?
              <div className="row">
                <FormBuilder
                  title={this.props.measurementForm.name}
                  key={this.props.measurementForm.accessor}
                  accessor={this.props.measurementForm.accessor}
                  className="card large col-sm"
                  elements={this.props.measurementForm.inputs}
                  onSubmit={this.measurementSubmit}
                  submitValue={this.props.measurementForm.button}
                  preventDefault={true}
                  initial={(!isEmpty(this.props.measurements)) ? this.props.measurements : {}}
                />
                <img
                  className="card large col-sm"
                  max-height="500"
                  src={(this.state.measuresSRC) ? this.state.measuresSRC : this.imageLocation(this.props.patient.gender, this.props.patient.side)}
                />
              </div> :
              <span />
            }
            {(l === 'preview') ?
              <div className="row">
                <Download
                  className="card large"
                  patient={this.props.patient}
                  measurements={this.props.measurements}
                />
              </div> : <span />}
          </div>}
      </div>
    )
  }
}