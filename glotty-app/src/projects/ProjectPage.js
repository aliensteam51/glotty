import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SaveFile from '../exports/SaveFile'
import getProject from '../actions/projects/get'
import fetchEntries from '../actions/entries/fetch'

import SearchItem from './SearchItem'
import EntryItem from './EntryItem'
import LocaleContainer from './LocaleContainer'

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
    const { _id, localeCodes, platformCodes, locales } = this.props.currentProject
    return (

      <div className="grid-container single-project">
        <h1>{currentProject.name}</h1>
        <p>{currentProject.description}</p>

        <LocaleContainer
          projectId={_id}
          localeCodes={localeCodes}
          projectLocales={locales}
        />

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

        <SaveFile />

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
