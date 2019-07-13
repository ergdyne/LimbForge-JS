import React from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import { getUser,approveUser } from '../actions/usersActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user,
    user: store.users.user,
    userGroupsColHeaders: store.display.userGroupsColHeaders
  })
})
export default class User extends React.Component {
  componentWillMount() {
    const { userId } = this.props.match.params
    const id = parseInt(userId)

    if (!isNaN(id)) {
      this.props.dispatch(getUser(id))
    }
  }

  promoteUser = (group, groupAccess) =>{
    this.props.dispatch(approveUser(this.props.user.id,this.props.user.email,group,groupAccess))
  }

  render() {
    //CSS initial
    const approve = {
      Header: '',
      accessor: 'id',
      Cell: props => {
        const {groupAccess, name} = props.row
        switch(groupAccess){
          case 'requested':{
            return <button onClick={()=>this.promoteUser(name, 'user')}>Approve User</button>
          }
          case 'user':{
            return <button onClick={()=>this.promoteUser(name, 'groupAdmin')}>Promote User</button>
          }
          default:{
            return <span/>
          }
        }
      }
    }

    const columns = [approve].concat(this.props.userGroupsColHeaders)

    return (
      <div className="container">
        <h2 className="row">{`User: ${this.props.user.email}`}</h2>
        <br />
        {(this.props.user.groups.length > 0) ?
          <ReactTable
            className="row"
            data={this.props.user.groups}
            columns={columns}
            filterable={true}
            minRows={0}
          /> :
          <span />
        }
      </div>
    )
  }
}