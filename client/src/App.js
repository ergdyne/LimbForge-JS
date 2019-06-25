import React from 'react'
import { connect } from 'react-redux'
import style from './App.css'
import Footer from './components/Footer'
import { Landing, Patients, Patient, Groups, Group, Users, User } from './routes/routes'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from "react-router-dom"
import {logout} from './actions/sessionActions'

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
    //console.log('store', this.props.stored)
    return (
      <Router>
        <div className="theme-l5">
          <div className="top">
            <div className="bar theme-d2 left-align large">
              {/* Logo Button with custom home */}
              <Link
                className="bar-item button padding-large theme-d4"
                to={(this.props.sessionUser.loggedIn) ? `${this.props.sessionUser.home}` : "/"}
              >
                <i className="fa fa-home margin-right"></i>
                {`Logo`}
              </Link>

              {this.props.sessionUser.loggedIn ?
                <span>
                  <NavLink
                    className="bar-item button hide-small padding-large hover-white"
                    activeStyle={{ color: '#fff', backgroundColor: '#7d97a5' }}
                    to="/patients/"
                  >
                    Patients
                </NavLink>
                  <NavLink
                    activeStyle={{ color: '#fff', backgroundColor: '#7d97a5' }}
                    className="bar-item button hide-small padding-large hover-white"
                    to="/new-patient/"
                  >
                    New Patient
                </NavLink>
                  {['admin', 'groupAdmin'].includes(this.props.sessionUser.siteAccess) ?
                    <span>
                      <NavLink
                        activeStyle={{ color: '#fff', backgroundColor: '#7d97a5' }}
                        className="bar-item button hide-small padding-large hover-white"
                        to="/users/"
                      >
                        Users
                  </NavLink>

                      {(this.props.sessionUser.siteAccess === 'admin') ?
                        <NavLink
                          activeStyle={{ color: '#fff', backgroundColor: '#7d97a5' }}
                          className="bar-item button hide-small padding-large hover-white"
                          to="/groups/"
                        >
                          Groups
                  </NavLink> : <span />}
                    </span> : <span />}
                  <button
                    className="bar-item button hide-small padding-large hover-white right"
                    onClick={()=>this.props.dispatch(logout())}
                  >
                    Logout
                  </button>
                </span> : <span />}
            </div>
          </div>
          {/* Redirect can do the login and then return to where the person wanted to go. This is better as part of the restricted Router setup. */}
          {(!this.props.sessionUser.loggedIn) ? <Redirect to="/" /> : <div />}
          <Route path="/" exact component={Landing} />
          <Route path="/new-patient/" component={Patient} />
          <Route path="/patient/:patientId" component={Patient} />
          <Route path="/patients/" component={Patients} />
          <Route path="/user/:userId" component={User} />
          <Route path="/users/" component={Users} />
          <Route path="/group/:groupId" component={Group} />
          <Route path="/groups/" component={Groups} />
          <br />
          <Footer />
        </div>
      </Router>
    )
  }
}