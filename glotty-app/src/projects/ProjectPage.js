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
      editProject: false,
    }
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
    event.preventDefault()
  }

  render() {
    const { currentProject, entries } = this.props
    if(!currentProject || !entries || !this.props.params) return null
    const { _id, localeCodes, locales } = this.props.currentProject
    return(
        <div className="grid-container single-project">
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

          <div className="project-nav">
            <button className="button" type="button" onClick={() => this.setState({ showReveal: false})} >
              <i className="fa fa-picture-o" aria-hidden="true"></i>
            </button>
          </div>

          { this.state.editProject ? <input value={currentProject.name}/> : <h1>{currentProject.name}</h1>}
          <p className="text-center">{currentProject.description}</p>
          
          <FileUploader projectId={_id} projectLocales={localeCodes} />

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

          <SaveFile />

        </div>

      )
  }
}

const mapStateToProps = ({ currentUser, projects, currentProject, entries, subscriptions }, { params }) => ({
  currentUser,
  currentProject,
  entries,
  subscribed: subscriptions.includes('entries'),
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
