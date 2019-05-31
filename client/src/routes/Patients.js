import React from 'react'
import { patientColHeaders, patients } from '../testData'//TODO move patientColHeader to their own place unless doing them dynamic like too.
import PatientList from '../components/PatientList';
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
        id: null,
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
    this.setState({ patients: patients })
  }

  //Callback for patient view/edit page.
  back = () => this.setState({ page: 'patients' })

  //Callback for view patient button in PatientList
  viewPatient = (patientID) => {
    //Temporary... will be go fetch patient info
    this.setState(
      { patient: patients[patientID] },
      () => {
        //setState has a callback function that can be used to make sure the state is set before moving on.
        //In this case, we could probably just set the two properties at the same time.
        this.setState({ page: 'patient' })
      }
    )
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
            />
        }
      </div>
    )
  }
}

//No prop types yet...Will come with user login.