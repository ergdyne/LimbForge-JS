import React from 'react'
import { connect } from 'react-redux'
import FormBuilder from '../components/FormBuilder'
import PatientData from '../components/PatientData'
import Download from '../components/Download'
import { patientInputs, measurementInputs } from '../testData'
import { getPatient, saveMeasurements, savePatient, updateLevel } from '../actions/patientsActions';
import isEmpty from '../functions/isEmpty'
//TODO move Inputs Lists to their own areas or add the generated server side based on DB.
//These two drive the construction of the patient and measurement forms respectively.
//Having them load from the DB (along with some funky sequel) will allow for fields to be added and removed by the admin.

@connect((store) => {
  return ({
    sessionUser: store.session.user, //matters for new patient
    patient: store.patients.patient,
    level: store.patients.patientFormLevel
  })
})
export default class Patient extends React.Component {

  componentWillMount() {
    //API Call
    const { patientId } = this.props.match.params
    //well some more filtering than this...? Also there is a 0 index, but not a 0 patientId ;)
    const id = parseInt(patientId)
    if (patientId && !(isNaN(id))) {
      this.props.dispatch(getPatient(id))
    }

  }
  //Callback for patient Data form.
  //TODO connect to API to do actual read/write/updates.
  patientSubmit = (patient) => {
    //API Call
    //To be replaced with actual ID from saving it


    if (!this.props.patient.id) {//Huh?

      patient.id = 85
      patient.amputationLevel = `transradial`
    }
    if (!isEmpty(this.props.patient.measurements)) {
      patient.measurements = this.props.patient.measurements
    }


    //Temporary Hack! TODO replace with validation (require!)
    if (!this.props.patient.gender) patient.gender = 'Male'
    if (!this.props.patient.side) patient.side = 'Right'

    this.props.dispatch(savePatient(patient))
    this.props.dispatch(updateLevel(isEmpty(this.props.patient.measurements) ? 'measurement' : 'preview'))
  }

  //Callback for measurements form.
  measurementSubmit = (measurements) => {
    //API Call
    var newPatient = this.props.patient
    newPatient.measurements = measurements

    this.props.dispatch(saveMeasurements(newPatient))
    this.props.dispatch(updateLevel('preview'))
  }

  render() {
    const l = this.props.level
    return (
      // More convoluted divs from the current copied CSS.

      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">

          <div>
            {(l === 'preview' || l === 'measurement') ?
              <PatientData
                patient={this.props.patient}
                editPatient={() => this.props.dispatch(updateLevel('patient'))}
                editMeasurement={(l === 'preview') ? () => this.props.dispatch(updateLevel('measurement')) : false}
              /> :
              <div />
            }
            {/* Patient Form */}
            {(l === 'patient') ?
              <FormBuilder
                key='patient'
                elements={patientInputs}
                onSubmit={this.patientSubmit}
                submitValue={`Save`}
                preventDefault={true}
                initial={(this.props.patient) ? this.props.patient : {}}
              /> :
              <div />
            }
            {/* Measurement Form */}
            {(l === 'measurement') ?
              <FormBuilder
                key='measurments'
                elements={measurementInputs}
                onSubmit={this.measurementSubmit}
                submitValue={`Save`}
                preventDefault={true}
                initial={(this.props.patient.measurements) ? this.props.patient.measurements : {}}
              /> :
              <div />
            }
            {(l === 'preview') ? <Download patient={this.props.patient} /> : <div />}
          </div>
        </div></div>
      </div></div></div></div>
    )
  }
}