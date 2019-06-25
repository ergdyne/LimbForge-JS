import React from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'
import {getGroup} from '../actions/groupsActions'

@connect((store) => {
  return ({
    sessionUser: store.session.user,
    group: store.groups.group,
    userGroupColHeaders: store.display.userGroupColHeaders
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

  approveUser = (userId) => {
    //API Call
    console.log('approve user', userId, 'for group', this.props.group)
  }

  render() {
    console.log("group is ", this.props.group)
    //TODO change these columns up.
    const userColumns = formatColumns(this.props.userGroupColHeaders,() => { },``)
    const approveColumns = formatColumns(this.props.userGroupColHeaders,this.approveUser,"Approve")
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <div className="group-info-area">
            <h2>{this.props.group.name}</h2>
            <div>{this.props.group.description}</div>
            <hr />
            {(this.props.group.requestedUsers.length > 0) ?
              <div>
                <h3>{'Access Requests'}</h3>
                <ReactTable
                  key="access"
                  columns={approveColumns}
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
                <h3>{'Users'}</h3>
                <ReactTable
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
        </div></div>
      </div></div></div></div>
    )
  }
}