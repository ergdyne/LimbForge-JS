import React from 'react'
import SimpleAttribute from '../SimpleAttribute'

export default class PatientDataBox extends React.Component {
  render() {
    const d = this.props.device
    const explicitData = ['amputationLevel', 'side', 'nozzleSize']
    const extraData = this.props.inputs.filter(x => !explicitData.includes(x.accessor))

    return (
      <div className="card large ">
          <h2 className="row"> Device Data</h2>

          <h3 className='row'>
            {`${d.amputationLevel} - ${d.side} - ${d.nozzleSize}`}
          </h3>
          <div >
            {extraData.map(x => SimpleAttribute(x, d))}
          </div>
          <div className="row">
            {(!this.props.isEditDevice) ?
              <button onClick={() => this.props.editDevice()}>
                {`Edit`}
              </button> :
              <span />
            }
          </div>
      </div>
    )
  }
}