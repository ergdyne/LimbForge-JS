import React from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import formatColumns from '../functions/formatColumns'
import { getGroup } from '../actions/groupsActions'

//"Smart" components have a connection to store, which is how Redux works.
@connect((store) => {
  return ({
    sessionUser: store.session.user,
    group: store.groups.group,
    usersGroupColHeaders: store.display.usersGroupColHeaders
  })
})
export default class Group extends React.Component {
  componentWillMount() {
    //The id from the page url links to the DB for group data.
    const { groupId } = this.props.match.params
    const id = parseInt(groupId)
    if (!isNaN(id)) {
      //Dispatch tells Redux to update the store with results of the getGroup function.
      //The getGroup function includes a call to the API.
      this.props.dispatch(getGroup(id))
    }
  }

  viewUser = (userId) => {
    //Change address to view user.
    this.props.history.push(`/user/${userId}`)
  }

  render() {
    //Get user column headers from store, format for ReactTable and add view button.
    const userColumns = formatColumns(this.props.usersGroupColHeaders, this.viewUser, `View`)
    return (
      <div className="container">
        <h2 className="row">{this.props.group.name}</h2>
        <div className="row">{this.props.group.description}</div>
        {/* Tables are shown only if they have data. */}
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