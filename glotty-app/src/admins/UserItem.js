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
    const { name, email, organizationId, roles, currentUser, _id } = this.props
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
            <td>
              <div className="expanded button-group">
                <button
                  className="primary button success"
                  onClick={() => {this.props.toggleRole(_id, roles[0])}}>
                  {roles.includes("admin") ? "Demote" : "Promote" }
                </button>
              </div>
            </td>
          </div> : null }

          <td>
            <div className="expanded button-group">
              <button type="button"
                className="alert button"
                onClick={() => {this.props.deleteUser(_id)}}>
                Delete
              </button>
            </div>
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
