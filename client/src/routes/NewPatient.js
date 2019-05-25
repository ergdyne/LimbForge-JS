import React from 'react'
import DatePicker from "react-datepicker"
import { patientInputs } from '../testData'
import "react-datepicker/dist/react-datepicker.css"

export default class NewPatient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: {
        id: null,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        dateOfAmpputation: '',
        city: '',
        country: '',
        gender: '',
        amputationLevel: '',
        amputationCause: '',
        measurements: [],
      }
    }
  }

  
  handleFormSubmit =  (event)=>{
    console.log('submit')
    event.preventDefault()
  }

  generateFormElement = (element)=>{
    switch (element.input) {
      case 'date': {
        return(<div>
        <span>{`${element.header}: `}</span>
        <DatePicker 
          key={element.accessor}
          selected={new Date()}
          onChange={(x)=>{
            this.setState({[element.accessor]:x})
          }}
        />
      </div>)}
      default: return(<div>
        <span>{`${element.header}: `}</span><input className='NewPatient-text' type='text' id={element.accessor}/>
      </div>)
    }
  }

  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <form onSubmit={this.handleFormSubmit}>
            {patientInputs.map(x => this.generateFormElement(x))}
            <input className='NewPatient-button' value="Submit" type="submit"/>
          </form>
        </div></div>
      </div></div></div></div>
    )
  }
}