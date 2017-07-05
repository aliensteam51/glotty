import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export class SearchItem extends PureComponent {

  render() {
    return (
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
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps)(SearchItem)
