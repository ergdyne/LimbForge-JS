import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import formatColumns from '../functions/formatColumns'
import {userAccessLevels} from '../config/enums'
import FormBuilder from '../components/FormBuilder';
import {getGroupOptions,getUsers,approveUser,addUser} from '../actions/usersActions'

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
    //to be replace by fixing it at the form level
    if (!user.userGroupAccess) { user.userGroupAccess = 'user' }
    if (!user.groupName) { user.groupName = this.props.groupOptions[0] }
    this.props.dispatch(addUser(user))
  }

  approveUser = (userId) => {
    const groupId = 0
    //TODO remap the approval table to include the group information
    console.log('approve user', userId, 'for group ?')
    this.props.dispatch(approveUser(userId,groupId,'user'))
  }

  viewUser = (userId) => {
    this.props.history.push(`/user/${userId}`)
  }

  render() {
    const userColumns = formatColumns(this.props.usersColHeaders.slice(0, 2), this.viewUser, `View`)
    const approveColumns = formatColumns(this.props.usersColHeaders.slice(0, 2), this.approveUser, "Approve")
    const userInputs = [
      { accessor: `email`, label: `Email`, type: `string`, inputType: `text` },
      { accessor: `groupName`, label: `Group`, type: `string`, inputType: `select`, placeholder: 'Select Group', options: this.props.groupOptions },
      { accessor: `userGroupAccess`, label: `Permission`, type: `string`, inputType: `select`,  placeholder: 'Select Access', options: userAccessLevels.slice(0, 2) }
    ]
    return (
      // More convoluted divs from the current copied CSS.
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          {/* TODO remap this to be based on the sessionUser as to what group options are available */}
          {(this.props.groupOptions.length > 0) ?
            <div>
              <FormBuilder
                key='user'
                elements={userInputs}
                onSubmit={this.addUser}
                submitValue={`Add`}
                preventDefault={true}
                clearOnSubmit={true}
              />
            </div> :
            <div />
          }
          {(this.props.requestedUsers.length > 0) ?
            <div>
              <h3>{'Access Requests'}</h3>
              <ReactTable
                key="access"
                columns={approveColumns}
                data={this.props.requestedUsers}
                filterable={true}
                defaultPageSize={5}
                minRows={0}
              />
            </div> :
            <span></span>
          }
          {(this.props.approvedUsers.length > 0) ?
            <div>
              <h3>{'Users'}</h3>
              <ReactTable
                key="users"
                columns={userColumns}
                data={this.props.approvedUsers}
                filterable={true}
                defaultPageSize={5}
                minRows={0}
              />
            </div> :
            <span></span>
          }
        </div></div>
      </div></div></div></div>
    )
  }
}
