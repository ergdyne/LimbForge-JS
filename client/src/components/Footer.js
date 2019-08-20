import React from 'react'

export default class Footer extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <footer>
          
          <div className="row">{`© 2019 - `}<a href="https://www.victoriahandproject.com/"> {` Victoria Hand Project`}</a></div>
      </footer>
    )
  }
}