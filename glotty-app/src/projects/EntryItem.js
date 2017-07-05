import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// import { Link } from 'react-router'

export class EntryItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      display: "",
      show: false,
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
        <td className="text-center">{platformCode}</td>
        <td colSpan="3">
          <div className="grid-x">
            <div className="cell small-1">
              <label htmlFor="middle-label" className="text-left middle">Key</label>
            </div>
            <div className="cell small-11">
              <input type="text" id="middle-label" placeholder="Right- and middle-aligned text input"/>
            </div>
          </div>
          { translations.map(this.renderTranslations.bind(this)) }
        </td>
      </tr>
    )
  }

  render() {
    const {name, description, tags, group, deleted, platforms} = this.props
    console.log(platforms)
    return (
      <tbody
        className={deleted ? "deleted" : ""}>
        <tr onClick={() => {
          this.state.show ?
          this.setState({ display: "table-row", show: false }):
          this.setState({ display: "none", show: true }) }
        }>
          <td>{name}</td>
          <td>{description}</td>
          <td>{group}</td>
          <td>{tags}</td>
        </tr>
        { platforms.map(this.renderPlatforms.bind(this)) }
      </tbody>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps)(EntryItem)
