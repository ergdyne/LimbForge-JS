import React from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import formatColumns from '../functions/formatColumns'
import { getGroup } from '../actions/groupsActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user,
    group: store.groups.group,
    usersGroupColHeaders: store.display.usersGroupColHeaders
  })
})
export default class Group extends React.Component {
  componentWillMount() {
    //API Call
    const { groupId } = this.props.match.params
    const id = parseInt(groupId)

    if (!isNaN(id)) {
      this.props.dispatch(getGroup(id))
    }
  }

  viewUser = (userId) => {
    this.props.history.push(`/user/${userId}`)
  }

  render() {
    //TODO change these columns up.
    const userColumns = formatColumns(this.props.usersGroupColHeaders, this.viewUser, `View`)
    //CSS - initial
    return (
      <div className="container">
        <h2 className="row">{this.props.group.name}</h2>
        <div className="row">{this.props.group.description}</div>

        {(this.props.group.requestedUsers.length > 0) ?
          <div>
            <h3 className="row">{'Access Requests'}</h3>
            <ReactTable
              className="row"
              key="access"
              columns={userColumns}
              data={this.props.group.requestedUsers}
              filterable={true}
              defaultPageSize={5}
              minRows={0}
            />
          </div> :
          <span></span>
        }
        {(this.props.group.approvedUsers.length > 0) ?
          <div>
            <h3 className="row">{'Users'}</h3>
            <ReactTable
              className="row"
              key="users"
              columns={userColumns}
              data={this.props.group.approvedUsers}
              filterable={true}
              defaultPageSize={5}
              minRows={0}
            />
          </div> :
          <span></span>
        }
      </div>
    )
  }
}