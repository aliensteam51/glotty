import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import parseStrings from '../actions/imports/parse-strings'
import parseJson from '../actions/imports/parse-json'
import parseXml from '../actions/imports/parse-xml'

import LocaleSelector from './LocaleSelector'

export class FileUploader extends PureComponent {
  state = {
    localeCode: "",
    type: "",
    text: "",
    empty: false,
  }

  handleUploadFile(event) {
    const file = event.target.files[0]
    if (file.name.substr(-8) === '.strings') {
      this.setState({ type: 'strings' })
    } else {
      this.setState({ type: file.type })
    }
    const reader = new FileReader()
    reader.readAsText(file)
    reader.addEventListener('loadend', () => {
      this.setState({ text: reader.result })
    })
  }

  submitForm() {
    const { parseStrings, parseJson, parseXml, projectId, projectLocales } = this.props
    if (this.state.text.length === 0) {
      console.error('File not loaded yet')
    } else if (this.state.localeCode.length === 0) {
      console.error('No locale selected')
    } else {
      const localeCode = this.state.localeCode
      const text = this.state.text

      switch (this.state.type) {
        case 'strings':
          parseStrings(localeCode, text, projectId, projectLocales)
          break;

        case 'application/json':
          parseJson(localeCode, text, projectId, projectLocales)
          break;

        case 'text/xml':
          parseXml(localeCode, text, projectId, projectLocales)
          break;

        default:
          console.error('File type not supported')
      }
    }
    this.setState({ empty: true })
  }

  setLocaleCode(localeCode) {
    this.setState({ empty: false })
    this.setState({ localeCode: localeCode})
  }

  render() {
    return (
      <div>
        <h2>Import Files</h2>
        <LocaleSelector localeCodes={this.props.projectLocales} setLocaleCode={this.setLocaleCode.bind(this)} empty={this.state.empty} />
        <br/>
        <input type="file" onChange={this.handleUploadFile.bind(this)} />
        <button
          className="primary button"
          onClick={this.submitForm.bind(this)}>
          Import file
        </button>
      </div>
    )
  }
}

export default connect(null, { parseStrings, parseJson, parseXml })(FileUploader)
