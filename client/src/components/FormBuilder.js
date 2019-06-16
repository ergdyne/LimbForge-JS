import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TextInput from './formElements/TextInput'

//A component that takes a list of elements and a submit function and generates a form.
//TODO add validation. Two layers: in line and submit on/off.
//TODO add css tags that can be used to wire formating.
export default class FormBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //TODO prevent submit if not valid.

  clearState = () => {
    this.props.elements.map(element => {
      this.setState({ [element.accessor]: '' })
    })
  }

  componentWillMount() {
    this.props.elements.map(element => {
      var state = this.state
      if (this.props.initial && this.props.initial[element.accessor]) {
        state[element.accessor] = this.props.initial[element.accessor]
      }

      this.setState(state)
    })
  }

  //This is the standard react way of updating state from form elements.
  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  //Works with react-datepicker to allow for curried accessor and multiple dates without building multiple onChanges.
  dateChange(element) {
    return (date) => {
      this.setState({ [element.accessor]: date })
    }
  }

  //TODO use standard form types.
  //Every case should be a single ReactComponent.
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
                    value={o}
                    key={`${element.accessor}-${o}`}
                  >
                    {o}
                  </option>)
              })}
            </select>
          </label>
        </div>)
      }
      case 'radio': {
        return (<div key={element.accessor}>
          {element.options.map(o => {
            return (<label key={`${element.accessor}-${o}`}>
              <input
                type="radio"
                value={o}
                name={element.accessor}
                checked={this.state[element.accessor] === o}
                onChange={this.handleInputChange}
              />
              {o}
            </label>)
          })}
        </div>)
      }
      case 'password': {
        return (
          <div key={element.accessor}>
            <span data-tip={element.instruction}>{`${element.label}: `}</span>
            <input
              name={element.accessor}
              value={this.state[element.accessor]}
              className='FormBuilder-password'
              type='password'
              onChange={this.handleInputChange}
            />
          </div>
        )
      }
      default: {
        return (<div key={element.accessor}>
          <span data-tip={element.instruction}>{`${element.label}: `}</span>
          <TextInput
            key={element.accessor}
            name={element.accessor}
            value={this.state[element.accessor]}
            className='FormBuilder-text'
            placeholder={(element.placeholder) ? element.placeholder : ""}
            onChange={this.handleInputChange}
            validation={element.validation}
          />
        </div>)
      }
    }
  }

  render() {
    return (
      <form onSubmit={() => {
        //preventDefault stops page reload.
        if (this.props.preventDefault) { event.preventDefault() }
        //Sending the whole state back with the onSubmit.
        const data = this.state
        //Clear the form and the state
        if (this.props.clearOnSubmit) { this.clearState() }

        this.props.onSubmit(data)
      }}>
        {this.props.elements.map(x => this.generateFormElement(x))}
        <input className='FormBuilder-button' value={(this.props.submitValue) ? this.props.submitValue : `Submit`} type="submit" />
        <ReactTooltip />
      </form>
    )
  }
}


FormBuilder.propTypes = {
  //onSubmit() callback should take the form's state back with it.
  onSubmit: PropTypes.func.isRequired,
  submitValue: PropTypes.string.isRequired,
  preventDefault: PropTypes.bool,
  clearOnSubmit: PropTypes.bool,
  elements: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  initial: PropTypes.object
}

