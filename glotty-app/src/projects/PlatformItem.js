/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import TranslationItem from "./TranslationItem"
import deletePlatform from '../actions/translations/delete'


export class PlatformItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      keyId: this.props.keyId
    }
  }

  renderTranslations(translation, index) {
    return (
      <TranslationItem key={index} {...translation} />
    )
  }

  handleChange(event) {
    this.setState({keyId: event.target.value})
  }


  render() {
    const {platformCode, translations, style, _id, entryId} = this.props
    return (
      <tr style={style}>
        <td className="text-center">
          <button
            className="button tinyer alert"
            onClick={() => {if(confirm('Delete the item?')) {this.props.deletePlatform(entryId, _id)}}}>
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
                value={this.state.keyId}
                onChange={this.handleChange.bind(this)}
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

export default connect(mapStateToProps, {deletePlatform})(PlatformItem)
