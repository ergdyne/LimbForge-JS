import React from 'react'
import SimpleAttribute from '../SimpleAttribute'

export default class PatientDataBox extends React.Component {
  render() {
    const p = this.props.patient
    const explicitData = ['firstName', 'lastName', 'city', 'country', 'groupName']
    const extraData = this.props.inputs.filter(x => !explicitData.includes(x.accessor))

    return (
      <div className="card large">
        <h2 className='row'>
          {`Patient: ${(p.firstName) ? p.firstName : ''} ${(p.lastName) ? p.lastName : ''}`}
        </h2>
        <h3 className='row'>
          {`${(p.city != null) ? `${p.city}${(p.city != null && p.country != null) ? ',' : ''}` : ''} ${(p.country != null) ? `${p.country}` : ''}`}
        </h3>
        <div>
          {extraData.map(x => SimpleAttribute(x, p))}

        </div >
        <div className='row'>{(this.props.editPatient) ?
          <button onClick={() => this.props.editPatient()}>{`Edit`}</button> :
          <span></span>
        }</div>
      </div >
    )
  }
}