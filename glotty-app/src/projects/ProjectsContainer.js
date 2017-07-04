import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import { Link } from 'react-router'
import fetchProjects from '../actions/projects/fetch'
import createProjects from '../actions/projects/create'

export class ProjectsContainer extends PureComponent {

  constructor(props) {
      super(props)
      this.state = {
        name: '',
        organisationId: '',
        description: ''
      }
    }

  componentWillMount() {
    const { fetchProjects } = this.props
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
      organisationId,
    } = this.state

    const project = {
      name,
      description,
      organisationId,
    }
      this.props.createProjects(project)
      console.log(project)
      event.preventDefault()
  }

  renderProject(project, index) {
    return <li key={index}>{project.name}: {project.description}</li>
  }

  render() {
    return (
      <main className="container">
          <h1 className="text-center">Organisation Name</h1>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="medium-4 columns">
              <input type="text"
                value={this.state.value}
                onChange={this.handleNameChange.bind(this)}
                placeholder="Name of the Project" />
            </div>
            <div className="medium-6 columns">
              <input type="text"
                value={this.state.value}
                onChange={this.handleDescritpionChange.bind(this)}
                placeholder="Description" />
            </div>
            <div className="medium-2 columns">
              <input type="submit" className="button" value="Submit" />
            </div>
          </div>
        </form>
        
        <div className="projects row">
          <ul>
            { this.props.projects.map(this.renderProject) }
          </ul>
        </div>

      </main>
    )
  }
}

const mapStateToProps = ({currentUser, projects }) => ({
  projects,
  currentUser,
})

export default connect(mapStateToProps, {
  fetchProjects,
  createProjects,
  push
})(ProjectsContainer)
