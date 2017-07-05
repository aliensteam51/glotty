/*global event*/
/*eslint no-restricted-globals: ["warn", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import deleteEntry from '../actions/entries/delete'
import deleteTranslation from '../actions/translations/delete'
import PlatformItem from './PlatformItem'

export class EntryItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      display: "none",
      hidden: true,
    }
  }

  renderPlatforms(platform, index) {
    return (
      <PlatformItem key={index} {...platform} style={{ display: this.state.display }} />
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
      </tbody>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps, {deleteEntry, deleteTranslation})(EntryItem)
