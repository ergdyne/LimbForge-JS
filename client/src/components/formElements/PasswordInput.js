import React from 'react'
import PropTypes from 'prop-types'

export default class PasswordInput extends React.Component {

  //Optional input check path (if validation on)
  //Simple version of checking values for just our cases.
  checkInput = (event) => {
    //Callback to state inside form with the parts of event we care about
    
    //If it doesn't have validation, I don't want to call confirm...
    const hasConfirm = (this.props.validations) ? ((this.props.validations.confirm) ? true : false) : false

    if(hasConfirm){
      const first = (typeof this.props.value === 'string')?this.props.value:this.props.value.first
      const second = (typeof this.props.value === 'string')?'':this.props.value.second

      const newValue = (event.target.name === this.props.name)?{
        first:event.target.value,
        second:second
      }:{
        first:first,
        second:event.target.value
      }

      this.props.onChange({
        name: this.props.name,
        label: this.props.label,
        value: newValue,
        validations: this.props.validations,
        isvalid: this.props.isvalid
      })
    }else{
      this.props.onChange({
        name: this.props.name,
        label: this.props.label,
        value: event.target.value,
        validations: this.props.validations,
        isvalid: this.props.isvalid
      })
    }
  }

  render() {
    //CSS - initial
    // TODO make password confirm.
    const hasConfirm = (this.props.validations) ? ((this.props.validations.confirm) ? true : false) : false
    const first = (typeof this.props.value === 'string')?this.props.value:this.props.value.first
    const second = (typeof this.props.value === 'string')?'':this.props.value.second
    const confirmLabel = 'Confirm'
    return (
      <div className={`FormBuilder-password`}>
        <label
          data-tip={this.props.instruction}
        >
          {`${this.props.label}: `}
          <span data-tip={(this.props.isvalid) ? '' : this.props.errors}>
            <input
              key='first'
              type='password'
              className={`${(this.props.isvalid) ? '' : 'invalid'}`}
              name={this.props.name}
              value={first}
              placeholder={this.props.placeholder}
              onChange={this.checkInput}
            />


          </span>
        </label>
        {(hasConfirm) ?
          <label
            data-tip={this.props.instruction}
          >
            {`${confirmLabel}: `}
            <span data-tip={(this.props.isvalid) ? '' : this.props.errors}>
              <input
                key='second'
                type='password'
                className={`${(this.props.isvalid) ? '' : 'invalid'}`}
                name={`${this.props.name}-confirm`}
                value={second}
                placeholder={this.props.placeholder}
                onChange={this.checkInput}
              />
            </span>
          </label> : <span />
        }
      </div>
    )
  }
}

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  isvalid: PropTypes.bool,
  errors: PropTypes.array,
  validations: PropTypes.object
}