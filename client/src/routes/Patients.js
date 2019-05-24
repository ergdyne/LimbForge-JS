import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
import {patientColHeaders,patients} from '../testData'

//Incoming data should be only USER state
//Patients component will connect to DB to get patient data
//Will store locally any loading state
export default class Patients extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      patients:[]
    }
  }

  componentWillMount(){
    //It would be nice to have the columns load from Database. It would have to happen here.
    //Why? If we would like to change the fields without rebuilding.  OK sure. But! probably not needed.
    //Don't worry about this.
    //Before first render
  }

  componentDidMount(){
    //After first render. Do AJAX calls here
    //this.setState({patients: patients})
  }

  render() {
    const columns = patientColHeaders.map(x=>{
      return({
        Header: x.header,
        accessor: x.accessor,
        //TODO turn this into something more wild. :D
        Cell: props => (x.type === 'date')?
          <span>{moment(props.value).format('LL')}</span>:
          <span>{props.value}</span>
      })
    })

    return (
      <div className="row">
        <div className="col m12">
          <div className="row-padding">
            <div className="col m12">
              <div className="card round white">
                <div className="container padding">
                  <ReactTable 
                    data={patients}
                    columns={columns}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}