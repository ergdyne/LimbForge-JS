import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import formatColumns from '../functions/formatColumns'
import { users, userColHeaders, groups } from '../testData'

export default class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
  }

  componentWillMount() {
    const { pkGroup } = this.props.match.params
    const fkGroup = parseInt(pkGroup)
    //well some more filtering than this...? Also there is a 0 index, but not a 0 pkPatient. ;)
    if (pkGroup && !(isNaN(fkGroup))) {
      this.setState(
        { group: groups[fkGroup] },
        ()=>{
          const groupUsers = users.filter(u => u.groups.map(g=> g.fkGroup).includes(fkGroup))
          this.setState({users:groupUsers})
        }
      )
    }
  }

  render() {
    console.log('group', this.state.group, 'users', this.state.users)
    const columns =
      formatColumns(
        userColHeaders,
        ()=>{},
        ``
      )
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <div className="group-info-area">
            <h2>{this.state.group.name}</h2>
            <div>{this.state.group.description}</div>
            <hr/>
            <h3>{'Group Users'}</h3>
            <ReactTable
              columns={columns}
              data={this.state.users}
              filterable={true}
            />
          </div>
        </div></div>
      </div></div></div></div>
    )
  }
}