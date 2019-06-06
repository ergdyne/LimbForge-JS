import React from 'react'
import {Redirect} from "react-router-dom"
import { patientColHeaders, patients } from '../testData'//TODO move patientColHeader to their own place unless doing them dynamic like too.
import PatientList from '../components/PatientList'
import Patient from './Patient';

//Incoming data should be only USER state
//Patients component will connect to DB to get patient data
//Will store locally any loading state and do all the patient transaction with DB at this level or below.
export default class Patients extends React.Component {
  constructor(props) {
    super(props)
    //Can I do a DB query in the constructor?
    this.state = {
      page: 'patients',
      patients: [],
      patient: {
        pkPatient: null,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        dateOfAmputation: '',
        city: '',
        country: '',
        gender: '',
        amputationLevel: '',
        amputationCause: '',
      }
    }
  }

  componentDidMount() {
    //API Call
    this.setState({ patients: patients })
  }

  //Callback for patient view/edit page.
  back = () => this.props.history.push(`/patients/`)

  //Callback for view patient button in PatientList
  viewPatient = (patientID) => {
    this.props.history.push(`/patient/${patientID}`)
  }

  render() {
    return (
      <div>
        {
          (this.state.page === 'patient') ?
            <Patient
              initialLevel={(this.state.patient.measurements) ? 'preview' : 'measurement'}
              initialPatient={this.state.patient}
              back={this.back}
            /> :
            <PatientList
              patientColHeaders={patientColHeaders}
              viewPatient={this.viewPatient}
              patients={this.state.patients}
              minRows={0}
            />
        }
      </div>
    )
  }
}

//No prop types yet...Will come with user login.