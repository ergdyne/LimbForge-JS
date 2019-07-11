import React from 'react'
import { connect } from 'react-redux'
import FormBuilder from '../components/FormBuilder'
import PatientData from '../components/PatientData'
import Download from '../components/Download'
import { getPatient, saveMeasurements, savePatient, updateLevel, deletePatient, clearPatient } from '../actions/patientsActions';
import isEmpty from '../functions/isEmpty'
import { getGroupOptions } from '../actions/usersActions'
import { getMeasures } from '../actions/displayActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user, //matters for new patient
    patient: store.patients.patient,
    measurements: store.patients.measurements,
    level: store.patients.patientFormLevel,
    groupOptions: store.users.groupOptions,
    patientInputs: store.display.patientInputs,
    measurementInputs: store.display.measurementInputs
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
    this.props.dispatch(getMeasures('nothing'))
  }

  componentWillUnmount() {
    this.props.dispatch(clearPatient())
  }

  componentDidUpdate() {
    //Two ways that the groupName can get set automatically
    //New patient for a user with one group
    if (this.props.groupOptions.length === 1 && this.state.groupName == null) {
      this.setState({ groupName: this.props.groupOptions[0] })
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
      this.setState({ groupName: this.props.groupOptions[0] })
    }
  }
  //Callback for patient Data form.
  patientSubmit = (patient) => {
    //This might be ok without a check?
    if (this.props.patient.id) {
      patient.id = this.props.patient.id
    }

    if (!this.props.patient.amputationLevel) {
      patient.amputationLevel = `transradial`
    }

    this.props.dispatch(savePatient(patient, this.props.patientInputs, this.state.groupName))
    this.props.dispatch(updateLevel(isEmpty(this.props.measurements) ? 'measurement' : 'preview'))
  }

  removePatient = (patientId) => {
    console.log("Would be like are you sure?")
    this.props.dispatch(deletePatient(patientId))
  }

  //Callback for measurements form.
  measurementSubmit = (measurements) => {
    this.props.dispatch(saveMeasurements(measurements, this.props.measurementInputs, this.props.patient.id))
    this.props.dispatch(updateLevel('preview'))
  }

  //map side and gender to image used
  imageLocation = (gender, side) =>{
    return `https://limbfore-js-assets.s3.amazonaws.com/${gender.toLowerCase()}-transradial-${side.charAt(0).toUpperCase()}.svg`
  }

  render() {
    const l = this.props.level
    //TODO adjust location. This can be pulled when the user logs in. See multiple reducers in action from tutorial.
    const groupInputs = [{ accessor: `group`, name: `Select a Group for the Patient`, type: `string`, inputType: `select`, placeholder: 'Select Group', options: this.props.groupOptions }]
    return (
      //if new patient and group options exist, give a dropdown.
      //If no option or exising patient display group Name
      //CSS - Initial
      <div className="container">
        {((!this.props.patient.id) && this.state.groupName == null && this.props.groupOptions.length > 1) ?
          <div className="row">
            <FormBuilder
              className="card large"
              key='groupSelection'
              elements={groupInputs}
              onSubmit={this.groupSubmit}
              submitValue={`Use Group`}
              preventDefault={true}
              initial={(!isEmpty(this.props.measurements)) ? this.props.measurements : {}}
            />
          </div> :
          <div>
            {(l === 'preview' || l === 'measurement') ?
              <PatientData
                className="row"
                patient={this.props.patient}
                measurementInputs={this.props.measurementInputs}
                measurements={this.props.measurements}
                editPatient={() => this.props.dispatch(updateLevel('patient'))}
                editMeasurement={(l === 'preview') ? () => this.props.dispatch(updateLevel('measurement')) : false}
              /> :
              <span />
            }
            {/* Patient Form */}
            {(l === 'patient') ?
              // TODO - inputs should not be sliced this way.
              <div className="row">
                <FormBuilder
                  title="Patient Data"
                  key='patient'
                  className="card large"
                  elements={this.props.patientInputs.slice(0, this.props.patientInputs.length - 1)}
                  onSubmit={this.patientSubmit}
                  submitValue={`Save`}
                  preventDefault={true}
                  initial={(this.props.patient) ? this.props.patient : {}}
                />
              </div> :
              <span />
            }
            {/* Measurement Form */}
            {(l === 'measurement') ?
              <div className="row">
                <FormBuilder
                  title="Measurements"
                  key='measurments'
                  className="card large col-sm"
                  elements={this.props.measurementInputs}
                  onSubmit={this.measurementSubmit}
                  submitValue={`Save`}
                  preventDefault={true}
                  initial={(!isEmpty(this.props.measurements)) ? this.props.measurements : {}}
                />
                <img 
                  className="card large col-sm"
                  max-height="500"
                  src={this.imageLocation(this.props.patient.gender,this.props.patient.side)}
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