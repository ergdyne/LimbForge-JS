import React from 'react'

export default class NewPatient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patient: {
        id: null,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        dateOfAmpputation: '',
        city: '',
        country: '',
        gender: '',
        amputationLevel: '',
        amputationCause: '',
        measurements: [],
      }
    }
  }

  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          {`OK just doing one common format until get something better`}
        </div></div>
      </div></div></div></div>
    )
  }
}