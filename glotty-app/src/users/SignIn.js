import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signIn from '../actions/users/sign-in'
import './SignIn.css'

export class SignIn extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.signIn(user)
  }

  render() {
    if (this.props.currentUser) this.props.push("/organizations")
    return (
      <div className="grid-container">
        {/* <h1>Glotty</h1> */}
        {/* <hr className="star-light"></hr> */}
        {/* <p className="glotty-description">Glotty streamlines the process to publish & maintain multilingual versions of your applications.</p> */}
        <div className="sign-in grid-x">
          <div className="cell">
            <form onSubmit={this.submitForm.bind(this)}>
              <h1>Sign In</h1>
              <div className="grid-x">
                <div className="medium-offset-4 medium-4 cell">
                  <label>Email
                    <input ref="email" type="email" placeholder="Email address" />
                  </label>
                </div>
                <div className="medium-offset-4 medium-4 cell">
                  <label>Password
                    <input ref="password" type="password" placeholder="Password" />
                  </label>
                </div>
                <div className="medium-offset-4 medium-4 cell right">
                  <input type="submit" className="button" value="Sign In" />
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({currentUser }) => ({
  currentUser,
})


export default connect(mapStateToProps, { signIn, push })(SignIn)
