import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import validation from '../../functions/validation'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "gray",
      errors:[]
    }
  }

  componentWillMount(){
    if(this.props.value){this.setState({color:"black"})}
  }
  //Optional input check path (if validation on)
  //Simple version of checking values for just our cases.

  checkInput = (event) => {
    //Naive approach//TODO map against all validations
    const validations = validation(this.props.validation,event.target.value,this.props.label)
    if (validations.length === 0) {
      this.setState({ color: "green",errors:[] })
    } else {
      this.setState({ color: "red",errors:validations })
    }
    //validation callback?

    //Callback to state inside form
    this.props.onChange(event)
  }

  render() {
    // Can use className to position the prop in the future.
    return (
      <div className={`FormBuilder-text`}>
        <span data-tip={this.props.instruction}>{`${this.props.label}: `}</span>
        <input
          name={this.props.name}
          value={this.props.value}
          data-tip={(this.state.errors.length===0)?'':this.state.errors}
          className='FormBuilder-text-input'
          type='text'
          placeholder={this.props.placeholder}
          onChange={(this.props.validation)?this.checkInput:this.props.onChange}
          style={{color:this.state.color}}
        />
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
  //ok for now but changes if this all gets more complex... or moves up.
  validation: PropTypes.object
}