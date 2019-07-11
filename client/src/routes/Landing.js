import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/sessionActions'
import { getGroupOptions } from '../actions/usersActions'
import { signUp } from '../actions/sessionActions'
import FormBuilder from '../components/FormBuilder';
//API Call
//Will provide the login/signup page in the future and access to a demo.

//For testing add a login button or two.

@connect((store) => {
  return ({
    stored: store,
    sessionUser: store.session.user,
    groupOptions: store.users.publicGroupOptions
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

  loginSubmit = (userData) => {
    this.props.dispatch(login(userData))
  }

  render() {
    //TODO adjust location of inputs (maybe?)
    const groupOptions = this.props.groupOptions
    //TODO matching passwords validation! and feedback signup type errors
    const signUpInputs = [//PUSH IN THE NEW OPTION
      { accessor: `email`, name: `Email`, type: `string`, inputType: `text`, validation: { type: 'email' } },
      { accessor: `password`, name: `Password`, type: `string`, inputType: `password`, validation: { required: true } },
      { accessor: `passwordConfirm`, name: `Confirm Password`, type: `string`, inputType: `password`, validation: { required: true } },
      { accessor: `group`, name: `Group`, type: `string`, inputType: `select`, placeholder: 'Select Group', options: (groupOptions), validation: { required: true } },
    ]
    return (
      //CSS - Initial
      <div className="container">
        {/* TEMPORARY */}
        <div className="row">
          <button onClick={() => this.props.dispatch(login('admin'))}>Login Admin</button>
          <button onClick={() => this.props.dispatch(login('user'))}>Login User</button>
          <button onClick={() => this.props.dispatch(login('groupAdmin'))}>Login Group Admin</button>
        </div>
        {/* END TEMPORARY */}
        <div className="row">
          <div className="card large">
            <FormBuilder
              title="Login"
              key='Login'
              elements={signUpInputs.slice(0, 2)}
              onSubmit={this.loginSubmit}
              submitValue='Login'
              preventDefault={true}
            />
          </div>
          <span>{(this.props.groupOptions.length > 0) ?
              <span>{(this.props.sessionUser.siteAccess === 'requested') ?
                <span>{'Access Requested'}</span> :
                <div className="card large" >
                  <FormBuilder
                    title="Sign Up"
                    key='signUp'
                    elements={signUpInputs}
                    onSubmit={this.signUpSubmit}
                    submitValue='Sign Up'
                    preventDefault={true}
                  />
                </div>
              }</span>:<span />
          }</span>
        </div>
      </div>
    )
  }
}

