import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'
import { users, userColHeaders} from '../testData'
//Site Admin and Group Admin access
  //Site Admin sees all users
  //Group Admin sees group's users
//Areas
  //Add user
  //List of pending approval (i.e. no group? or "requested")
  //List of users
  //View/Edit user
//Add list of groups access with remove/promote group admin
//single item form to add another group

export default class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeUsers: {},
      requestUsers: {}
    }
  }


  componentWillMount(){
    this.getUsers()
  }
  getUsers = () => {
    //API Call
    //There is also something more that should be going on with the user's page
    //Should filter to users in groups that the user has authority over... but meh! That will be done on the sequel side
    const activeUsers = users.filter(u => u.siteAccess !== "request")//Truth is not quite right here.
    const requestUsers = users.filter(u => u.siteAccess === "request")
    this.setState({ activeUsers: activeUsers, requestUsers: requestUsers })
  }

  addUser = (user) =>{
    //API Call
    console.log('create user', user)
  }

  approveUser = (pkUser) => {
    //API Call
    console.log('approve user', pkUser, 'for group ?')
  }

  viewUser = (pkUser)=>{
    //API Call
    console.log("go user", pkUser)
  }

  render() {
    const userColumns = formatColumns(userColHeaders.slice(0, 2), this.viewUser, `View`)
    const approveColumns = formatColumns(userColHeaders.slice(0, 2), this.approveUser, "Approve")
    return (
      // More convoluted divs from the current copied CSS.
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          {/* Add user form */}
          {(this.state.requestUsers.length > 0) ?
            <div>
              <h3>{'Access Requests'}</h3>
              <ReactTable
                key="access"
                columns={approveColumns}
                data={this.state.requestUsers}
                filterable={true}
                defaultPageSize={5}
                minRows={0}
              />
            </div> :
            <span></span>
          }
          {(this.state.activeUsers.length > 0) ?
            <div>
              <h3>{'Users'}</h3>
              <ReactTable
                key="users"
                columns={userColumns}
                data={this.state.activeUsers}
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
