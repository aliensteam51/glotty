import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import searchEntries from '../actions/entries/fetch'
import updateQuery from '../actions/entries/search'

export class SearchItem extends PureComponent {

  componentWillUpdate(nextProps) {
    const query = nextProps.searchQuery
    const oldQuery = this.props.query
    const { currentProject } = this.props

    if (query !== oldQuery) {
      this.props.searchEntries(currentProject._id, query)
    }
  }

  textSearch = (event) => {
    const query = event.target.value
    if (query.length > 0 && query.length < 3) return
    this.props.updateQuery(query)
  }

  render() {
    return (
    <form>
      <div className="grid-container">
        <div className="grid-x">
          <div className="medium-2 cell">
            <input
              type="search"
              placeholder="Search entries..."
              required
              onChange={this.textSearch}
              onKeyUp={this.textSearch}
              fullWidth={true}
            />
          </div>
        </div>
      </div>
    </form>
    )
  }
}

const mapStateToProps = ({ currentProject, searchQuery }) => ({ currentProject, searchQuery })

export default connect(mapStateToProps, { searchEntries, updateQuery })(SearchItem)
