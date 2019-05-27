import React from 'react'
import DatePicker from "react-datepicker"
import { patientInputs } from '../testData'
import "react-datepicker/dist/react-datepicker.css"
import FormBuilder from '../components/FormBuilder';

export default class NewPatient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: {
        id: null,
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        dateOfAmputation: new Date(),
        city: '',
        country: '',
        gender: '',
        amputationLevel: '',
        amputationCause: '',
        measurements: [],
      }
    }
  }

  handleFormSubmit = (event) => {
    console.log('submit called back')
    event.preventDefault()
  }
  
  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <FormBuilder
            key={'patient'}
            inputs={patientInputs}
            onSubmit={this.handleFormSubmit}
          />
        </div></div>
      </div></div></div></div>
    )
  }
}