import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import fetchOrganizations from '../actions/organizations/fetch'
import createOrganization from '../actions/organizations/create'
import deleteOrganization from '../actions/organizations/delete'
import hardDelete from '../actions/organizations/hard-delete'
import reviveOrganization from '../actions/organizations/revive'

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
    return(
      <tr key={index} className={organization.deleted ? "deleted" : "show"}>
        <td><span>{organization.name}</span></td>
        <td><span>{organization.description}</span></td>
        <td>
          { organization.deleted ?
            <div className="expanded button-group">
              <button
                className="primary button success"
                onClick={() => {this.props.reviveOrganization(organization._id)}}>
                Revive
              </button>
            </div>:
            <div className="expanded button-group">
              <button
                className="primary button"
                onClick={() => { this.props.push(organization._id) }}
                disabled={organization.deleted}>
                View
              </button>
              <button type="button"
                className="alert button"
                onClick={() => {this.props.deleteOrganization(organization._id)}}
                disabled={organization.deleted}>
                Delete
              </button>
            </div>
            }
          </td>
      </tr>
    )
  }

  render() {
    const { organizations } = this.props
    if(!organizations) return null

    return(
      <main className="grid-container organizations">
        <h1 className="text-center">Organizations</h1>
        <div className="container">
          <button
            type="button"
            style={{marginBottom: "10px"}}
            className="alert button tiny float-right"
            onClick={() => {this.props.hardDelete()}}
          >
            Delete Archived
          </button>
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
                      onChange={(event) => this.setState({name: event.target.value})}
                    placeholder="Name" />
                  </td>
                  <td>
                    <input type="text"
                      value={this.state.description}
                      onChange={(event) => this.setState({description: event.target.value})}
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      className="button cell"
                      value="Create New Organization"
                    />
                  </td>
                </tr>
                { this.props.organizations.map(this.renderOrganization.bind(this)) }
              </tbody>
            </table>
          </form>
        </div>
      </main>
    )
  }
}

const mapStateToProps = ({ currentUser, organizations, currentOrganization }) => ({
  organizations,
  currentUser,
  currentOrganization,
  isSuperAdmin: currentUser && currentUser.roles.includes("super-admin"),
})

export default connect(mapStateToProps, {
  fetchOrganizations,
  hardDelete,
  deleteOrganization,
  reviveOrganization,
  createOrganization,
  push
})(OrganizationsContainer)
