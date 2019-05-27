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

  
  handleFormSubmit =  (event)=>{
    console.log('submit')
    console.log(this.state.patient)
    event.preventDefault()
  }

  handleInputChange =(event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.updatePatient(name,value)
  }

  updatePatient = (accessor,value)=>{
    var newPatient = this.state.patient
    newPatient[accessor] = value
    this.setState({patient: newPatient})
  }

  dateChange(element){
    return (date) =>{
      this.updatePatient(element.accessor,date)
    }
  }

  generateFormElement = (element)=>{
    switch (element.input) {
      case 'date': {
        return(<div key={element.accessor}>
        <span>{`${element.header}: `}</span>
        <DatePicker 
          key={element.accessor}
          selected={this.state.patient[element.accessor]}
          onChange={this.dateChange(element)}
        />
      </div>)}
      default: return(<div key={element.accessor}>
        <span>{`${element.header}: `}</span>
        <input 
          key={element.accessor}
          name={element.accessor}
          className='NewPatient-text' 
          type='text' 
          onChange={this.handleInputChange}
          />
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