import React from 'react'

export default class Footer extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <footer>
          
          <div className="row">{String.fromCharCode(169,32) + ` 2019 -` + String.fromCharCode(32)}<a href="https://www.victoriahandproject.com/"> {String.fromCharCode(32) + `Victoria Hand Project`}</a></div>
      </footer>
    )
  }
}