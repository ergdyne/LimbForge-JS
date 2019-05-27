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

  handleFormSubmit = (event) => {
    console.log('submit')
    console.log(this.state.patient)
    event.preventDefault()
  }

  //This is the standard react way of updating state from from elements.
  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.updatePatient(name, value)
  }

  //State setter to deal with patient being a sub-object and setState not updating sub-objects in a verbose way.
  updatePatient = (accessor, value) => {
    var newPatient = this.state.patient
    newPatient[accessor] = value
    this.setState({ patient: newPatient })
  }

  //Works with react-datepicker to allow for curried accessor and multiple dates without building multiple onChanges.
  dateChange(element) {
    return (date) => {
      this.updatePatient(element.accessor, date)
    }
  }



  //TODO all the form stuff will become one component with its own internal state and a single function to get updates.
  generateFormElement = (element) => {
    console.log(element.input)
    switch (element.input) {
      case 'date': {
        return (<div key={element.accessor}>
          <span>{`${element.label}: `}</span>
          <DatePicker
            key={element.accessor}
            selected={this.state.patient[element.accessor]}
            onChange={this.dateChange(element)}
          />
        </div>)
      }
      case 'select': {
        return (<div key={element.accessor}>
          <label>
            {`${element.label}: `}
            <select
              value={this.state.patient[element.accessor]}
              name={element.accessor}
              onChange={this.handleInputChange}>
              {element.options.map(o => {
                return (
                  <option
                    value={o.value}
                    key={`${element.accessor}-${o.value}`}
                  >
                    {o.label}
                  </option>)
              })}
            </select>
          </label>
        </div>)
      }
      case 'radio':{
        return(<div key={element.accessor}>
          {element.options.map(o=>{
            return(<label key={`${element.accessor}-${o.value}`}>
              <input
                type="radio"
                value={o.value}
                name={element.accessor}
                checked={this.state.patient[element.accessor] === o.value}
                onChange={this.handleInputChange}
              />
              {o.label}
            </label>)
          })}
        </div>)
      }
      default: {
        return (<div key={element.accessor}>
          <span>{`${element.label}: `}</span>
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
  }

  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <form onSubmit={this.handleFormSubmit}>
            {patientInputs.map(x => this.generateFormElement(x))}
            <input className='NewPatient-button' value="Submit" type="submit" />
          </form>
        </div></div>
      </div></div></div></div>
    )
  }
}