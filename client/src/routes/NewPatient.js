import React from 'react'
import FormBuilder from '../components/FormBuilder'
import Patient from '../components/Patient'
import Download from '../components/Download'
import { patientInputs, measurementInputs, patients } from '../testData'


export default class NewPatient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 'patient'
    }
  }

  patientSubmit = (patient) => {
    patient.id = 85
    patient.amputationLevel = `transradial`
    if(this.state.patient){
      if(this.state.patient.measurements){
        patient.measurements = this.state.patient.measurements
      }
    }
    this.setState({ patient: patient })
    this.setState({ level: 'measurement' })

  }

  measurementSubmit = (measurements) => {
    var newPatient = this.state.patient
    newPatient.measurements = measurements
    this.setState(newPatient)
    this.setState({ level: 'preview' })
    console.log(this.state)
  }

  level = () => {
    switch (this.state.level) {
      case 'measurement': return (
        <div>
          <Patient
            patient={this.state.patient}
          />
          <hr />
          <FormBuilder
            key='measurments'
            elements={measurementInputs}
            onSubmit={this.measurementSubmit}
            submitValue={`Add`}
            preventDefault={true}
            initial={patients[0].measurements}
          />
        </div>
      )
      case 'preview': return (
        <div>
          <Patient
            patient={this.state.patient}
          />
          <hr/>
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
          initial={patients[0]}
        />
      )
    }
  }

  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          {this.level()}
        </div></div>
      </div></div></div></div>
    )
  }
}

//No props yet, will come with user login.