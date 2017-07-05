import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SaveFile from '../exports/SaveFile'
import getProject from '../actions/projects/get'
import fetchEntries from '../actions/entries/fetch'


// import { Link } from 'react-router'

export class ProjectPage extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {
      getProject,
      fetchEntries
    } = this.props
    const { projectId } = this.props.params
    getProject(projectId)
    fetchEntries(projectId)
  }

  render() {
    const { currentProject } = this.props
    if (!currentProject) return null
    return (
      <div className="grid-container single-project">
        <h1>{currentProject.name}</h1>
        <p>{currentProject.description}</p>
        <h1>Locales Component</h1>
        <h1>Entries Component</h1>
        <SaveFile />
      </div>
    )
  }
}

const mapStateToProps = ({currentUser, projects, currentProject}, {params}) => ({
  currentUser,
  currentProject,
})

export default connect(mapStateToProps, {
  getProject,
  fetchEntries,
  // subscribeToEntries,
  push
})(ProjectPage)
