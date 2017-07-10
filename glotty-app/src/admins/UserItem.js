import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export class UserItem extends PureComponent {

  findOrganizationNameById(id){
    const { organizations } = this.props
    return organizations.find((org)=> org._id === id).name
  }

  render() {
    const { name, email, organizationId, roles, currentUser } = this.props
    return(
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{roles[0]}</td>
        <td className="text-center">
          { currentUser.roles === "super-admin" ?
           <td>{this.findOrganizationNameById(organizationId).bind(this)}</td> :
           null
          }
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({
  currentUser,
  organizations
}) => ({ currentUser, organizations })

export default connect(mapStateToProps)(UserItem)
