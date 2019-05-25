import React from 'react'
import style from './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import {Landing,Patients, NewPatient} from './routes/routes'
import {navData} from './testData'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page:`patients`,
      loggedIn: navData.loggedIn
    }
  }

  //UpdatePage and content combine for the logic for switching page content with navBar clicks
  updatePage = (page) =>{
    this.setState({page:page})
    console.log(this.state.page)
  }

  //This is something that should be done with someting like React-Router, but it wasn't working right.
  //Switching out major content areas (routes) with a common Nav and Footer
  //These areas are roughly define by shared state/state branches.
  content = () =>{
    switch (this.state.page){
      case 'patients': return(<Patients/>)
      case 'new-patient': return(<NewPatient/>)
      default: return(<Landing/>)
    }
  }

  render() {
    return (
      <div className="theme-l5">
        <NavBar 
          menu={navData.menu}
          home={navData.home} 
          updatePage={this.updatePage}
          loggedIn={this.state.loggedIn}
        />
        {this.state.loggedIn?this.content():<Landing/>}
        <br />
        <Footer/>
      </div>
    )
  }
}