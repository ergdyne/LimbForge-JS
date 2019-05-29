import React from 'react'
import { patientInputs, measurementInputs } from '../testData'
import FormBuilder from '../components/FormBuilder'
import Patient from '../components/Patient'
import Downloader from '../components/Downloader';


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
    console.log('adding mints')
    var newPatient = this.state.patient
    newPatient.measurements = measurements
    this.setState(newPatient)
    this.setState({ level: 'preview' })
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
          />
        </div>
      )
      case 'preview': return (
        <div>
          <Patient
            patient={this.state.patient}
          />
          <div>{`OK this preivew this stuff and get a THREE loaded`}</div>
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
          <Downloader/>
        </div></div>
      </div></div></div></div>
    )
  }
}