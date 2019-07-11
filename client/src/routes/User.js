import React from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import { getUser } from '../actions/usersActions'

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
  render() {
    //CSS initial
    return (
      <div className="container">
        <h2 className="row">{`User: ${this.props.user.email}`}</h2>
        <br />
        {(this.props.user.groups.length > 0) ?
          <ReactTable
            className="row"
            data={this.props.user.groups}
            columns={this.props.userGroupsColHeaders}
            filterable={true}
            minRows={0}
          /> :
          <span />
        }
      </div>
    )
  }
}