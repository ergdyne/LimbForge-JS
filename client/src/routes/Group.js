import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'
import { users, userColHeaders, groups } from '../testData'

//TODO that access matters
export default class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      activeUsers: {},
      requestUsers: {}
    }
  }

  componentWillMount() {
    //API Call
    const { pkGroup } = this.props.match.params
    const fkGroup = parseInt(pkGroup)
    //well some more filtering than this...? Also there is a 0 index, but not a 0 pkPatient. ;)
    if (pkGroup && !(isNaN(fkGroup))) {
      //TEMPORARY until DB call.
      this.setState(
        { group: groups[fkGroup] },
        () => {
          const groupUsers = users.filter(u => u.groups.map(g => g.fkGroup).includes(fkGroup))
          const activeUsers = groupUsers.filter(u => !u.groups.filter(g => g.fkGroup === fkGroup).map(g => g.groupAccess).includes("request"))
          const requestUsers = groupUsers.filter(u => u.groups.filter(g => g.fkGroup === fkGroup).map(g => g.groupAccess).includes("request"))
          this.setState({ activeUsers: activeUsers, requestUsers: requestUsers })
        }
      )
    }
  }

  approveUser = (pkUser) => {
    //API Call
    console.log('approve user', pkUser, 'for group', this.state.group)
  }

  render() {
    //TODO change these columns up.
    const userColumns = formatColumns(userColHeaders,() => { },``)
    const approveColumns = formatColumns(userColHeaders,this.approveUser,"Approve")
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <div className="group-info-area">
            <h2>{this.state.group.name}</h2>
            <div>{this.state.group.description}</div>
            <hr />
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
          </div>
        </div></div>
      </div></div></div></div>
    )
  }
}