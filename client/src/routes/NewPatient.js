import React from 'react'
import DatePicker from "react-datepicker"
import { patientInputs } from '../testData'
import "react-datepicker/dist/react-datepicker.css"
import FormBuilder from '../components/FormBuilder';

export default class NewPatient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleFormSubmit = (patient) => {
    console.log('submit called back')
    console.log(patient)
  }
  
  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <FormBuilder
            key={'patient'}
            elements={patientInputs}
            onSubmit={this.handleFormSubmit}
            submitValue={`Save`}
            preventDefault={true}
          />
        </div></div>
      </div></div></div></div>
    )
  }
}