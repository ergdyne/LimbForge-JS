import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'

export default class Patient extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.back()}>{`Back`}</button>
        <div>{`This is patient: ${this.props.patient.firstName}`}</div>
      </div>
    )
  }
}