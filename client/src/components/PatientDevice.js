import React from 'react'
import { connect } from 'react-redux'
import FormBuilder from './FormBuilder'
import Download from './Download'
import isEmpty from '../functions/isEmpty'


//If a build is selected
//Connect directly to store?
//--simplifies transactions
//--can have patient id, (patient-device id), device id, side, flow down
//--then populate store from here for some things
@connect((store) => {
  return ({
    //START HERE
    patient: store.patients.patient,
    measurements: store.patients.measurements,
    level: store.patients.patientFormLevel, //TODO refactor this to session?
    optionStore: store.display.optionStore,
    measurementForm: store.display.measurementForm
  })
})
export default class PatientDevice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //todo set to null
      measuresSRC: `https://limbfore-js-assets.s3.amazonaws.com/male-transradial-L.svg`
    }
  }

  //map side and gender to image used
  imageLocation = (gender, side) => {
    return `https://limbfore-js-assets.s3.amazonaws.com/${gender.toLowerCase()}-transradial-${side.charAt(0).toUpperCase()}.svg`
  }

  editDevice = () => {

    console.log("Edit device clicked")
    //Change levels
  }
  render() {
    return (
      <div className="container">
        {
          (this.props.patientDeviceId || true) ?
            <div className="row">
              <div className="container">
              <div className="row"> Device DATA</div>
              <div className="row"> AMP LEVEL - SIDE </div>
              <div className="row"> clustered measurements - TODO each measurement a component</div>

                <div className="row">{(true) ? //TODO based on level
                  <button onClick={() => this.editDevice()}>{`Edit`}</button> :
                  <span></span>
                }</div>
              </div>
            </div> : <span />
        }
        {
          (this.props.isEditDevice || true) ?
            <div className="row">
              {/* If edit */}
              <FormBuilder
                title={this.props.measurementForm.name}
                key={this.props.measurementForm.accessor}
                accessor={this.props.measurementForm.accessor}
                className="card large col-sm"
                elements={this.props.measurementForm.inputs}
                onSubmit={this.measurementSubmit}
                submitValue={this.props.measurementForm.button}
                preventDefault={true}
                initial={(!isEmpty(this.props.measurements)) ? this.props.measurements : {}}
              />
              <img
                className="card large col-sm"
                max-height="500"
                src={(this.state.measuresSRC) ? this.state.measuresSRC : this.imageLocation(this.props.patient.gender, this.props.patient.side)}
              />
            </div> :
            // We only have the download card if device has been saved...
            <div>{(this.props.patientDeviceId) ?
              <div className="row">
                <Download
                  className="card large"
                  patient={this.props.patient}
                  measurements={this.props.measurements}
                />
              </div> : <span />
            }</div>
        }

      </div>
    )
  }
}

