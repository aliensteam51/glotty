import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import { Link } from 'react-router'

export class ProjectPage extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const {
      // fetchEntries,
      // getProject,
    } = this.props
    // const { projectId } = this.props.params
    // getProject(projectId)
    // fetchEntries()
  }

  render() {
    console.log(this.props.params)
    return (
      <h1>Project Page</h1>
    )
  }
}

const mapStateToProps = ({currentUser, projects }, {params}) => ({
  project: projects.find(p => p._id.toString() === params.projectId.toString()),
  currentUser,
})

export default connect(mapStateToProps, {
  // getProject,
  // fetchEntries,
  // subscribeToEntries,
  push
})(ProjectPage)
