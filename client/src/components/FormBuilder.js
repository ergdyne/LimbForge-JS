import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import DateSelect from './formElements/DateSelect'
import PasswordInput from './formElements/PasswordInput'
import RadioInput from './formElements/RadioInput'
import SelectInput from './formElements/SelectInput'
import TextInput from './formElements/TextInput'
import validation from '../functions/validation'

//A component that takes a list of elements and a submit function and generates a form.
//SOME NOTES//
///To lessen my confusion, I increased the potential for others to be confused.
////At the Data level:
////What is usually event is change (as I am adding things).
////What is typically name in a form element, I call an accessor (as it is used for access and this is consistant with the table builder).
////Name is now used as a label.
////At the Form element level, name and label are used.
//********************//
// in Form - in Data  //
//   name  - accessor //
//   label -  name    //
//********************//

//TODO add css tags that can be used to wire formating.
export default class FormBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitError: ''
    }
  }

  //TODO prevent submit if not valid.

  //Clear the state as a hack to deal with not letting the page refresh... TODO fix refresh
  clearState = () => {
    //Naive approach. Clears rather than using initial or default.
    //Doesn't seem to actually work
    this.props.elements.map(element => {
      this.setState({ [element.accessor]: '' })
    })
  }

  componentWillMount() {
    //Mapping each form element to the state adding defaults where required.
    this.props.elements.map(element => {
      var state = this.state
      var item = {}
      //Let's start with true and remap on submit error
      item.isValid = true
      item.errors = []

      if (this.props.initial && this.props.initial[element.accessor]) {
        item.value = this.props.initial[element.accessor]
      } else {
        if (element.default) {
          item.value = element.default
        }
      }
      //May be able to get away without this
      state[element.accessor] = item
      this.setState(state)
    })
  }


  handleInputChange = (change) => {
    //All Input fields must return this information on change to use this method
    const { value, name, label, validations, isValid } = change
    const errors = (validations) ? validation(validations, value, label) : []
    //If currently false, can change to true. Otherwise, leave it true as change to false only happens at submit.
    const newIsValid = (isValid) ? isValid : (errors.length === 0)
    const item = {
      value: value,
      isValid: newIsValid,
      errors: errors
    }
    this.setState({ [name]: item, submitError: '' })
  }

  generateFormElement = (element) => {
    switch (element.inputType) {
      //TODO move date into it's own component. Works fine now as it is small
      case 'date': {
        return (
          <DateSelect
            key={element.accessor}
            onChange={this.handleInputChange}
            name={element.accessor}
            value={this.state[element.accessor].value}
            label={element.name}
            instruction={element.instruction}
            isValid={this.state[element.accessor].isValid}
            errors={this.state[element.accessor].errors}
            validations={element.validation}
          />
        )
      }
      case 'select': {
        return (
          <SelectInput
            key={element.accessor}
            onChange={this.handleInputChange}
            name={element.accessor}
            value={this.state[element.accessor].value}
            options={element.options}
            placeholder={element.placeholder}
            label={element.name}
            instruction={element.instruction}
            isValid={this.state[element.accessor].isValid}
            errors={this.state[element.accessor].errors}
            validations={element.validation}
          />
        )
      }
      case 'radio': {
        return (
          <RadioInput
            key={element.accessor}
            onChange={this.handleInputChange}
            name={element.accessor}
            value={this.state[element.accessor].value}
            options={element.options}
            label={element.name}
            isValid={this.state[element.accessor].isValid}
            errors={this.state[element.accessor].errors}
            validations={element.validation}
          />
        )
      }
      case 'password': {
        return (
          <PasswordInput
            key={element.accessor}
            onChange={this.handleInputChange}
            name={element.accessor}
            value={this.state[element.accessor].value}
            label={element.name}
            isValid={this.state[element.accessor].isValid}
            errors={this.state[element.accessor].errors}
            validations={element.validation}
          />
        )
      }
      default: {
        return (
          <TextInput
            key={element.accessor}
            name={element.accessor} //In form elements name is the accessor; in our datatypes name is the label
            instruction={element.instruction}
            label={element.name}
            isValid={this.state[element.accessor].isValid}
            errors={this.state[element.accessor].errors}
            value={this.state[element.accessor].value}
            className='FormBuilder-text'
            placeholder={(element.placeholder) ? element.placeholder : ""}
            onChange={this.handleInputChange}
            validations={element.validation}
          />)
      }
    }
  }

  render() {
    //CSS - fix error coloring.
    return (
      <form onSubmit={() => {
        //TODO move submit to function
        //preventDefault stops page reload.
        if (this.props.preventDefault) { event.preventDefault() }
        //Sending the whole state back with the onSubmit.
        const data = this.state
        //Filter to those items with validation and check for errors       
        var allErrors = []

        this.props.elements.filter(e => e.validation).forEach(e => {
          var item = this.state[e.accessor]
          const value = (item.value) ? item.value : ''

          //Double check as required elements that have not been checked, do not have errors.
          const errors = validation(e.validation, value, e.name)
          //If errors we need to push them to the state and the overall list
          if (errors.length > 0) {
            item.isValid = false,
              item.errors = errors
            this.setState({ [e.accessor]: item })
            errors.forEach(err => allErrors.push(err))
          }
        })

        if (allErrors.length === 0) {
          //Clear the form and the state
          if (this.props.clearOnSubmit) { this.clearState() }

          //Each item with a value map to just the value
          var formData = {}
          this.props.elements.filter(e => data[e.accessor].value)
            .forEach(e => formData[e.accessor] = data[e.accessor].value)
          this.props.onSubmit(formData)
        } else {
          this.setState({ submitError: 'Oh no! Some data is not right. Please fix input errors in red.' })
        }
      }}>
        <fieldset>
          {(this.props.title) ? <legend>{this.props.title}</legend> : <span />}
          {this.props.elements.map(x => this.generateFormElement(x))}
          <input
            className='FormBuilder-button'
            value={(this.props.submitValue) ? this.props.submitValue : `Submit`}
            type="submit"
            data-tip={this.state.submitError}
          />
        </fieldset>
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
  initial: PropTypes.object,
  title: PropTypes.string
}

