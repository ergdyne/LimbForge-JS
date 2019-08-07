import React from 'react'
import { connect } from 'react-redux'
import FormBuilder from './FormBuilder'
import Download from './Download'
import isEmpty from '../functions/isEmpty'
import { setEditDevice } from '../actions/displayActions'
import { saveMeasurements } from '../actions/patientsActions'
import SimpleAttribute from './SimpleAttribute'

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

  render() {
    const ms = this.props.device.measurments
    const d = this.props.device
    const explicitData = ['amputationLevel', 'side', 'nozzleSize']
    const extraData = this.props.measurementForm.inputs.filter(x => !explicitData.includes(x.accessor))

    return (
      <div>
        {
          (!isEmpty(ms)) ?
            <div>
              <div className="container card large">
                <h2 className="row"> Device Data</h2>

                <h3 className='row'>
                  {`${d.amputationLevel} - ${d.side} - ${d.nozzleSize}`}
                </h3>
                <div >
                  {extraData.map(x => SimpleAttribute(x, d))}
                </div>
                <div className="row">{(true) ? //TODO based on level
                  <button onClick={() => this.editDevice()}>{`Edit`}</button> :
                  <span></span>
                }</div>
              </div>
            </div> : <span />
        }
        {
          (this.props.isEditDevice) ?
            <div >
              {/* If edit */}
              <FormBuilder
                className="card large"
                title={this.props.measurementForm.name}
                key={this.props.measurementForm.accessor}
                accessor={this.props.measurementForm.accessor}
                elements={this.props.measurementForm.inputs}
                onSubmit={this.submitMeasurements}
                buttonLabel={this.props.measurementForm.button}
                preventDefault={true}
                initial={(!isEmpty(ms)) ? ms : {}}
              />
              <img
                className="card"
                max-height="500"
                src={this.imageLocation(this.props.patient.gender, this.props.device.side)}
              />
            </div> :
            // We only have the download card if device has been saved.
            <div>{(!isEmpty(ms)) ?
              <div className="card">
                <Download
                  patient={this.props.patient}
                  measurements={ms}
                />
              </div> : <span />
            }</div>
        }

      </div>
    )
  }
}

