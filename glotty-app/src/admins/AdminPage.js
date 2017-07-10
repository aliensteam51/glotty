import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createUser from '../actions/users/create'
import fetchUsers from '../actions/users/fetch'
import UserItem from './UserItem'
import './AdminPage.css'

export class AdminPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      roles: [],
      organizationId: {},
    }
  }

  componentWillMount() {
    const { fetchUsers, currentUser } = this.props
    const { organizationId } = currentUser
    if (currentUser.roles === ["super-admin"]){ fetchUsers(); this.setState({ roles: ["admin"] })}
    if (currentUser.roles === ["admin"]){
      fetchUsers(organizationId)
      this.setState({ organizationId })
      this.setState({ roles: ["user"] })
    }
  }

  renderUsers(user, index) {
    return(
      <UserItem key={index} {...user} />
    )
  }

  handleSelectOrganization(e){
    this.setState({ organizationId: e.target.value })
  }

  handleSubmit(event) {
    const {
      name,
      email,
      roles,
      organizationId,
    } = this.state

    const user = {
      name,
      email,
      roles,
      organizationId,
    }
    this.props.createUser(user)
    event.preventDefault()
  }

  renderSelectOrganizations() {
    const { organizations } = this.props
    let index = 0
    return organizations.map((org) => <option key={index++} value={org._id}>{org.name}</option> )
  }

  render() {
    const { currentUser, users } = this.props
    if(!users) return null
    return(
        <div className="container" style={{paddingBottom: "50px"}}>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th width="5%"></th>
                <th width="30%">Name</th>
                <th width="30%">email</th>
                <th width="30%">Organization</th>
                <th width="5%"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(event) => this.setState({name: event.target.value})}  />
                </td>
                <td>
                  <input
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(event) => this.setState({email: event.target.value})}  />
                </td>
                <td>
                {currentUser.roles.includes("super-admin") ?
                <div className="cell medium-3">
                  <select
                    id="middle-label"
                    value={this.state.organizationId}
                    onChange={this.handleSelectOrganization.bind(this)}>
                    {this.renderSelectOrganizations()}
                  </select>
                </div>
                : null}
                </td>
                <td>
                  <input
                    type="submit"
                    className="button "
                    value="Submit"
                    onClick={this.handleSubmit.bind(this)}/>
                </td>
              </tr>
            </tbody>
            <tbody>
            { users.map(this.renderUsers.bind(this)) }
            </tbody>
          </table>
        </div>
    )
  }
}

const mapStateToProps = ({
  currentUser,
  currentOrganziation,
  organizations,
  users
}) => ({ currentUser, currentOrganziation, organizations, users })

export default connect(mapStateToProps, { fetchUsers, createUser })(AdminPage)
