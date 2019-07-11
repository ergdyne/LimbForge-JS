import React from 'react'
import PropTypes from 'prop-types'

export default class RadioInput extends React.Component {

  inputChange = (event) => {
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
    return (
      <div
        key={this.props.name}
        className={`FormBuilder-radio ${(this.props.isValid) ? '' : 'invalid'}`}
        data-tip={(this.props.errors.length === 0) ? '' : this.props.errors}

      >
        {this.props.options.map(o => {
          return (<label key={`${this.props.name}-${o}`}>
            <input
              type="radio"
              value={o} //TODO consider what is sent
              name={this.props.name}
              checked={this.props.value === o}
              onChange={this.inputChange}
            />
            {o}
          </label>)
        })}
      </div>
    )
  }
}

RadioInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.string
  ),
  label: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  errors: PropTypes.array,
  validations: PropTypes.object
}



