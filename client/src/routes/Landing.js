import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/sessionActions'
//API Call
//Will provide the login/signup page in the future and access to a demo.

//For testing add a login button or two.

@connect((store) => {
  return ({
    stored: store,
    sessionUser: store.session.user
  })
})

export default class Landing extends React.Component {
  componentDidUpdate(){
    if(this.props.sessionUser.loggedIn){this.props.history.push(this.props.sessionUser.home)}
  }
  render() {
    return (
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <div className="button block theme-l1 left-align">
            <i className="fa fa-circle-o-notch fa-fw margin-right" />
            <button onClick={() => this.props.dispatch(login('admin'))}>Login Admin</button>
            <button onClick={() => this.props.dispatch(login('user'))}>Login User</button>
            <button onClick={() => this.props.dispatch(login('groupAdmin'))}>Login Group Admin</button>
          </div>
        </div></div>
      </div></div></div></div>
    )
  }
}

