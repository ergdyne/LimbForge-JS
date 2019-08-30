import React from 'react'
import DownloadInstructions from './DownloadInstructions'


const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col-sm">
          {String.fromCharCode(169, 32) +
            ` 2019 -` +
            String.fromCharCode(32)}
          <a href="https://www.victoriahandproject.com/"> {
            String.fromCharCode(32) +
            `Victoria Hand Project`
          }</a>
        </div>
        <div className="col-sm">
          <DownloadInstructions/>
        </div>
      </div>
    </footer>
  )

}

export default Footer