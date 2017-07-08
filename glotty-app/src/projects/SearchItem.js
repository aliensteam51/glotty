import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import searchEntries from '../actions/entries/fetch'
import updateQuery from '../actions/entries/search'

export class SearchItem extends PureComponent {

  textSearch = (event) => {
    const query = event.target.value
    if (query.length > 0 && query.length < 3) return
    this.props.updateQuery(query)
    this.props.searchEntries(this.props.currentProject._id, query)
  }

  render() {
    return (
    <form>
      <div className="grid-container">
        <div className="grid-x grid-padding-x">
          <div>
            <label htmlFor="middle-label" className="text-left middle">Search Entry</label>
          </div>
          <div className="medium-2 cell">
            <input
              id="middle-label"
              type="search"
              placeholder="Search entries..."
              required
              onChange={this.textSearch}
              onKeyUp={this.textSearch}/>
          </div>
        </div>
      </div>
    </form>
    )
  }
}

const mapStateToProps = ({ currentProject, searchQuery }) => ({ currentProject, searchQuery })

export default connect(mapStateToProps, { searchEntries, updateQuery })(SearchItem)
