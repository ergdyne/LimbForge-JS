import React from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import formatColumns from '../functions/formatColumns'
import FormBuilder from '../components/FormBuilder'
import { getGroups, addGroup } from '../actions/groupsActions'

//Site Admin access only
@connect((store) => {
  return ({
    sessionUser: store.session.user,
    groups: store.groups.groups,
    groupColHeaders: store.display.groupColHeaders,
    groupInputs: store.display.groupInputs
  })
})
export default class Groups extends React.Component {
  componentWillMount() {
    this.props.dispatch(getGroups())
  }

  viewGroup = (groupId) => {
    this.props.history.push(`/group/${groupId}`)
  }

  submitGroup = (group) => {
    //API Call
    this.props.dispatch(addGroup(group))
  }

  render() {
    const columns =
      formatColumns(
        this.props.groupColHeaders,
        this.viewGroup,
        `View`
      )

    return (
      //CSS - initial
      <div className="container">
        <div className="row">
          <FormBuilder
            title="Create Group"
            className="card large"
            key='group'
            elements={this.props.groupInputs}
            onSubmit={this.submitGroup}
            submitValue={`Add`}
            clearOnSubmit={true}
            preventDefault={true}
          />
        </div>
        <ReactTable
          className="row"
          data={this.props.groups}
          columns={columns}
          filterable={true}
          minRows={0}
        />
      </div>
    )
  }
}

