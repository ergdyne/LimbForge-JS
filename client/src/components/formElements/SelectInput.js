import React from 'react'
import PropTypes from 'prop-types'

export default class SelectInput extends React.Component {
  //A copied function, so this probably means it can be reused.
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
    return (<div key={this.props.name}>
      <label
        className={`FormBuilder-select-label ${(this.props.isValid) ? '' : 'input-error'}`}
        data-tip={this.props.instruction}
      >
        {`${this.props.label}: `}
        <span data-tip={(this.props.errors.length === 0) ? '' : this.props.errors}>
          <select
            value={this.props.value}
            name={this.props.name}
            onChange={this.checkInput}
          >
            {/* React does not like this line of code, but it seems to be the only way to get the desired functionality. */}
            {/* TODO the solution migth be to set the value as '' which should trigger this */}
            {(this.props.placeholder && !this.props.value) ? <option value='' disabled selected>{this.props.placeholder}</option> : ''}
            {this.props.options.map(o => {
              return (
                <option
                  value={o}
                  key={`${this.props.name}-${o}`}
                >
                  {o}
                </option>)
            })}
          </select>
        </span>
      </label>
    </div>
    )
  }
}


SelectInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.string
  ),
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  isValid: PropTypes.bool,
  errors: PropTypes.array,
  validations: PropTypes.object
}