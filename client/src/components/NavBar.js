import React from 'react'

export default class NavBar extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      // TODO add small screen functionality
      <div className="top">
        <div className="bar theme-d2 left-align large">
          {/* Logo Button with ability to change the page displayed on click. */}
          <a 
            className="bar-item button padding-large theme-d4"
            onClick={()=>this.props.updatePage(this.props.data.home)}
          >
            <i className="fa fa-home margin-right"></i>
            {`Logo`}
          </a>
          {/* Available links are dynamically loaded */}
          {/* TODO add highlight current */}
          {this.props.data.menu.map((item)=>{
            return(
              <a 
                className="bar-item button hide-small padding-large hover-white"
                onClick={()=>this.props.updatePage(item.link)}
                key={item.link}  
              >
                {item.text}
              </a>
            )
          })}

        {/* TODO replace place holder and wire */}
          {/*Far right Nav button.*/}
          <a className="bar-item button hide-small right padding-large hover-white"
            href="/Account"  
            title="My Account"
          >
            <i className="fa fa-user"></i>
          </a>
        </div>
      </div>
    )
  }
}