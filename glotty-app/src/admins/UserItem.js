import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export class UserItem extends PureComponent {

  findOrganizationNameById(id){
    const { organizations } = this.props
    return organizations.find((org)=> org._id === id).name
  }

  render() {
    const { name, email, organizationId, roles, currentUser } = this.props
    if(!organizationId) return null
    return(
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        {currentUser.roles.includes("super-admin") ?
          <div>
            <td>{roles[0]}</td>
            <td className="text-center">
              {this.findOrganizationNameById(organizationId)}
            </td>
          </div> : null }
      </tr>
    )
  }
}

const mapStateToProps = ({
  currentUser,
  organizations
}) => ({ currentUser, organizations })

export default connect(mapStateToProps)(UserItem)
