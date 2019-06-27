import React from 'react'
import PropTypes from 'prop-types'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "gray"
    }
  }

  componentWillMount(){
    if(this.props.value){this.setState({color:"black"})}
  }
  //Optional input check path (if validation on)
  //Simple version of checking values for just our case.
  checkInput = (event) => {
    if (event.target.value <= this.props.validation.max && event.target.value >= this.props.validation.min) {
      this.setState({ color: "green" })
    } else {
      this.setState({ color: "red" })
    }

    //Callback to state inside form
    this.props.onChange(event)
  }

  render() {
    // Can use className to position the prop in the future.
    //TODO put label in here too
    return (
      <input
        name={this.props.name}
        value={this.props.value}
        className='FormBuilder-text'
        type='text'
        placeholder={this.props.placeholder}
        onChange={(this.props.validation)?this.checkInput:this.props.onChange}
        style={{color:this.state.color}}
      />
    )
  }
}

TextInput.propTypes={
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  //ok for now but changes if this all gets more complex... or moves up.
  validation: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
}