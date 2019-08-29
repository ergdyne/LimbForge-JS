import React from 'react'
import { connect } from 'react-redux'
import FormBuilder from '../FormBuilder'
import Download from '../Download'
import isEmpty from '../../functions/isEmpty'
import { setEditDevice } from '../../actions/displayActions'
import { saveMeasurements } from '../../actions/patientsActions'
import PatientDeviceData from './PatientDeviceData'

@connect((store) => {
  return ({
    patient: store.patients.patient,
    optionStore: store.display.optionStore,
    measurementForm: store.display.measurementForm,
    isEditDevice: store.display.editDevice,
    device: store.patients.device

  })
})
export default class PatientDevice extends React.Component {
  //map side and gender to image used
  //TODO make this a DB look up in the long term.
  imageLocation = (gender, side) => {
    return `https://limbfore-js-assets.s3.amazonaws.com/${gender.toLowerCase()}-transradial-${side.charAt(0).toUpperCase()}.svg`
  }

  editDevice = () => {
    //show the form
    this.props.dispatch(setEditDevice(true))
  }

  submitMeasurements = (measurements) => {
    this.props.dispatch(saveMeasurements(measurements, this.props.measurementForm.inputs, this.props.patient.id, this.props.device))
    
  }

  onCancel = () =>{
    this.props.dispatch(setEditDevice(false))
  }

  render() {
    const ms = this.props.device.measurments
    return (
      <span>
        {
          (!isEmpty(ms)) ?
            <PatientDeviceData
              device={this.props.device}
              inputs={this.props.measurementForm.inputs}
              editDevice={this.editDevice}

            /> : <span />
        }
        {
          (this.props.isEditDevice) ?
            <span >
              {/* If edit */}
              <div className="card large">
                <FormBuilder

                  title={this.props.measurementForm.name}
                  key={this.props.measurementForm.accessor}
                  accessor={this.props.measurementForm.accessor}
                  elements={this.props.measurementForm.inputs}
                  onSubmit={this.submitMeasurements}
                  onCancel={this.onCancel}
                  buttonLabel={this.props.measurementForm.button}
                  preventDefault={true}
                  initial={(!isEmpty(ms)) ? ms : {}}
                />
              </div>
              <img
                className="card"
                max-height="500"
                src={this.imageLocation(this.props.patient.gender, this.props.device.side)}
              />
            </span> :
            // We only have the download card if device has been saved. Can move into PatientDeviceData
            <div>{(!isEmpty(ms)) ?
              <div className="card">
                <Download
                  patient={this.props.patient}
                  measurements={ms}
                />
              </div> : <span />
            }</div>
        }

      </span>
    )
  }
}

