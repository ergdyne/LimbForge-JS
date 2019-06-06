import React from 'react'

export default class User extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

  render(){
    return(
      <div className="row"><div className="col m12"><div className="row-padding"><div className="col m12">
        <div className="card round white"><div className="container padding">
          <div>{'Hello User'}</div>
        </div></div>
      </div></div></div></div>
    )
  }

}