import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import getProject from '../actions/projects/get'
import fetchEntries from '../actions/entries/fetch'

import SearchItem from './SearchItem'
import EntryItem from './EntryItem'

import './ProjectPage.css'

export class ProjectPage extends PureComponent {

  componentWillMount() {
    const {
      getProject,
      fetchEntries
    } = this.props
    const { projectId } = this.props.params
    getProject(projectId)
    fetchEntries(projectId)
  }

  renderEntries(entry, index) {
    return (
      <EntryItem key={index} {...entry} />
    )
  }

  render() {
    const { currentProject, entries } = this.props
    if(!currentProject || !entries) return null
    return (

      <div className="grid-container single-project">
        <h1>{currentProject.name}</h1>
        <p>{currentProject.description}</p>

        <SearchItem />

        <table>
          <thead>
            <tr>
              <th width="5%"></th>
              <th width="20%">Name</th>
              <th width="25%">Description</th>
              <th width="25%">Group</th>
              <th width="20%">tags</th>
              <th width="5%"></th>
            </tr>
          </thead>
            { entries.map(this.renderEntries.bind(this)) }
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({currentUser, projects, currentProject, entries}, {params}) => ({
  currentUser,
  currentProject,
  entries,
})

export default connect(mapStateToProps, {
  getProject,
  fetchEntries,
  // subscribeToEntries,
  push
})(ProjectPage)
