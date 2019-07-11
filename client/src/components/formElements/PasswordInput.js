import React from 'react'
import PropTypes from 'prop-types'

export default class PasswordInput extends React.Component {
  //Optional input check path (if validation on)
  //Simple version of checking values for just our cases.
  checkInput = (event) => {
    //Callback to state inside form with the parts of event we care about
    const change = {
      name: this.props.name,
      label: this.props.label,
      value: event.target.value,
      validations: this.props.validations,
      isValid: this.props.isValid
    }
    this.props.onChange(change)
  }

  render() {
    //CSS - initial
    // TODO make password confirm.
    return (
      <div className={`FormBuilder-password`}>
        <label
          data-tip={this.props.instruction}
        >
          {`${this.props.label}: `}
          <span data-tip={(this.props.errors.length === 0) ? '' : this.props.errors}>
            <input
              type='password'
              className={`${(this.props.isValid) ? '' : 'invalid'}`}
              name={this.props.name}
              value={this.props.value}
              placeholder={this.props.placeholder}
              onChange={this.checkInput}
            />
          </span>
        </label>
      </div>
    )
  }
}

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  isValid: PropTypes.bool,
  errors: PropTypes.array,
  //ok for now but changes if this all gets more complex... or moves up.
  validations: PropTypes.object,
  confirm: PropTypes.bool //Use this to create a second element that verifies both are the same
}