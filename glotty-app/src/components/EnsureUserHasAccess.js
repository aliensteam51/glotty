import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

export class EnsureUserHasAccess extends PureComponent {
  componentWillMount() {
    console.log('these are the props')
    console.log(this.props)
    const { currentUser, isSuperAdmin, replace, params } = this.props
    if (!isSuperAdmin && params.organizationId !== currentUser.organizationId) replace("/" + currentUser.organizationId)
  }

  render() {
    const { currentUser, isSuperAdmin, params } = this.props
    if (isSuperAdmin || params.organizationId === currentUser.organizationId) {
      return this.props.children
    } else {
      return (<h1>ACCESS DENIED</h1>)
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser, isSuperAdmin: (!!currentUser && !!currentUser.roles.includes('super-admin')) })

export default connect(mapStateToProps, { replace })(EnsureUserHasAccess)
