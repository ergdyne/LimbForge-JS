import React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {groupColHeaders, groupInputs } from '../testData'
import formatColumns from '../functions/formatColumns'
import FormBuilder from '../components/FormBuilder'
import { getGroups } from '../actions/groupsActions'

//Site Admin access only
@connect((store) => {
  return ({
    sessionUser: store.session.user,
    groups: store.groups.groups
  })
})
export default class Groups extends React.Component {
  componentWillMount(){
    this.props.dispatch(getGroups())
  }

  viewGroup = (groupId) => {
    this.props.history.push(`/group/${groupId}`)
  }

  submitGroup = (group) => {
    //API Call
    console.log('Group submited', group)
  }

  render() {
    const columns =
      formatColumns(
        groupColHeaders,
        this.viewGroup,
        `View`
      )
      
    return (
      // More convoluted divs from the current copied CSS.
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <FormBuilder
            key='patient'
            elements={groupInputs}
            onSubmit={this.submitGroup}
            submitValue={`Add`}
            clearOnSubmit={true}
            preventDefault={true}
          />
          <br />
          <ReactTable
            data={this.props.groups}
            columns={columns}
            filterable={true}
            minRows={0}
          />
        </div></div>
      </div></div></div></div>
    )
  }
}

