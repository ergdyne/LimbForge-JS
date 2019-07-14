import React from 'react'
import PropTypes from 'prop-types'

export default class TextInput extends React.Component {
  //Optional input check path (if validation on)
  //Simple version of checking values for just our cases.
  checkInput = (event) => {
    //Callback to state inside form with the parts of event we care about
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
    //CSS - initial
    // Can use className to position the prop in the future.
    return (
      <div className="FormBuilder-text-input">
        <label
          data-tip={this.props.instruction}
        >
          {`${this.props.label}: `}


          <input
            className={`${this.props.isvalid ? '' : 'invalid'}`}
            type='text'
            isvalid={this.props.isvalid}
            id={this.props.name}
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.checkInput}
            data-tip={(this.props.isvalid) ? '' : this.props.errors}
          />

        </label>
      </div>
    )  
  }
}

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  isvalid: PropTypes.bool,
  errors: PropTypes.array,
  validations: PropTypes.object
}