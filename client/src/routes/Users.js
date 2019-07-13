import React from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import formatColumns from '../functions/formatColumns'
import { userAccessLevels } from '../config/enums'
import FormBuilder from '../components/FormBuilder';
import { getGroupOptions, getUsers, approveUser, addUser } from '../actions/usersActions'

//Site Admin and Group Admin access
////Site Admin sees all users
////Group Admin sees group's users
@connect((store) => {
  return ({
    sessionUser: store.session.user, //used for updating the store with the correct data
    groupOptions: store.users.groupOptions,
    approvedUsers: store.users.approvedUsers,
    requestedUsers: store.users.requestedUsers,
    usersColHeaders: store.display.usersColHeaders
  })
})
export default class Users extends React.Component {

  componentWillMount() {
    this.props.dispatch(getGroupOptions())
    this.props.dispatch(getUsers())
  }

  addUser = (user) => {
    //API Call
    this.props.dispatch(addUser(user))
    
  }

  viewUser = (userId) => {
    this.props.history.push(`/user/${userId}`)
  }

  render() {
    const userColumns = formatColumns(this.props.usersColHeaders.slice(0, 2), this.viewUser, `View`)
    const approveColumns = formatColumns(this.props.usersColHeaders.slice(0, 2), this.viewUser, "View")
    const userInputs = [
      { accessor: `email`, name: `Email`, type: `string`, inputType: `text`, validation: { type: 'email' } },
      { accessor: `groupName`, name: `Group`, type: `string`, inputType: `select`, placeholder: 'Select Group', options: this.props.groupOptions, validation: { required: true } },
      { accessor: `userGroupAccess`, name: `Permission`, type: `string`, inputType: `select`, placeholder: 'Select Access', options: userAccessLevels.slice(0, 2), validation: { required: true } }
    ]
    return (
      //CSS - initial
      // More convoluted divs from the current copied.
      <div className="container">
        {/* TODO remap this to be based on the sessionUser as to what group options are available */}
        {(this.props.groupOptions.length > 0) ?
          <div className="row">
            <FormBuilder
              title="Add User"
              className="card large"
              key='user'
              elements={userInputs}
              onSubmit={this.addUser}
              submitValue={`Add`}
              preventDefault={true}
              clearOnSubmit={true}
            />
          </div> :
          <span />
        }
        {(this.props.requestedUsers.length > 0) ?
          <div>
            <h3 className="row">{'Access Requests'}</h3>
            <ReactTable
              className="row"
              key="access"
              columns={approveColumns}
              data={this.props.requestedUsers}
              filterable={true}
              defaultPageSize={5}
              minRows={0}
            />
          </div> :
          <span/>
        }
        {(this.props.approvedUsers.length > 0) ?
          <div>
            <h3 className="row">{'Users'}</h3>
            <ReactTable
              className="row"
              key="users"
              columns={userColumns}
              data={this.props.approvedUsers}
              filterable={true}
              defaultPageSize={5}
              minRows={0}
            />
          </div> :
          <span/>
        }
      </div>
    )
  }
}
