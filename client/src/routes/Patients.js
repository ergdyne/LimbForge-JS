import React from 'react'
import {connect} from 'react-redux'
import PatientList from '../components/PatientList'
import { getPatients } from '../actions/patientsActions'
import { getColHeaders } from '../actions/displayActions';

@connect((store) => {
  return ({
    sessionUser: store.session.user,
    patients: store.patients.patients,
    patientColHeaders: store.display.patientColHeaders
  })
})
export default class Patients extends React.Component {
  componentWillMount() {
    this.props.dispatch(getColHeaders('patientCols'))
    this.props.dispatch(getPatients())
  }

  //Callback for view patient button in PatientList
  viewPatient = (patientID) => {
    this.props.history.push(`/patient/${patientID}`)
  }

  render() {
    return (
      <PatientList
        className="container"
        patientColHeaders={this.props.patientColHeaders}
        viewPatient={this.viewPatient}
        patients={this.props.patients}
        minRows={0}
      />
    )
  }
}