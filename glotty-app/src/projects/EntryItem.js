import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export class EntryItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      display: "none",
      hidden: true,
    }
  }


  renderTranslations(translation, index) {
    return (
      <div key={index} className="grid-x">
        <div className="cell small-1">
          <label htmlFor="middle-label" className="text-left middle">{translation.localeCode}</label>
        </div>
        <div className="cell small-11">
          <input type="text" id="middle-label" placeholder="Right- and middle-aligned text input"/>
        </div>
      </div>
    )
  }

  renderPlatforms(platform, index) {
    const { platformCode, translations } = platform
    return (
      <tr key={index} style={{ display: this.state.display }}>
        <td className="text-center">
          <button
            className="button tinyer alert"
            onClick={() => {console.log("delete")}}>
            X
          </button>
        </td>
        <td className="text-center uppercase">{platformCode}</td>
        <td colSpan="4">
          <div className="grid-x">
            <div className="cell small-1">
              <label htmlFor="middle-label" className="text-left middle">Key</label>
            </div>
            <div className="cell small-11">
              <input
                type="text"
                id="middle-label"
                placeholder="Right- and middle-aligned text input"/>
            </div>
          </div>
          { translations.map(this.renderTranslations.bind(this)) }
        </td>
      </tr>
    )
  }

  render() {
    const {name, description, tags, group, deleted, platforms} = this.props
    return (
      <tbody
        className={deleted ? "deleted" : ""}>
        <tr>
          <td className="text-center">
            { deleted ? null :
              <button
                className="button tiny alert"
                onClick={() => {console.log("delete")}}>
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

export default connect(mapStateToProps)(EntryItem)
