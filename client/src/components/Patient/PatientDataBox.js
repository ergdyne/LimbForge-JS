import React from 'react'
import PropTypes from 'prop-types'
import SimpleAttribute from '../SimpleAttribute'

const PatientDataBox = props => {
  const p = props.patient
  const explicitData = ['firstName', 'lastName', 'city', 'country', 'groupName']
  const extraData = props.inputs.filter(x => !explicitData.includes(x.accessor))

  return (
    <div className="card large">
      <h2 className='row'>
        {`Patient: ${(p.firstName) ? p.firstName : ''} ${(p.lastName) ? p.lastName : ''}`}
      </h2>
      <h3 className='row'>
        {`${(p.city != null) ? `${p.city}${(p.city != null && p.country != null) ? ',' : ''}` : ''} ${(p.country != null) ? `${p.country}` : ''}`}
      </h3>
      <div className='card large'>
        {extraData.map(x => SimpleAttribute(x, p))}

      </div >
      <div className='row'>{(props.editPatient) ?
        <button onClick={() => props.editPatient()}>{`Edit`}</button> :
        <span></span>
      }</div>
    </div >
  )
}

PatientDataBox.propTypes = {
  patient: PropTypes.object,
  inputs: PropTypes.array,
  editPatient: PropTypes.func
}

export default PatientDataBox