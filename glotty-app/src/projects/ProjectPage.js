import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SaveFile from '../exports/SaveFile'
import getProject from '../actions/projects/get'
import fetchEntries from '../actions/entries/fetch'
import createEntry from '../actions/entries/create'
import hardDelete from '../actions/entries/hard-delete'
import subscribeToEntries from '../actions/entries/subscribe'
import fetchLocales from '../actions/locales/fetch'
// import { Link } from 'react-router'

import SearchItem from './SearchItem'
import EntryItem from './EntryItem'
import LocaleContainer from './LocaleContainer'
import FileUploader from '../imports/FileUploader'

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
      showReveal: true,
      showImportReveal: true,
      showExportReveal: true,
      editProject: false,
    }
  }

  initializeState() {
    this.setState({
      name: '',
      description: '',
      group: '',
      tags: []
    })
  }

  componentWillMount() {
    const {
      getProject,
      fetchEntries,
      subscribeToEntries,
      fetchLocales
    } = this.props

    const { projectId } = this.props.params
    const { subscribed } = this.props

    fetchLocales()
    fetchEntries(projectId)
    getProject(projectId)
    if (!subscribed) subscribeToEntries()
  }

  selectLocale(localeCode) {
    this.setState({ selectedLocales: this.state.selectedLocales.concat(localeCode) })
  }

  deselectLocale(localeCode) {
    this.setState({ selectedLocales: this.state.selectedLocales.filter((locale) => locale !== localeCode) })
  }

  renderEntries(entry, index) {
    return(
      <EntryItem
        key={entry._id} {...entry}
        selectedLocales={this.state.selectedLocales}
        locales={this.props.currentProject.localeCodes} />
    )
  }

  handleSubmit(event) {
    const {
      name,
      description,
      group,
      tags,
    } = this.state

    const { localeCodes } = this.props.currentProject
    const entry = {
      projectId: this.props.currentProject._id,
      name,
      description,
      group,
      platforms: [{
        translations: localeCodes.map((l) => ({ localeCode: l }))
      }],
      tags: tags.split(/\W+/),
    }
    this.props.createEntry(entry)
    this.initializeState()
    event.preventDefault()
  }

  render() {
    const { currentProject,
      entries,
      // currentUser,
      // isSuperAdmin
    } = this.props
    if(!currentProject || !entries || !this.props.params) return null
    const { _id, localeCodes, locales } = this.props.currentProject
    console.log(this.props)

    return(
        <div className="grid-container single-project">

          {/* <div aria-label="You are here:" role="navigation">
            <ul className="breadcrumbs">
              { isSuperAdmin ?
            <li>
            <Link to="/organizations">Organizations</Link>
            </li> : null }
              <li>
            <Link to="/organizations">{currentUser.organization.name}</Link>
              </li>
              <li>
            <span className="show-for-sr">Current: </span> {currentProject.name}
              </li>
            </ul>
          </div> */}

          <div className="project-nav show-for-large">
            <button title="Show Picture" className="button" type="button" onClick={() => this.setState({ showReveal: false})} >
              <i className="fa fa-picture-o" aria-hidden="true"></i>
            </button>
            <button title="import Locale File" className="button" type="button" onClick={() => this.setState({ showImportReveal: false})} >
              <i className="fa fa-upload" aria-hidden="true"></i>
            </button>
            <button title="Export Locale File" className="button" type="button" onClick={() => this.setState({ showExportReveal: false})} >
              <i className="fa fa-download" aria-hidden="true"></i>
            </button>
          </div>

          <div className="reveal-overlay" style={this.state.showReveal ? {display: "none"} : {display: "block"}}>
            <div className="reveal large" style={this.state.showReveal ? {display: "none"} : {display: "block"}}>
              <img src={require('../img/example.png')} alt="example-img" />
              <button
                className="close-button"
                type="button"
                onClick={() => this.setState({ showReveal: true})}
              >
                <span>&times;</span>
              </button>
            </div>
          </div>

          <div className="reveal-overlay" style={this.state.showImportReveal ? {display: "none"} : {display: "block"}}>
            <div className="reveal medium import-reveal" style={this.state.showImportReveal ? {display: "none"} : {display: "block"}}>
              <FileUploader projectId={_id} projectLocales={localeCodes} />

              <button
                className="close-button"
                type="button"
                onClick={() => this.setState({ showImportReveal: true})}
              >
                <span>&times;</span>
              </button>
            </div>
          </div>

          <div className="reveal-overlay" style={this.state.showExportReveal ? {display: "none"} : {display: "block"}}>
            <div className="reveal medium" style={this.state.showExportReveal ? {display: "none"} : {display: "block"}}>
              <SaveFile />

              <button
                className="close-button"
                type="button"
                onClick={() => this.setState({ showExportReveal: true})}
              >
                <span>&times;</span>
              </button>
            </div>
          </div>

          { this.state.editProject ? <input value={currentProject.name}/> : <h1>{currentProject.name}</h1>}
          <p className="text-center">{currentProject.description}</p>

          <LocaleContainer
            projectId={_id}
            localeCodes={localeCodes}
            projectLocales={locales}
            selectLocale={this.selectLocale.bind(this)}
            deselectLocale={this.deselectLocale.bind(this)}
          />

          <div className="container" style={{paddingBottom: "50px"}}>
            <h2>Entries</h2>
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
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={(event) => this.setState({name: event.target.value})}  />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      placeholder="Description"
                      value={this.state.description}
                      onChange={(event) => this.setState({description: event.target.value})}  />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Group"
                      value={this.state.group}
                      onChange={(event) => this.setState({group: event.target.value})}  />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Tags"
                      value={this.state.tags}
                      onChange={(event) => this.setState({tags: event.target.value})} />
                  </td>
                  <td>
                    <input
                      type="submit"
                      className="button "
                      value="Submit"
                      onClick={this.handleSubmit.bind(this)}/>
                  </td>
                </tr>
              </tbody>
              { entries.map(this.renderEntries.bind(this)) }
            </table>

            {this.props.currentUser.roles.includes("super-admin" || "admin") ?
              <button
                type="button"
                style={{marginTop: "10px"}}
                className="alert button tiny float-right"
                onClick={() => {this.props.hardDelete()}}
              >
                Delete Archived
              </button>
            : null}
          </div>

        </div>

      )
  }
}

const mapStateToProps = ({ currentUser, projects, currentProject, entries, subscriptions }, { params }) => ({
  currentUser,
  currentProject,
  entries,
  subscribed: subscriptions.includes('entries'),
  isSuperAdmin: currentUser && currentUser.roles.includes("super-admin"),
})

export default connect(mapStateToProps, {
  getProject,
  fetchEntries,
  createEntry,
  hardDelete,
  subscribeToEntries,
  push,
  fetchLocales
})(ProjectPage)
