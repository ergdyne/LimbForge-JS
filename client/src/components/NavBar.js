import React from 'react'
import PropTypes from 'prop-types'

export default class NavBar extends React.Component{
  constructor(props){
    super(props)
  }

  // Available links are dynamically loaded.
  //  TODO add highlight current.
  menuItems = ()=>{
    return(
      this.props.menu.map((item)=>{
        return(
          <a 
            className="bar-item button hide-small padding-large hover-white"
            onClick={()=>this.props.updatePage(item.link)}
            key={item.link}  
          >
            {item.text}
          </a>
        )
      })
    )
  }

  //TODO replace placeholder and wire.
  //Far right side of NavBar.
  accountItems = ()=>{
    return(
      <a className="bar-item button hide-small right padding-large hover-white"
        title="My Account"
      >
        <i className="fa fa-user"></i>
      </a>
    )
  }

  render(){
    return(
      // TODO add small screen functionality. Currently, menu items vanish.
      <div className="top">
        <div className="bar theme-d2 left-align large">
          {/* Logo Button with ability to change the page displayed on click. */}
          <a 
            className="bar-item button padding-large theme-d4"
            onClick={()=>this.props.updatePage(
              (this.props.loggedIn)?this.props.home:'')}
          >
            <i className="fa fa-home margin-right"></i>
            {`Logo`}
          </a>
          {/* Access to pages depends on being loggedIn */}
          {(this.props.loggedIn)?this.menuItems():''}
          {(this.props.loggedIn)?this.accountItems():''}
        
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  //Home depends on the user access level.
  home: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })),
  updatePage: PropTypes.func.isRequired
}