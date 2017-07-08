/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchProjects from '../actions/projects/fetch'
import createProjects from '../actions/projects/create'
import getOrganization from '../actions/organizations/get'
import deleteProject from '../actions/projects/delete'
import reviveProject from '../actions/projects/revive'


import './ProjectsContainer.css'

export class ProjectsContainer extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
    }
  }

  componentWillMount() {
    const { fetchProjects, getOrganization} = this.props
    const { organizationId } = this.props.params
    getOrganization(organizationId)
    fetchProjects(organizationId)
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
    } = this.state

    const {organizationId} = this.props.params

    const project = {
      name,
      description,
      organizationId,
    }
      this.props.createProjects(project)
      event.preventDefault()
  }

  renderProject(project, index) {
    const {organizationId} = this.props.params

    return (
    <tr key={index} className={project.deleted ? "deleted" : ""}>
        <td><span>{project.name}</span></td>
        <td><span>{project.description}</span></td>
          <td>
            { project.deleted ?
              <div className="expanded button-group">
                <button
                  className="primary button success"
                  onClick={() => {this.props.reviveProject(project._id)}}>
                  Revive
                </button>
              </div> :
            <div className="expanded button-group">
                <button
                  className="primary button"
                  onClick={() => { this.props.push("/" + organizationId  + "/" + project._id) }}
                  disabled={project.deleted}>
                  View
                </button>
              <button type="button"
                className="alert button"
                onClick={() => {this.props.deleteProject(project._id)}}
                disabled={project.deleted}>
                Delete
              </button>
            </div>
          }
          </td>
      </tr>
    )
  }

  render() {
    const {currentOrganization} = this.props
    if (!currentOrganization) return null
    return (
      <main className="grid-container projects">
        <h1>{currentOrganization.name}</h1>
        <p className="text-center">{currentOrganization.descirption}</p>
        <div className="container">
          <h2 className="text-center">Project List</h2>

          <table>
            <thead>
              <tr>
                <th width="16.66667%">Project Name</th>
                <th width="66.66667%">Project Description</th>
                <th width="16.66667%">Project Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text"
                  value={this.state.name}
                  onChange={this.handleNameChange.bind(this)}
                  placeholder="Name of the Project" />
                </td>
                <td>
                  <input type="text"
                  value={this.state.description}
                  onChange={this.handleDescritpionChange.bind(this)}
                  placeholder="Description" />
                </td>
                <td>
                  <input
                    type="submit"
                    className="button cell"
                    value="Create New Project"
                    onClick={this.handleSubmit.bind(this)}/>
                </td>
              </tr>
                { this.props.projects.map(this.renderProject.bind(this)) }
            </tbody>
          </table>
        </div>
      </main>
    )
  }
}

const mapStateToProps = ({currentUser, projects, currentOrganization }) => ({
  projects,
  currentUser,
  currentOrganization,
})

export default connect(mapStateToProps, {
  fetchProjects,
  deleteProject,
  getOrganization,
  createProjects,
  reviveProject,
  push
})(ProjectsContainer)
