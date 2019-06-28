import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default class DateSelect extends React.Component {

  checkInput = (date) => {
    const change = {
      name: this.props.name,
      label: this.props.label,
      value: date,
      validations: this.props.validations,
      isValid: this.props.isValid
    }
    this.props.onChange(change)
  }

  render() {
    return (
      <div className={`FormBuilder-date`}>
        <label
          className={`FormBuilder-date-label ${(this.props.isValid) ? '' : 'input-error'}`}
          data-tip={this.props.instruction}
        >
          {`${this.props.label}: `}
          <span data-tip={(this.props.errors.length === 0) ? '' : this.props.errors}>
            <DatePicker
              selected={this.props.value}
              onChange={this.checkInput}
            />
          </span>
        </label>
      </div>
    )
  }


}

DateSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  isValid: PropTypes.bool,
  errors: PropTypes.array,
  validations: PropTypes.object
}