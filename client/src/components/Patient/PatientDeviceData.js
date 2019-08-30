import React from 'react'
import PropTypes from 'prop-types'
import SimpleAttribute from '../SimpleAttribute'
import Download from '../Download'

const PatientDeviceData = props => {
  const d = props.device
  const explicitData = ['amputationLevel', 'side', 'nozzleSize']
  const extraData = props.inputs.filter(x => !explicitData.includes(x.accessor))

  return (<div className="card large ">
    <h2 className="row">Device Data</h2>

    <h3 className='row'>
      {`${d.amputationLevel} - ${d.side} - ${d.nozzleSize}`}
    </h3>

    <div >
      {extraData.map(x => SimpleAttribute(x, d))}
    </div>

    <div className="row">
      {/* Only provide the option if the form is closed */}
      {(!props.isEditDevice) ?
        <button onClick={() => props.editDevice()}>
          {`Edit`}
        </button> :
        <span />
      }
    </div>
    <div className="row">
      <div className="card">
        <Download
          patient={props.patient}
          measurements={props.measurements}
        />
      </div>
    </div>

  </div>)
}

PatientDeviceData.propTypes = {
  patient: PropTypes.object,
  device: PropTypes.object,
  measurements: PropTypes.object,
  inputs: PropTypes.array,
  editDevice: PropTypes.func,
  isEditDevice: PropTypes.bool
}

export default PatientDeviceData