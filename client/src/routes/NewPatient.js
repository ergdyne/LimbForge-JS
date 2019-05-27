import React from 'react'
import { patientInputs, measurementInputs } from '../testData'
import FormBuilder from '../components/FormBuilder'
import Patient from '../components/Patient'


export default class NewPatient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 'patient'
    }
  }

  patientSubmit = (patient) => {
    console.log('submit called back')
    console.log(patient)
    patient.id = 85
    patient.amputationLevel = `transradial`
    this.setState({ patient: patient })
    this.setState({ level: 'measurement' })
  }

  measurementSubmit = (measurements) => {
    console.log(measurements)
  }

  level = () => {
    switch (this.state.level) {
      case 'measurement': return (
        <div><Patient
          patient={this.state.patient}
        />
          <FormBuilder
            key='measurments'
            elements={measurementInputs}
            onSubmit={this.measurementSubmit}
            submitValue={`Add`}
            preventDefault={true}
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