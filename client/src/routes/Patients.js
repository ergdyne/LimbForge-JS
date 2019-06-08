import React from 'react'
import {connect} from 'react-redux'
import { patientColHeaders} from '../testData'//TODO move patientColHeader to their own place unless doing them dynamic like too.
import PatientList from '../components/PatientList'
import { getPatients } from '../actions/patientsActions'

//Patients component will connect to DB to get patient data
//Will store locally any loading state and do all the patient transaction with DB at this level or below.
@connect((store) => {
  return ({
    sessionUser: store.session.user,
    patients: store.patients.patients
  })
})
export default class Patients extends React.Component {
  componentWillMount() {
    this.props.dispatch(getPatients())
  }

  //Callback for view patient button in PatientList
  viewPatient = (patientID) => {
    this.props.history.push(`/patient/${patientID}`)
  }

  render() {
    return (
      <PatientList
        patientColHeaders={patientColHeaders}
        viewPatient={this.viewPatient}
        patients={this.props.patients}
        minRows={0}
      />
    )
  }
}