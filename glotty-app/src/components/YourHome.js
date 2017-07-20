import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

export class EnsureUserLogIn extends PureComponent {
  componentWillMount() {
    const { signedIn, currentUser, replace } = this.props
    if (!signedIn) replace("/sign-in")
    if (signedIn && currentUser.roles.includes('super-admin')) replace('/organizations')
    if (signedIn && currentUser.organizationId) replace('/' + currentUser.organizationId)
  }

  render() {
    return (<h1>OOPS SOMETHING WENT WRONG</h1>)
  }
}

const mapStateToProps = ({ currentUser }) => ({ signedIn: (!!currentUser && !!currentUser._id), currentUser })

export default connect(mapStateToProps, { replace })(EnsureUserLogIn)
