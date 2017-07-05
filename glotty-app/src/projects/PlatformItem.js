/*global event*/
/*eslint no-restricted-globals: ["warn", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TranslationItem from "./TranslationItem"
export class PlatformItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      key: ""
    }
  }

  renderTranslations(translation, index) {
    return (
      <TranslationItem key={index} {...translation} />
    )
  }

  render() {
    const {platformCode, translations, style} = this.props
    console.log(this.props)
    return (
      <tr style={style}>
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
              <label
                htmlFor="middle-label"
                className="text-left middle">Key
              </label>
            </div>
            <div className="cell small-11">
              <input
                type="text"
                id="middle-label"
                placeholder="Trans Key"/>
            </div>
          </div>
          { translations.map(this.renderTranslations.bind(this)) }
        </td>
      </tr>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps)(PlatformItem)
