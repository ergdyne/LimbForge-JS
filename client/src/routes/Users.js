import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'
import { users, userColHeaders, userAccessLevels, groups} from '../testData'
import FormBuilder from '../components/FormBuilder';
//Site Admin and Group Admin access
  //Site Admin sees all users
  //Group Admin sees group's users
//Areas
  //Preapprove user
  //View/Edit user

export default class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeUsers: {},
      requestUsers: {},
      groupOptions:{},
      userInputs:[]
    }
  }

  componentWillMount(){
    this.getUsers()
    this.formSetup()
  }

  getUsers = () => {
    //API Call
    //There is also something more that should be going on with the user's page
    //Should filter to users in groups that the user has authority over... but meh! That will be done on the sequel side
    const activeUsers = users.filter(u => u.siteAccess !== "request")//Truth is not quite right here.
    const requestUsers = users.filter(u => u.siteAccess === "request")
    this.setState({ activeUsers: activeUsers, requestUsers: requestUsers })
  }

  formSetup = () =>{
    //uhm.
    //API Call
    const groupOptions = groups.map(g=> g.name)
    const userInputs = [
      { accessor: `email`, label: `Email`, type: `string`, inputType: `text`, default: '' },
      { accessor: `group`, label: `Group`, type: `string`, inputType: `select`, default: groupOptions[0], options: groupOptions},
      { accessor: `groupAccess`, label: `Permission`, type: `string`, inputType: `select`, default: userAccessLevels[0], options: userAccessLevels.slice(0,2)}

    ]
    this.setState({userInputs:userInputs,groupOptions:groupOptions})
  }

  addUser = (user) =>{
    //API Call
    //to be replace by fixing it at the form level
    if(!user.groupAccess){user.groupAccess = 'user'}
    if(!user.group){user.group = this.state.groupOptions[0]}
    console.log('create user', user)
  }

  approveUser = (pkUser) => {
    //API Call
    console.log('approve user', pkUser, 'for group ?')
  }

  viewUser = (pkUser)=>{
    //API Call
    this.props.history.push(`/user/${pkUser}`)
  }

  render() {
    const userColumns = formatColumns(userColHeaders.slice(0, 2), this.viewUser, `View`)
    const approveColumns = formatColumns(userColHeaders.slice(0, 2), this.approveUser, "Approve")
    return (
      // More convoluted divs from the current copied CSS.
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          {(this.state.userInputs.length>0)?
            <div>
              <FormBuilder 
                key='user'
                elements={this.state.userInputs}
                onSubmit={this.addUser}
                submitValue={`Add`}
                preventDefault={true}
                clearOnSubmit={true}
              />
            </div>:
            <div/>
          }
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
