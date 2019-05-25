import React from 'react'
import { patientColHeaders, patients } from '../testData'
import PatientList from '../components/PatientList';
import Patient from '../components/Patient';

//Incoming data should be only USER state
//Patients component will connect to DB to get patient data
//Will store locally any loading state
export default class Patients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'patients',
      patients: [],
      patient: {
        id: null,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        dateOfAmpputation: '',
        city: '',
        country: '',
        gender: '',
        amputationlevel: '',
        amputationCauses: '',
        measurements: [],
      }
    }
  }

  componentWillMount() {
    //It would be nice to have the columns load from Database. It would have to happen here.
    //Why? If we would like to change the fields without rebuilding.  OK sure. But! probably not needed.
    //Don't worry about this.
    //Before first render
  }

  componentDidMount() {
    //After first render. Do AJAX calls here
    this.setState({ patients: patients })
  }

  //umm
  back = () => this.setState({page:'patients'})

  viewPatient = (patientID) => {
    this.setState({ page: 'patient' })
    //Temporary... will be go fetch patient info
    this.setState({ patient: patients[patientID] })
  }

  content = () => {
    switch (this.state.page) {
      case 'patient': return(
        <Patient 
          patient={this.state.patient}
          back={this.back}
        />
      )
      default: return (
        <PatientList
          patientColHeaders={patientColHeaders}
          viewPatient={this.viewPatient}
          patients={this.state.patients}
        />
      )
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col m12">
          <div className="row-padding">
            <div className="col m12">
              <div className="card round white">
                <div className="container padding">
                  {this.content()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}