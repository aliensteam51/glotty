import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createUser from '../actions/users/create'
import fetchUsers from '../actions/users/fetch'
import fetchOrganizations from '../actions/organizations/fetch'
import UserItem from './UserItem'
import './AdminPage.css'

export class AdminPage extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      roles: [],
      organizationId: ""
    }
  }

  componentWillMount() {
    const { fetchUsers, fetchOrganizations, currentUser } = this.props
    const { organizationId } = currentUser
    fetchOrganizations()

    if (currentUser.roles.includes("admin")){ fetchUsers(organizationId); this.updateStateRoles() }
    if (currentUser.roles.includes("super-admin")){ fetchUsers(); this.updateStateRoles() }
  }

  initializeState() {
    this.setState({
      name: '',
      email: '',
      roles: [],
      organizationId: ""
    })
    this.updateStateRoles()
  }

  updateStateRoles() {
    const { currentUser } = this.props
    const { organizationId } = currentUser

    if (currentUser.roles.includes("admin")) this.setState({ organizationId, roles: ["user"] })
    if (currentUser.roles.includes("super-admin")) this.setState({ roles: ["admin"] })
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
    let organizationId
    !this.state.organizationId ?
      organizationId = this.props.organizations[0]._id :
      organizationId = this.state.organizationId


    const {
      name,
      email,
      roles,
    } = this.state

    const user = {
      name,
      email,
      roles,
      organizationId
    }

    this.props.createUser(user)
    this.initializeState()
    event.preventDefault()
  }

  renderSelectOrganizations() {
    const { organizations } = this.props
    let index = 0
    return organizations.map((org) => <option key={index++} value={org._id}>{org.name}</option> )
  }

  render() {
    const { currentUser, users, organizations } = this.props
    if(!users || !organizations) return null
    console.log(this.props.currentUser.organizationId)
    return(
      <main className="grid-container projects">
        <h1>Admin Page</h1>
        <div className="container" style={{paddingBottom: "50px"}}>
          <table>
            <thead>
              <tr>
                <th width="5%"></th>
                <th width="20%">Name</th>
                <th width="30%">email</th>
                <th width="30%">Organization</th>
                <th width="15%"></th>
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
                    <select
                      id="middle-label"
                      value={this.state.organizationId}
                      onChange={this.handleSelectOrganization.bind(this)}>
                      {this.renderSelectOrganizations()}
                    </select>
                  : <span>PUT ORG IN HERE AS TEXT AND NOT INPUT</span>}
                </td>
                <td>
                  <input
                    type="submit"
                    className="button expanded"
                    value="Create User"
                    onClick={this.handleSubmit.bind(this)}/>
                </td>
              </tr>
            </tbody>
            <tbody>
              { users.map(this.renderUsers.bind(this)) }
            </tbody>
          </table>
        </div>
      </main>
    )
  }
}

const mapStateToProps = ({
  currentUser,
  currentOrganziation,
  organizations,
  users
}) => ({ currentUser, currentOrganziation, organizations, users })

export default connect(mapStateToProps, { fetchUsers,fetchOrganizations, createUser })(AdminPage)
