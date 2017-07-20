import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

export class EnsureUserIsSuperAdmin extends PureComponent {
  componentWillMount() {
    const { isSuperAdmin, currentUser, replace } = this.props
    if (!isSuperAdmin) replace("/" + currentUser.organizationId)
  }

  render() {
    if (this.props.isSuperAdmin) {
      return this.props.children
    } else {
      return (<h1>ACCESS DENIED</h1>)
    }
  }
}

const mapStateToProps = ({ currentUser }) => ({ isSuperAdmin: (!!currentUser && !!currentUser.roles.includes('super-admin')), currentUser })

export default connect(mapStateToProps, { replace })(EnsureUserIsSuperAdmin)
