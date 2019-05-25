import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'

export default class PatientList extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const columns = 
      formatColumns(
        this.props.patientColHeaders,
        this.props.viewPatient,
        `View`
      )

    return (
      <ReactTable 
        data={this.props.patients}
        columns={columns}
        filterable={true}
      />       
    )

  }
}