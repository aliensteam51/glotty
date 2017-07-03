import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import signIn from '../actions/users/sign-in'

export class SignIn extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.props.signIn(user)
    }
  }

  validateAll() {
    return this.validateEmail() && this.validatePassword()
  }

  validateEmail() {
    const { email } = this.refs

    if (email.value.match(/^[a-z0-9.\_-]+@[a-z0-9.\_-]+\.[a-z0-9.\_-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email.value === '') {
      this.setState({
        emailError: 'Please provide your email address'
      })
      return false
    }

    this.setState({
      emailError: 'Please provide a valid email address'
    })
    return false
  }

  render() {
    return (
      <div className="sign-in form">
        <h2>Sign In</h2>

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <input ref="email" type="email" placeholder="Email address" />
            { this.state.emailError ?
              <p className="formError">{ this.state.emailError }</p> :
              null
            }
          </div>

          <div className="input">
            <input ref="password" type="password" placeholder="Password" />
            { this.state.passwordError ?
              <p className="formError">{ this.state.passwordError }</p> :
              null
            }
          </div>

          <input type="submit" value="Sign In" />
        </form>
      </div>
    )
  }
}

export default connect(null, { signIn })(SignIn)
