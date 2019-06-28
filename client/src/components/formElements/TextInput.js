import React from 'react'
import PropTypes from 'prop-types'

export default class TextInput extends React.Component {
  componentWillMount(){
    if(this.props.value){this.setState({color:"black"})}
  }
  //Optional input check path (if validation on)
  //Simple version of checking values for just our cases.

  checkInput = (event) => {
    //Callback to state inside form with the parts of event we care about
    const change = {
      name:this.props.name,
      label:this.props.label,
      value:event.target.value,
      validations:this.props.validations,
      isValid:this.props.isValid
    }
    this.props.onChange(change)
  }

  render() {
    // Can use className to position the prop in the future.
    return (
      <div className={`FormBuilder-text ${(this.props.isValid)?'':'input-error'}`}>
        <span data-tip={this.props.instruction}>{`${this.props.label}: `}</span>
        <span data-tip={(this.props.errors.length===0)?'':this.props.errors}><input
          name={this.props.name}
          value={this.props.value}
          
          className='FormBuilder-text-input'
          type='text'
          placeholder={this.props.placeholder}
          onChange={this.checkInput}
        /></span>
      </div>
    )
  }
}

TextInput.propTypes={
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  isValid:PropTypes.bool,
  errors:PropTypes.array,
  //ok for now but changes if this all gets more complex... or moves up.
  validations: PropTypes.object
}