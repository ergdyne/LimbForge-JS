import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { groups, groupColHeaders, groupInputs } from '../testData'
import formatColumns from '../functions/formatColumns'
import FormBuilder from '../components/FormBuilder';


//Site Admin access only
//Views available:
//A list of groups 
//add group -> simple form (subset of view/edit)
//view/edit group
//the add group form
//stats
//users listing
//patient listing?
export default class Groups extends React.Component {
  constructor(props) {
    super(props)
    //State would have listing type things...
  }

  viewGroup = (pkGroup) => {
    this.props.history.push(`/group/${pkGroup}`)
  }

  submitGroup = (group) => {
    //API Call
    console.log('Group submited', group)
  }

  render() {
    const columns =
      formatColumns(
        groupColHeaders,
        this.viewGroup,
        `View`
      )
      
    return (
      // More convoluted divs from the current copied CSS.
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <FormBuilder
            key='patient'
            elements={groupInputs}
            onSubmit={this.submitGroup}
            submitValue={`Add`}
            clearOnSubmit={true}
            preventDefault={true}
          />
          <br />
          <ReactTable
            data={groups}//API Call
            columns={columns}
            filterable={true}
            minRows={0}
          />
        </div></div>
      </div></div></div></div>
    )
  }
}

Groups.propTypes = {
  user: PropTypes.object.isRequired
}

