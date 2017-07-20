import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

export class EnsureUserLogIn extends PureComponent {
  componentWillMount() {
    const { signedIn, replace } = this.props
    if (!signedIn) replace("/")
  }

  render() {
    if (this.props.signedIn) {
      return this.props.children
    } else {
      return (<h1>PLEASE SIGN IN</h1>)
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({ signedIn: (!!currentUser && !!currentUser._id) })

export default connect(mapStateToProps, { replace })(EnsureUserLogIn)
