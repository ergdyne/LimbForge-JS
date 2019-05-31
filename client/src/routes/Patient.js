import React from 'react'
import PropTypes from 'prop-types'
import FormBuilder from '../components/FormBuilder'
import PatientData from '../components/PatientData'
import Download from '../components/Download'
import { patientInputs, measurementInputs, patients } from '../testData'


export default class Patient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: this.props.initialLevel,
      patient: this.props.initialPatient
    }
  }

  patientSubmit = (patient) => {
    //To be replaced with actual ID from saving it
    if (!this.state.patient.id) {
      patient.id = 85
      patient.amputationLevel = `transradial`
    }
    if (this.state.patient.measurements) {
      patient.measurements = this.state.patient.measurements

    }
    //return data from DB then set state
    this.setState({ patient: patient },()=>{
      if(this.state.patient.measurements){
        this.setState({ level: 'preview' })
      }else{
        this.setState({ level: 'measurement' })
      }
    })
    
  }

  measurementSubmit = (measurements) => {
    var newPatient = this.state.patient
    newPatient.measurements = measurements
    this.setState(newPatient)
    this.setState({ level: 'preview' })
  }

  level = () => {
    switch (this.state.level) {
      case 'measurement': return (
        <div>
          <PatientData
            patient={this.state.patient}
            editPatient={() => this.setState({ level: 'patient' })}
          />
          <hr />
          <FormBuilder
            key='measurments'
            elements={measurementInputs}
            onSubmit={this.measurementSubmit}
            submitValue={`Save`}
            preventDefault={true}
            initial={(this.state.patient.measurement) ? this.state.patient.measurement : {}}
          />
        </div>
      )
      case 'preview': return (
        <div>
          <PatientData
            patient={this.state.patient}
            editPatient={() => this.setState({ level: 'patient' })}
            editMeasurement={() => this.setState({ level: 'measurement' })}
          />
          <hr />
          <Download
            patient={this.state.patient}
          />
        </div>
      )
      default: return (
        <FormBuilder
          key='patient'
          elements={patientInputs}
          onSubmit={this.patientSubmit}
          submitValue={`Save`}
          preventDefault={true}
          initial={(this.state.patient) ? this.state.patient : {}}
        />
      )
    }
  }

  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          {(this.props.back) ? <button onClick={() => this.props.back()}>{`Back`}</button> : <div />}
          {this.level()}
        </div></div>
      </div></div></div></div>
    )
  }
}

Patient.propTypes = {
  initialPatient: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    dateOfAmputation: PropTypes.instanceOf(Date),
    city: PropTypes.string,
    country: PropTypes.string,
    gender: PropTypes.string,
    side: PropTypes.string,
    amputationLevel: PropTypes.string,
    amputationCause: PropTypes.string,
    measurements: PropTypes.object,
  }),
  initialLevel: PropTypes.string,
  back: PropTypes.func
}

Patient.defaultProps = {
  initialLevel: 'patient',
  initialPatient:{}
}