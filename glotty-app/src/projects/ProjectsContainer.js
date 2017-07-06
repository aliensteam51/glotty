/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchProjects from '../actions/projects/fetch'
import createProjects from '../actions/projects/create'
import getOrganization from '../actions/projects/get'
import deleteProject from '../actions/projects/delete'

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
    const { fetchProjects } = this.props
    // getOrganization(currentUser.organizationId)
    fetchProjects()
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

    const project = {
      name,
      description,
      organizationId,
    }
      this.props.createProjects(project)
      event.preventDefault()
  }

  renderProject(project, index) {
    return <tr key={index} className={project.deleted ? "deleted" : ""}>
        <td>{project.name}</td>
        <td>{project.description}</td>
        { project.deleted ?
          <td>
            <div className="expanded button-group">
              <button type="button" className="primary button" disabled>View</button>
              <button type="button" className="alert button" disabled>Delete</button>
            </div>
          </td>:
          <td>
            <div className="expanded button-group">
                <button
                  className="primary button"
                  onClick={() => { this.props.push("/projects/" + project._id) }}>
                  View
                </button>
              <button type="button"
                className="alert button"
                onClick={() => {if(confirm('Delete the item?')) {this.props.deleteProject(project._id)}}}>
                Delete
              </button>
            </div>


          </td>
        }
      </tr>
  }

  render() {
    if (!this.props.projects[0]) return null
    return (
      <main className="grid-container projects">
        <h1 className="text-center">Organization Name</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
                  value={this.state.value}
                  onChange={this.handleNameChange.bind(this)}
                  placeholder="Name of the Project" />
                </td>
                <td>
                  <input type="text"
                  value={this.state.value}
                  onChange={this.handleDescritpionChange.bind(this)}
                  placeholder="Description" />
                </td>
                <td>
                  <input type="submit" className="button cell" value="Create New Project" />
                </td>
              </tr>
                { this.props.projects.map(this.renderProject.bind(this)) }
            </tbody>
          </table>
        </form>

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
  push
})(ProjectsContainer)
