import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { login } from '../actions/sessionActions'
import { getGroupOptions } from '../actions/displayActions'
import FormBuilder from '../components/FormBuilder'
import OAuth from '../components/OAuth'
import { API_URL, API_DOMAIN } from '../config/API'
import { signUp } from '../actions/groupsActions'
import home from '../functions/home'

//Socket combines with OAuth to link the client to the server and google for authorization and sets a cookie.
const socket = io(API_DOMAIN)

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
    //If the user has an active cookie, login will get login information and direct them into the site.
    this.props.dispatch(login())
  }
  componentDidUpdate() {
    if (this.props.sessionUser.loggedIn && this.props.sessionUser.siteAccess != 'requested') {
      this.props.history.push(home(this.props.sessionUser.siteAccess))
    }
  }

  //Once the user has been approved, the cookie is used to get login information.
  logIn = () => {
    this.props.dispatch(login())
  }

  //If this is a new user that is not preapproved, they can select the group they want to join.
  signUpSubmit = (groupData) => {
    if (!groupData.group) {
      groupData.group = this.props.groupOptions[0]
    }
    this.props.dispatch(signUp(groupData))
  }

  render() {
    const groupOptions = this.props.groupOptions
    const signUpInputs = [
      { accessor: `group`, name: `Group`, type: `string`, inputType: `select`, placeholder: 'Select Group', options: (groupOptions), validation: { required: true } },
    ]

    return (
      <div className="container">
        <div className="row">
          {(this.props.sessionUser.loggedIn) ?
            <span /> :
            <div className="card">
              <OAuth
              onLogIn={this.logIn}
              provider={'google'}
              key={'google'}
              apiURL={API_URL}
              socket={socket}
            /></div>}
          {/* Will become and option for a user with no groups or site access */}
          <span>{(this.props.groupOptions.length > 0 && this.props.sessionUser.siteAccess === 'requested') ?
            <span>{(this.props.sessionUser.groups.length > 0) ?
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

