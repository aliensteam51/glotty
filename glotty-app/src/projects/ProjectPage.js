import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import getProject from '../actions/projects/get'
import fetchEntries from '../actions/entries/fetch'

import EntryItem from './EntryItem'

// import { Link } from 'react-router'

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

        <h1>LOCALES</h1>

        <h1>Entries</h1>

        <form>
          <div className="grid-container">
            <div className="grid-x">
              <div className="medium-2 cell">
                <input type="search" placeholder="Search" required/>
              </div>
              <div className="cell auto">
                <fieldset>
                 <input type="radio" name="searchTerm" value="Name" id="searchName" required/><label htmlFor="searchName" className="middle">Name</label>
                 <input type="radio" name="searchTerm" value="Group" id="searchGroup"/><label htmlFor="searchGroup" className="middle">Group</label>
                 <input type="radio" name="searchTerm" value="Tag" id="searchTag"/><label htmlFor="searchTag" className="middle">Tag</label>
                 <input type="submit" className="button" value="Search" />
               </fieldset>
             </div>
            </div>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th width="25%">Name</th>
              <th width="25%">Description</th>
              <th width="25%">Group</th>
              <th width="25%">tags</th>
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
