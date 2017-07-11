import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import deleteUser from '../actions/users/delete'
import toggleRole from '../actions/users/toggle'

export class UserItem extends PureComponent {

  findOrganizationNameById(id){
    const { organizations } = this.props
    return organizations.find((org)=> org._id === id).name
  }

  render() {
    const { name, email, organizationId, roles, _id } = this.props
    if(!organizationId) return null
    return(
      <tr>
        <td></td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
          {this.findOrganizationNameById(organizationId)}
        </td>
        <td>
          <button
            className="primary button expanded"
            onClick={() => {this.props.toggleRole(_id, roles[0])}}>
            {roles.includes("admin") ? "Make User" : "Make Admin" }
          </button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({
  currentUser,
  organizations
}) => ({ currentUser, organizations })

export default connect(mapStateToProps, { deleteUser, toggleRole })(UserItem)
