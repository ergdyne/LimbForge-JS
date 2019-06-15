import React from 'react'
import { connect } from 'react-redux'
import FormBuilder from '../components/FormBuilder'
import PatientData from '../components/PatientData'
import Download from '../components/Download'
import { patientInputs, measurementInputs } from '../testData'
import { getPatient, saveMeasurements, savePatient, updateLevel, deletePatient, clearPatient } from '../actions/patientsActions';
import isEmpty from '../functions/isEmpty'
//TODO move Inputs Lists to their own areas or add the generated server side based on DB.
//These two drive the construction of the patient and measurement forms respectively.
//Having them load from the DB (along with some funky sequel) will allow for fields to be added and removed by the admin.

@connect((store) => {
  return ({
    sessionUser: store.session.user, //matters for new patient
    patient: store.patients.patient,
    measurements: store.patients.measurements,
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
      //this.props.dispatch(updateLevel('preview'))
    }

  }

  componentWillUnmount(){
    this.props.dispatch(clearPatient())
  }
  //Callback for patient Data form.
  //TODO connect to API to do actual read/write/updates.
  patientSubmit = (patient) => {
    //API Call
    
    //This might be ok without a check?
    if(this.props.patient.id){
      patient.id = this.props.patient.id
    }

    if (!this.props.patient.amputationLevel) {
      patient.amputationLevel = `transradial`
    }
    //Temporary Hack! TODO replace with validation (require!)
    // if (!this.props.patient.gender) patient.gender = 'Male'
    // if (!this.props.patient.side) patient.side = 'Right'
    //TODO change to actual groupId instead of 1
    this.props.dispatch(savePatient(patient, patientInputs, 1))
    this.props.dispatch(updateLevel(isEmpty(this.props.measurements) ? 'measurement' : 'preview'))
  }

  removePatient = (patientId)=>{
    console.log("Would be like are you sure?")
    this.props.dispatch(deletePatient(patientId))
  }

  //Callback for measurements form.
  measurementSubmit = (measurements) => {
    this.props.dispatch(saveMeasurements(measurements))
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
                measurements={this.props.measurements}
                editPatient={() => this.props.dispatch(updateLevel('patient'))}
                editMeasurement={(l === 'preview') ? () => this.props.dispatch(updateLevel('measurement')) : false}
              /> :
              <div />
            }
            {/* Patient Form */}
            {(l === 'patient') ?
              <FormBuilder
                key='patient'
                elements={patientInputs.slice(0,9)}
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
                initial={(!isEmpty(this.props.measurements)) ? this.props.measurements : {}}
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