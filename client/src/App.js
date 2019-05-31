import React from 'react'
import style from './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import {Landing,Patients, Patient} from './routes/routes'
import {navData} from './testData' //TODO Should be spelled out here or in its own location.

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //The page attribute is part of the weird replacement for doing react-router. Much of the anti-patterness of this app starts here.
      page:`patients`,
      loggedIn: navData.loggedIn
    }
  }

  // Two functions updatePage() and content() combine to provide page switching used in NavBar and Patient(view/edit mode).
  //These are things that should be done with something like React-Router.
  updatePage = (page) =>{
    //Access permissions can be added as well
    this.setState({page:page})
    console.log(this.state.page)
  }

  //Additional pages will be added for Admin and GroupAdmin functions.
  content = () =>{
    switch (this.state.page){
      //Patients with an 's' lists all the user's patients (all the patients in their group(s)).
      case 'patients': return(<Patients/>)
      //The new patient version of Patient uses default props and allows for adding a new patient.
      case 'new-patient': return(<Patient/>)
      //Drive to landing page if not page is selected (probably not loggedin)
      default: return(<Landing/>)
    }
  }

  render() {
    return (
      //Much of the css should be redone as it is a bit funky as is.
      <div className="theme-l5">
        <NavBar 
          menu={navData.menu}
          home={navData.home} 
          updatePage={this.updatePage}
          loggedIn={this.state.loggedIn}
        />
        {/* Doubly drives user to Landing if not logged in. Overkill. */}
        {this.state.loggedIn?this.content():<Landing/>}
        <br />
        <Footer/>
      </div>
    )
  }
}