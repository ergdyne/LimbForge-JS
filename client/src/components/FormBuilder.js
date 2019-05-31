import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//A component that takes a list of elements and a submit function and generates a form
export default class FormBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.props.elements.map(element =>{
      var state = this.state
      state[element.accessor] = element.default
      this.setState(state)
    })
  }

  //This is the standard react way of updating state from from elements.
  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({[name]:value})
  }

  //Works with react-datepicker to allow for curried accessor and multiple dates without building multiple onChanges.
  dateChange(element) {
    return (date) => {
      this.setState({[element.accessor]:date})
    }
  }

  //TODO use standard form types
  generateFormElement = (element) => {
    switch (element.inputType) {
      case 'date': {
        return (<div key={element.accessor}>
          <span>{`${element.label}: `}</span>
          <DatePicker
            key={element.accessor}
            selected={this.state[element.accessor]}
            onChange={this.dateChange(element)}
          />
        </div>)
      }
      case 'select': {
        return (<div key={element.accessor}>
          <label>
            {`${element.label}: `}
            <select
              value={this.state[element.accessor]}
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
      case 'radio': {
        return (<div key={element.accessor}>
          {element.options.map(o => {
            return (<label key={`${element.accessor}-${o.value}`}>
              <input
                type="radio"
                value={o.value}
                name={element.accessor}
                checked={this.state[element.accessor] === o.value}
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
            className='FormBuilder-text'
            type='text'
            onChange={this.handleInputChange}
          />
        </div>)
      }
    }
  }

  render() {
    return (
      <form onSubmit={() => {
        if(this.props.preventDefault){event.preventDefault()}
        this.props.onSubmit(this.state)
      }}>
        {this.props.elements.map(x => this.generateFormElement(x))}
        <input className='FormBuilder-button' value={(this.props.submitValue)?this.props.submitValue:`Submit`} type="submit" />
      </form>
    )
  }
}


FormBuilder.propTypes = {
 onSubmit: PropTypes.func.isRequired,
 inputs: PropTypes.arrayOf(
   PropTypes.shape({
      accessor: PropTypes.string.isRequired, 
      label: PropTypes.string, 
      type: PropTypes.string.isRequired, 
      input: PropTypes.string.isRequired, 
      default:PropTypes.string, 
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string.isRequired
        })
      )
   })
 )
}
