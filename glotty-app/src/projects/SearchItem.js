import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export class SearchItem extends PureComponent {

  constructor(props) {
    super(props)
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this)
    this.handleSearchTermInputChange = this.handleSearchTermInputChange.bind(this)
  }

  handleFilterTextInputChange(e) {
    e.preventDefault()
    this.props.onFilterTextInput(e.target.value)
  }

  handleSearchTermInputChange(e) {
    e.preventDefault()
    this.props.onSearchTermInput(e.target.value)
  }

  render() {
    return (
    <form>
      <div className="grid-container">
        <div className="grid-x">
          <div className="medium-2 cell">
            <input
              type="search"
              placeholder="Search"
              required
              value={this.props.filterText}
              onChange={this.handleFilterTextInputChange}
            />
          </div>
          <div className="cell auto">
            <fieldset>

              <input
                type="radio"
                name="searchTerm"
                value="Name"
                id="searchName"
                onChange={this.handleSearchTermInputChange}
              />
              <label htmlFor="searchName" className="middle">Name</label>

              <input
                type="radio"
                name="searchTerm"
                value="Group"
                id="searchGroup"
                onChange={this.handleSearchTermInputChange}
              />
              <label htmlFor="searchGroup" className="middle">Group</label>

              <input
                type="radio"
                name="searchTerm"
                value="Tag"
                id="searchTag"
                onChange={this.handleSearchTermInputChange}
              />
              <label htmlFor="searchTag" className="middle">Tag</label>

              <input
                type="submit"
                className="button"
                value="Search"
                onClick={this.props.searchEntries}
              />
           </fieldset>
         </div>
        </div>
      </div>
    </form>
    )
  }
}

const mapStateToProps = ({currentUser, entries}) => ({ currentUser, entries })

export default connect(mapStateToProps)(SearchItem)
