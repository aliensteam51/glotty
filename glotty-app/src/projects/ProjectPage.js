import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SaveFile from '../exports/SaveFile'
import getProject from '../actions/projects/get'
import fetchEntries from '../actions/entries/fetch'
import createEntry from '../actions/entries/create'

import SearchItem from './SearchItem'
import EntryItem from './EntryItem'
import LocaleContainer from './LocaleContainer'

import './ProjectPage.css'

export class ProjectPage extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      group: '',
      tags: [],
      selectedLocales: [],
      filterText: '',
      searchTerm: '',
      entries: props.entries
    }

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this)
    this.handleSearchTermInputChange = this.handleSearchTermInputChange.bind(this)
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

  selectLocale(localeCode) {
    this.setState({ selectedLocales: this.state.selectedLocales.concat(localeCode) })
  }

  deselectLocale(localeCode) {
    this.setState({ selectedLocales: this.state.selectedLocales.filter((locale) => locale !== localeCode)})
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    })
  }

  handleSearchTermInputChange(searchTerm) {
    this.setState({
      searchTerm: searchTerm
    })
  }

  searchEntries(event) {
    event.preventDefault()
    const { entries } = this.props
    this.setState({ entries })
    const { filterText, searchTerm } = this.state
    let filterdEntries

    switch(searchTerm) {
      case "Name" :
        filterdEntries = entries.filter((entry)=>  entry.name.toLowerCase().includes(filterText.toLowerCase()))
        break
      case "Group" :
        filterdEntries = entries.filter((entry)=>  entry.group.toLowerCase().includes(filterText.toLowerCase()))
        break
      case "Tag" :
        filterdEntries = entries.filter((entry)=>
          entry.tags.filter((tag)=>
            -1 !== tag.toLowerCase().indexOf(filterText.toLowerCase())
          ).length > 0
        )
        break
      default :
        filterdEntries = entries
    }

    if(filterText === '') filterdEntries = entries

    this.setState({ entries: filterdEntries })
  }

  renderEntries(entry, index) {
    return (
      <EntryItem key={index} {...entry} selectedLocales={this.state.selectedLocales} locales={this.props.currentProject.localeCodes} />
    )
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value})
  }

  handleGroupChange(event) {
    this.setState({group: event.target.value})
  }

  handleTagsChange(event) {
    this.setState({tags: event.target.value})
  }

  handleSubmit(event) {
    const {
      name,
      description,
      group,
      tags,
    } = this.state

    const {localeCodes} = this.props.currentProject
    console.log(localeCodes)
    const entry = {
      projectId: this.props.currentProject._id,
      name,
      description,
      group,
      platforms: [{translations:
        localeCodes.map((l) => ({localeCode: l }))
      }],
      tags: tags.split(/\W+/),
    }
      console.log(entry)
      this.props.createEntry(entry)
      event.preventDefault()
  }

  render() {
    const { currentProject } = this.props
    const { entries } = this.state
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

        <SearchItem
          filterText={this.state.filterText}
          searchTerm={this.state.searchTerm}
          onFilterTextInput={this.handleFilterTextInput.bind(this)}
          onSearchTermInput={this.handleSearchTermInputChange.bind(this)}
          searchEntries={this.searchEntries.bind(this)}
        />

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
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleNameChange.bind(this)} />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange.bind(this)} />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Group"
                  value={this.state.group}
                  onChange={this.handleGroupChange.bind(this)} />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Tags"
                  value={this.state.tags}
                  onChange={this.handleTagsChange.bind(this)} />
              </td>
              <td>
                <input
                 type="submit"
                 className="button cell"
                 value="Add Entry"
                 onClick={this.handleSubmit.bind(this)}/>
               </td>
            </tr>
          </tbody>
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
  createEntry,
  // subscribeToEntries,
  push
})(ProjectPage)
