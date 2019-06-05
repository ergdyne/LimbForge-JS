import React from 'react'
import style from './App.css'
import Footer from './components/Footer'
import { Landing, Patients, Patient, Groups, Users } from './routes/routes'
import { navData, currentUser } from './testData' //TODO Should be spelled out here or in its own location.
import { BrowserRouter as Router, Route, NavLink, Link, Redirect, } from "react-router-dom"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //The page attribute is part of the weird replacement for doing react-router. Much of the anti-patterness of this app starts here.
      page: `patients`,
      user: currentUser
    }
  }

  // Two functions updatePage() and content() combine to provide page switching used in NavBar and Patient(view/edit mode).
  //These are things that should be done with something like React-Router.
  updatePage = (page) => {
    //Access permissions can be added as well
    this.setState({ page: page })
    console.log(this.state.page)
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
                to={(this.state.user.loggedIn) ? `/${this.state.user.home}/` : "/"}
              >
                <i className="fa fa-home margin-right"></i>
                {`Logo`}
              </Link>


              {this.state.user.loggedIn ?
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
                  {['admin', 'groupAdmin'].includes(this.state.user.siteAccess) ?
                    <span>
                      <NavLink
                        activeStyle={{ color: '#fff', backgroundColor: '#7d97a5' }}
                        className="bar-item button hide-small padding-large hover-white"
                        to="/users/"
                      >
                        Users
                  </NavLink>

                      {(this.state.user.siteAccess === 'admin') ?
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
          {(!this.state.user.loggedIn) ? <Redirect to="/" /> : <div />}
          <Route path="/" exact component={Landing} />
          <Route path="/new-patient/" component={Patient} />
          <Route path="/patient/:pkPatient" component={Patient} />
          <Route path="/patients/" component={Patients} />
          <Route path="/users/" component={Users} />
          <Route path="/groups/" component={Groups} />

          <br />
          <Footer />
        </div>
      </Router>
    )
  }
}