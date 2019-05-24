import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import style from './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import {Landing,Patients} from './routes/routes'
import {navData} from './testData'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      page:''
    }
  }

  //UpdatePage and content combine for the logic for switching page content with navBar clicks
  updatePage = (page) =>{
    this.setState({page:page})
    console.log(this.state.page)
  }

  content = () =>{
    switch (this.state.page){
      case '': return(<Landing/>)
      case 'patients': return(<Patients/>)
      default: return(<Landing/>)
    }
  }

  render() {
    return (
      <div className="theme-l5">
        <NavBar 
          data={navData} 
          updatePage={this.updatePage}
        />
        {this.content()}
        <br />
        <Footer/>
      </div>
    )
  }
}