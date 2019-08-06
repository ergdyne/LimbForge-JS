import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OAuth extends Component {
  state={}

  componentDidMount() {
    const { socket, provider, onLogIn} = this.props
    console.log('did mount', socket, provider)
    socket.on(provider, _=> { 
      this.popup.close()
      onLogIn()
    })
  }

  checkPopup = () =>{
    const check = setInterval(() => {
      const {popup} = this
      console.log('check popup')
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
      }
    }, 1000)
  }

  openPopup = () =>{
    const { provider, socket, apiURL } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${apiURL}auth/${provider}?socketId=${socket.id}`
    console.log("url", url)

    console.log('open popup')
    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = () => {
    //disable the button here
      console.log('start auth')
    this.popup = this.openPopup()  
    this.checkPopup()
  }

  render() {
    const { provider } = this.props
    //If desired to prevent multiple auth windows, can disable button
    return (
      <div className='OAuth'>
        <div >
          <button
            className={`OAuth-${provider}`}
            onClick={this.startAuth}
          >
            {`Login with ${provider}`}
          </button>
        </div>
      </div>
    )
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}