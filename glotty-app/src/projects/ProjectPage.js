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
  state = {
    selectedLocales: []
  }

  componentWillMount() {
    const {
      getProject,
      fetchEntries
    } = this.props
    const { projectId } = this.props.params
    getProject(projectId)
    fetchEntries()
  }

  selectLocale(localeCode) {
    this.setState({ selectedLocales: this.state.selectedLocales.concat(localeCode) })
  }

  deselectLocale(localeCode) {
    this.setState({ selectedLocales: this.state.selectedLocales.filter((locale) => locale !== localeCode)})
  }

  // componentWillUnMount() {
  //   const {
  //     getProject,
  //     fetchEntries
  //   } = this.props
  //   getProject()
  //   fetchEntries()
  // }

  renderEntries(entry, index) {
    return (
      <EntryItem key={index} {...entry} selectedLocales={this.state.selectedLocales} locales={this.props.currentProject.localeCodes} />
    )
  }

  render() {
    const { currentProject, entries } = this.props
    if(!currentProject || !entries) return null
    const { _id, localeCodes, locales } = this.props.currentProject

    return (

      <div className="grid-container single-project">
        <h1>{currentProject.name}</h1>
        <p>{currentProject.description}</p>

        <LocaleContainer
          projectId={_id}
          localeCodes={localeCodes}
          projectLocales={locales}
          selectLocale={this.selectLocale.bind(this)}
          deselectLocale={this.deselectLocale.bind(this)}
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
