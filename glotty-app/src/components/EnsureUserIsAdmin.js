import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

export class EnsureUserIsAdmin extends PureComponent {
  componentWillMount() {
    const { isAdmin, currentUser, replace } = this.props
    if (!isAdmin) replace("/" + currentUser.organizationId)
  }

  render() {
    if (this.props.isAdmin) {
      return this.props.children
    } else {
      return (<h1>ACCESS DENIED</h1>)
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({ isAdmin: (!!currentUser && !!currentUser.roles.includes('super-admin' || 'admin')), currentUser })

export default connect(mapStateToProps, { replace })(EnsureUserIsAdmin)
