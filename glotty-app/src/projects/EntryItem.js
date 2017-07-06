/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import addPlatform from '../actions/entries/add-platform'
import deleteEntry from '../actions/entries/delete'
import PlatformItem from './PlatformItem'

export class EntryItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      display: "none",
      hidden: true,
      selectedPlatform: 'ios',
    }
  }

  handlePlatformSelection(event) {
    this.setState({ selectedPlatform: event.target.value })
  }

  handlePlatformChoice(event) {
    event.preventDefault()
    const { _id, locales, platforms, addPlatform } = this.props
    const data = {
      locales: locales,
      platforms: platforms,
      addPlatform: this.state.selectedPlatform
    }
    addPlatform(_id, data)
  }

  renderPlatforms(platform, index) {
    return (
      <PlatformItem key={index} {...platform} entryId={this.props._id} style={{ display: this.state.display }} selectedLocales={this.props.selectedLocales} />
    )
  }

  render() {
    const {name, description, tags, group, deleted, platforms, _id} = this.props
    return (
      <tbody
        className={deleted ? "deleted" : ""}>
        <tr>
          <td className="text-center">
            { deleted ? null :
              <button
                className="button tiny alert"
                onClick={() => {if(confirm('Delete the item?')) {this.props.deleteEntry(_id)}}}>
                X
              </button>
            }
          </td>
          <td>{name}</td>
          <td>{description}</td>
          <td>{group}</td>
          <td>{tags}</td>
          <td className="text-center">
            { deleted ? null :
              <button className="button tiny" onClick={() => {
                this.state.hidden ?
                this.setState({ display: "table-row", hidden: false }):
                this.setState({ display: "none", hidden: true }) }}>
                {this.state.hidden? "+": "-"}
              </button>
            }
          </td>
        </tr>
        { deleted ? null : platforms.map(this.renderPlatforms.bind(this)) }
        <tr>
          <td colSpan="4"></td>
          <td>
            <select value={this.state.selectedPlatform} onChange={this.handlePlatformSelection.bind(this)}>
              <option value="ios">iOS</option>
              <option value="android">Android</option>
              <option value="i18n">i18n</option>
            </select>
          </td>
          <td>
            <input
              type="submit"
              className="button tiny"
              value="Add Platform"
              onClick={this.handlePlatformChoice.bind(this)}
            />
          </td>
        </tr>
         { deleted ? null : platforms.map(this.renderPlatforms.bind(this)) }
         <tr style={{ display: this.state.display }}>
           <td colSpan="4"></td>
           <td>
             <select value={this.state.selectedPlatform} onChange={this.handlePlatformSelection.bind(this)}>
              <option value="ios">iOS</option>
              <option value="android">Android</option>
              <option value="i18n">i18n</option>
            </select>
           </td>
           <td>
             <input
               type="submit"
               className="button tiny"
               value="Add Platform"
               onClick={this.handlePlatformChoice.bind(this)}
            />
           </td>
         </tr>
      </tbody>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
})

export default connect(mapStateToProps, { addPlatform, deleteEntry })(EntryItem)
