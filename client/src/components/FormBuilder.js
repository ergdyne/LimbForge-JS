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

  setInitialState = () => {
    //Mapping each form element to the state adding defaults where required.
    var newState = { ...this.state }

    this.props.elements.map(element => {
      var item = {}
      //Default to isvalid, until user attempts to submit.
      item.isvalid = true
      item.errors = []

      //There are a few different ways and item can get an initial value
      if (this.props.initial && this.props.initial[element.accessor]) {
        //Value was fed into the component.
        item.value = this.props.initial[element.accessor]
      } else {
        if (element.default || ['radio', 'select'].includes(element.inputType)) {
          if (['radio', 'select'].includes(element.inputType)) {
            //The source of the options maybe fed seperately or as part of the element.
            const options = (element.optionStore) ? this.props.optionStore[element.optionStore] : element.options
            if (options.length === 1) {
              //A radio or select with only one option. This will also not display.
              item.value = options[0]
            } else {
              //At least one option (if no options then blank)/
              item.value = (options.length > 0) ? options[0] : ''
            }
          } else {
            //The item has a default and is not 'radio' or 'select/'
            item.value = element.default
          }
        } else {
          //Default is for an item to have no starting value.
          item.value = ''
        }
      }
      newState[element.accessor] = item

    })
    this.setState(newState)
  }
  
  onCancel = () => {
      this.setInitialState()
      this.props.onCancel()
  }

  componentWillMount() {
    this.setInitialState()
  }

  handleInputChange = (change) => {
    //Change is an altered version of event. Exicutes with each change to an input field.
    const { value, name, label, validations, isvalid } = change

    //Calculate list of errors for display on this input. Empty if no validations.
    const errors = (validations) ? validation(validations, value, label) : []

    //If currently false, can change to true. Otherwise, leave it true as change to false only happens at submit.
    const newisvalid = (isvalid) ? isvalid : (errors.length === 0)
    const item = {
      value: value,
      isvalid: newisvalid,
      errors: errors
    }
    //Any change to input allows the user to try to click submit again.
    this.setState({ [name]: item, submitError: '' })
  }

  checkErrors = () => {
    //On attempt to submit, recheck validations
    var allErrors = []
    this.props.elements.filter(e => e.validation).forEach(e => {
      var item = this.state[e.accessor]
      const value = (item.value) ? item.value : ''

      const errors = validation(e.validation, value, e.name)

      //Update individual items that have errors.
      //TODO may be redundent.
      if (errors.length > 0) {
        item.isvalid = false,
          item.errors = errors
        this.setState({ [e.accessor]: item })
        errors.forEach(err => allErrors.push(err))
      }
    })

    return allErrors
  }

  //Map structured list to form elements.
  generateFormElement = (element) => {
    switch (element.inputType) {
      case 'date': {
        return (
          <DateSelect
            key={`${this.props.accessor}-${element.accessor}`}
            onChange={this.handleInputChange}
            name={element.accessor}
            value={this.state[element.accessor].value}
            label={element.name}
            instruction={element.instruction}
            isvalid={this.state[element.accessor].isvalid}
            errors={this.state[element.accessor].errors}
            validations={element.validation}
          />
        )
      }
      case 'select': {
        const ops = (element.optionStore) ? this.props.optionStore[element.optionStore] : element.options
        return (
          (ops.length === 1) ?
            <input
              key={`${this.props.accessor}-${element.accessor}`}
              name={element.accessor}
              value={ops[0]}
              style={{ display: "none" }}
            /> :

            <SelectInput
              key={`${this.props.accessor}-${element.accessor}`}
              onChange={this.handleInputChange}
              name={element.accessor}
              value={this.state[element.accessor].value}
              options={ops}
              placeholder={element.placeholder}
              label={element.name}
              instruction={element.instruction}
              isvalid={this.state[element.accessor].isvalid}
              errors={this.state[element.accessor].errors}
              validations={element.validation}
            />
        )
      }
      case 'radio': {
        return (
          <RadioInput
            key={`${this.props.accessor}-${element.accessor}`}
            onChange={this.handleInputChange}
            name={element.accessor}
            value={this.state[element.accessor].value}
            options={(element.optionStore) ? this.props.optionStore[element.optionStore] : element.options}
            label={element.name}
            isvalid={this.state[element.accessor].isvalid}
            errors={this.state[element.accessor].errors}
            validations={element.validation}
          />
        )
      }
      case 'password': {
        return (
          <PasswordInput
            key={`${this.props.accessor}-${element.accessor}`}
            onChange={this.handleInputChange}
            name={element.accessor}
            value={this.state[element.accessor].value}
            label={element.name}
            isvalid={this.state[element.accessor].isvalid}
            errors={this.state[element.accessor].errors}
            validations={element.validation}
          />
        )
      }
      default: {
        return (
          <TextInput
            key={`${this.props.accessor}-${element.accessor}`}
            name={element.accessor}
            instruction={element.instruction}
            label={element.name}
            isvalid={this.state[element.accessor].isvalid}
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
    return (
      <form key={this.props.accessor}
        onSubmit={() => {
          //Default is to reload the page, which is not ideal in single page application.
          if (this.props.preventDefault) { event.preventDefault() }

          //Running checkErrors updates the state to include any error notifications.
          if (this.checkErrors().length === 0) {
            //Create a copy of form data to avoid mutation.
            const data = { ...this.state }

            //Clear the form and the state
            if (this.props.clearOnSubmit) { this.setInitialState() }

            //Each item with a value, map to just the value.
            var formData = {}
            this.props.elements.filter(e => data[e.accessor].value)
              .forEach(e => {
                if (e.inputType === 'password') {
                  const v = data[e.accessor].value
                  formData[e.accessor] = (typeof v === 'string') ? v : v.first
                } else {
                  formData[e.accessor] = data[e.accessor].value
                }
              })

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
            value={(this.props.buttonLabel) ? this.props.buttonLabel : `Submit`}
            type="submit"
            data-tip={this.state.submitError}
          />
          {(this.props.onCancel) ?
            <button type="button" onClick={this.onCancel}>Cancel</button>:<span/>
          }
        </fieldset>
        <ReactTooltip />
      </form>
    )
  }
}

FormBuilder.propTypes = {
  accessor: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  buttonLabel: PropTypes.string,
  optionStore: PropTypes.object,
  preventDefault: PropTypes.bool,
  clearOnSubmit: PropTypes.bool,
  elements: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  initial: PropTypes.object,
  title: PropTypes.string
}

