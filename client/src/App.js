import React from 'react'
import { connect } from 'react-redux'
import 'react-table/react-table.css'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from "react-router-dom"
import { Landing, Patients, Patient, Groups, Group, Users, User } from './routes/routes'
import Footer from './components/Footer'
import { logout } from './actions/sessionActions'
import style from './App.css'

@connect((store) => {
  return ({
    stored: store,
    sessionUser: store.session.user
  })
})
export default class App extends React.Component {

  render() {
    // TODO add small screen functionality. Currently, menu items vanish.
    // TODO add security layer to the Router that isn't this goofy.
    //TODO move Nav bar to component
    //CSS - Initial
    return (
      <Router>
        <header>
          {/* Logo Button with custom home */}
          <Link
            className="logo"
            to={(this.props.sessionUser.loggedIn) ? `${this.props.sessionUser.home}` : "/"}
          >
              <img 
                width="27"
                src="https://limbfore-js-assets.s3.amazonaws.com/logo-black.svg"/>
            LIMBFORGE
          </Link>
          {/* Navigation buttons */}
          {this.props.sessionUser.loggedIn ?
            <span>
              <NavLink className="button" to="/patients/">Patients</NavLink>
              <NavLink className="button" to="/new-patient/">New Patient</NavLink>
              {['admin', 'groupAdmin'].includes(this.props.sessionUser.siteAccess) ?
                <span>
                  <NavLink className="button" to="/users/">Users</NavLink>
                  {(this.props.sessionUser.siteAccess === 'admin') ?
                    <NavLink className="button"to="/groups/">Groups</NavLink> : 
                    <span />
                  }
                </span> : <span />
              }
            <span 
              className="button"
              onClick={()=>this.props.dispatch(logout())}
            >
              Logout
            </span>
            </span> : <span />
          }
        </header>

        {/* Content section */}
        {(!this.props.sessionUser.loggedIn) ? <Redirect to="/" /> : <div />}
        <Route path="/" exact component={Landing} />
        <Route path="/new-patient/" component={Patient} />
        <Route path="/patient/:patientId" component={Patient} />
        <Route path="/patients/" component={Patients} />
        <Route path="/user/:userId" component={User} />
        <Route path="/users/" component={Users} />
        <Route path="/group/:groupId" component={Group} />
        <Route path="/groups/" component={Groups} />
                 
        <Footer />
       
      </Router>
    )
  }
}