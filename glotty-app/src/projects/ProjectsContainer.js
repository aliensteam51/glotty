import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'

export class ProjectsContainer extends PureComponent {

  // componentWillMount() {
  //   const { fetchProjects } = this.props
  //   fetchProjects()
  // }

  render() {
    return (
      <main className="container">
        <Link to="#">
          <h1>Project Container</h1>
        </Link>
      </main>
    )
  }
}

const mapStateToProps = ({currentUser }) => ({
  currentUser,
})

export default connect(mapStateToProps, {
  // fetchProjects,
  push
})(ProjectsContainer)
