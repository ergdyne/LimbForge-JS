import React from 'react'
import PropTypes from 'prop-types'

export default class SelectInput extends React.Component {
  //Adjust default event to work with FormBuilder.
  checkInput = (event) => {
    const change = {
      name: this.props.name,
      label: this.props.label,
      value: event.target.value,
      validations: this.props.validations,
      isvalid: this.props.isvalid
    }
    this.props.onChange(change)
  }

  render() {
    return (
      <div
        className={`FormBuilder-select ${(this.props.isvalid) ? '' : 'invalid'}`}
        key={this.props.name}>
        <label data-tip={this.props.instruction}>
          {`${this.props.label}: `}
          <span
            data-tip={(this.props.isvalid) ? '' : this.props.errors}
          >
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
  isvalid: PropTypes.bool,
  errors: PropTypes.array,
  validations: PropTypes.object
}