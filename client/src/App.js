import React from 'react'
import { connect } from 'react-redux'
import style from './App.css'
import Footer from './components/Footer'
import { Landing, Patients, Patient, Groups, Group, Users, User } from './routes/routes'
import { currentUser } from './testData' //TODO Should be spelled out here or in its own location.
import { BrowserRouter as Router, Route, NavLink, Link, Redirect, } from "react-router-dom"

@connect((store) => {
  return ({
    user: currentUser
  })
})
export default class App extends React.Component {
  componentWillMount(){
    //Get user action
  }
  render() {
    // TODO add small screen functionality. Currently, menu items vanish.
    // TODO add security layer to the Router that isn't this goofy.
    return (
      <Router>
        <div className="theme-l5">
          <div className="top">
            <div className="bar theme-d2 left-align large">
              {/* Logo Button with custom home */}
              <Link
                className="bar-item button padding-large theme-d4"
                to={(this.props.user.loggedIn) ? `/${this.props.user.home}/` : "/"}
              >
                <i className="fa fa-home margin-right"></i>
                {`Logo`}
              </Link>


              {this.props.user.loggedIn ?
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
                  {['admin', 'groupAdmin'].includes(this.props.user.siteAccess) ?
                    <span>
                      <NavLink
                        activeStyle={{ color: '#fff', backgroundColor: '#7d97a5' }}
                        className="bar-item button hide-small padding-large hover-white"
                        to="/users/"
                      >
                        Users
                  </NavLink>

                      {(this.props.user.siteAccess === 'admin') ?
                        <NavLink
                          activeStyle={{ color: '#fff', backgroundColor: '#7d97a5' }}
                          className="bar-item button hide-small padding-large hover-white"
                          to="/groups/"
                        >
                          Groups
                  </NavLink> : <span />}
                    </span> : <span />}
                </span> : <span />}
            </div>
          </div>
          {/* Redirect can do the login and then return to where the person wanted to go. This is better as part of the restricted Router setup. */}
          {(!this.props.user.loggedIn) ? <Redirect to="/" /> : <div />}
          <Route path="/" exact component={Landing} />
          <Route path="/new-patient/" component={Patient} />
          <Route path="/patient/:pkPatient" component={Patient} />
          <Route path="/patients/" component={Patients} />
          <Route path="/user/:pkUser" render={(props)=><User user={this.props.user} {...props}/>} />
          <Route path="/users/" render={(props)=><Users user={this.props.user} {...props}/>} />
          <Route path="/group/:pkGroup" render={(props)=><Group user={this.props.user} {...props}/>} />
          <Route path="/groups/" render={(props)=><Groups user={this.props.user} {...props}/>} />
          {/* render={(props) => <Dashboard {...props} */}
          <br />
          <Footer />
        </div>
      </Router>
    )
  }
}