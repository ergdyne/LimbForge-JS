import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { login } from '../actions/sessionActions'
import { getGroupOptions } from '../actions/displayActions'
import { signUp } from '../actions/sessionActions'
import FormBuilder from '../components/FormBuilder'
import OAuth from '../components/OAuth'
import { API_URL } from '../config/API'

const socket = io('https://127.0.0.1:3000')
//API Call
//Will provide the login/signup page in the future and access to a demo.

@connect((store) => {
  return ({
    stored: store,
    sessionUser: store.session.user,
    groupOptions: store.display.optionStore.publicGroupOptions
  })
})

export default class Landing extends React.Component {
  componentWillMount() {
    this.props.dispatch(getGroupOptions())
  }
  componentDidUpdate() {
    //only redirect if not '/' as home, otherwise infinite loop!
    if (this.props.sessionUser.loggedIn && this.props.sessionUser.home != '/') { this.props.history.push(this.props.sessionUser.home) }
  }

  signUpSubmit = (newUser) => {
    if (!newUser.group) {
      newUser.group = this.props.groupOptions[0]
    }
    this.props.dispatch(signUp(newUser))
  }

  logIn = () => {
    console.log('logged in with google')
    this.props.dispatch(login())
  }

  render() {
    const groupOptions = this.props.groupOptions
    const signUpInputs = [
      { accessor: `group`, name: `Group`, type: `string`, inputType: `select`, placeholder: 'Select Group', options: (groupOptions), validation: { required: true } },
    ]

    return (
      //CSS - Initial
      <div className="container">
        <div className="row">
          <div className="card large">
            <OAuth
              onLogIn={this.logIn}
              provider={'google'}
              key={'google'}
              apiURL={API_URL}
              socket={socket}
            />
          </div>
          {/* Will become and option for a user with no groups or site access */}
          <span>{(this.props.groupOptions.length > 0) ?
            <span>{(this.props.sessionUser.siteAccess === 'requested') ?
              <span>{'Access Requested'}</span> :
              <div className="card large" >
                <FormBuilder
                  title="Sign Up"
                  key='signUp'
                  accessor='signUp'
                  elements={signUpInputs}
                  onSubmit={this.signUpSubmit}
                  buttonLabel='Sign Up'
                  preventDefault={true}
                />
              </div>
            }</span> : <span />
          }</span>
        </div>
      </div>
    )
  }
}

