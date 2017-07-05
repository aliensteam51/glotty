/*global event*/
/*eslint no-restricted-globals: ["warn", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

export class TranslationItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      translation: ""
    }
  }

  render() {
    const {localeCode} = this.props
    return (
      <div className="grid-x">
        <div className="cell small-1">
          <label htmlFor="translation-label" className="text-left middle">{localeCode}</label>
        </div>
        <div className="cell small-11">
          <input
            type="text"
            id="translation-label"
            placeholder="Right- and middle-aligned text input"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
})

export default connect(mapStateToProps)(TranslationItem)
