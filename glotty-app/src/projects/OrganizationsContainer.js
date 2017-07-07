/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchOrganizations from '../actions/organizations/fetch'
import createOrganization from '../actions/organizations/create'
import deleteOrganization from '../actions/organizations/delete'

import './OrganizationsContainer.css'

export class OrganizationsContainer extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
    }
  }

  componentWillMount() {
    const { fetchOrganizations } = this.props
    fetchOrganizations()
  }

  handleNameChange(event) {
     this.setState({name: event.target.value})
   }

  handleDescritpionChange(event) {
    this.setState({description: event.target.value})
  }

  handleSubmit(event) {
    const {
      name,
      description,
      organizationId,
    } = this.state

    const organization = {
      name,
      description,
      organizationId,
    }
      this.props.createOrganization(organization)
      event.preventDefault()
  }

  renderOrganization(organization, index) {
    return <tr key={index} className={organization.deleted ? "deleted" : ""}>
        <td>{organization.name}</td>
        <td>{organization.description}</td>
          <td>
            <div className="expanded button-group">
                <button
                  className="primary button"
                  onClick={() => { this.props.push(organization._id) }}
                  disabled={organization.deleted}>
                  View
                </button>
              <button type="button"
                className="alert button"
                onClick={() => {if(confirm('Delete the item?')) {this.props.deleteOrganization(organization._id)}}}
                disabled={organization.deleted}>
                Delete
              </button>
            </div>
          </td>
      </tr>
  }

  render() {
    if (!this.props.organizations[0]) return null
    return (
      <main className="grid-container organizations">
        <h1 className="text-center">Organizations</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
          <table>
            <thead>
              <tr>
                <th width="16.66667%">Organization Name</th>
                <th width="66.66667%">Organization Description</th>
                <th width="16.66667%">Organization Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text"
                  value={this.state.name}
                  onChange={this.handleNameChange.bind(this)}
                  placeholder="Name of the Organization" />
                </td>
                <td>
                  <input type="text"
                  value={this.state.description}
                  onChange={this.handleDescritpionChange.bind(this)}
                  placeholder="Description" />
                </td>
                <td>
                  <input type="submit" className="button cell" value="Create New Organization" />
                </td>
              </tr>
                { this.props.organizations.map(this.renderOrganization.bind(this)) }
            </tbody>
          </table>
        </form>

      </main>
    )
  }
}

const mapStateToProps = ({currentUser, organizations, currentOrganization }) => ({
  organizations,
  currentUser,
  currentOrganization,
})

export default connect(mapStateToProps, {
  fetchOrganizations,
  deleteOrganization,
  createOrganization,
  push
})(OrganizationsContainer)
