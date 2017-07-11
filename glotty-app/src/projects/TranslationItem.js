/*global event*/
/*eslint no-restricted-globals: ["warn", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import updateTranslation from '../actions/translations/update'

export class TranslationItem extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      translation: this.props.translation
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ translation: nextProps.translation })
  }

  handleChange(event) {
    this.setState({translation: event.target.value})
  }

  handleBlur(event) {
    const { updateTranslation, entryId, localeCode, platformCode } = this.props
    updateTranslation(entryId, {
      platformCode,
      localeCode,
      updatedTranslation: event.target.value
    })
  }

  render() {
    const {localeCode, isDeleted} = this.props
    return (
      <div className="grid-x">
        <div className="cell small-1">
          <label htmlFor="translation-label" className="text-left middle">{localeCode}</label>
        </div>
        <div className="cell small-11">
          <textarea
            type="text"
            id="translation-label"
            value={this.state.translation}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            placeholder="Translation"
            disabled={isDeleted}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
})

export default connect(mapStateToProps, { updateTranslation })(TranslationItem)
