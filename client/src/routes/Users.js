import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import formatColumns from '../functions/formatColumns'
import {userColHeaders, userAccessLevels} from '../testData'
import FormBuilder from '../components/FormBuilder';
import {getGroupOptions,getApprovedUsers,getRequestedUsers} from '../actions/usersActions'

//Site Admin and Group Admin access
////Site Admin sees all users
////Group Admin sees group's users

@connect((store) => {
  return ({
    sessionUser: store.session.user, //used for updating the store with the correct data
    groupOptions: store.users.groupOptions,
    approvedUsers: store.users.approvedUsers,
    requestedUsers: store.users.requestedUsers
  })
})
export default class Users extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(getGroupOptions())
    this.props.dispatch(getApprovedUsers())
    this.props.dispatch(getRequestedUsers())
  }

  addUser = (user) => {
    //API Call
    //to be replace by fixing it at the form level
    if (!user.groupAccess) { user.groupAccess = 'user' }
    if (!user.group) { user.group = this.props.groupOptions[0] }
    console.log('create user', user)
  }

  approveUser = (userId) => {
    //API Call
    console.log('approve user', userId, 'for group ?')
  }

  viewUser = (userId) => {
    this.props.history.push(`/user/${userId}`)
  }

  render() {
    const userColumns = formatColumns(userColHeaders.slice(0, 2), this.viewUser, `View`)
    const approveColumns = formatColumns(userColHeaders.slice(0, 2), this.approveUser, "Approve")
    const userInputs = [
      { accessor: `email`, label: `Email`, type: `string`, inputType: `text`, default: '' },
      { accessor: `group`, label: `Group`, type: `string`, inputType: `select`, default: this.props.groupOptions[0], options: this.props.groupOptions },
      { accessor: `groupAccess`, label: `Permission`, type: `string`, inputType: `select`, default: userAccessLevels[0], options: userAccessLevels.slice(0, 2) }
    ]
    return (
      // More convoluted divs from the current copied CSS.
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
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
