import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import parseStrings from '../actions/imports/parse-strings'
import parseJson from '../actions/imports/parse-json'
import parseXml from '../actions/imports/parse-xml'

export class FileUploader extends PureComponent {
  state = {
    locale: "",
    type: "",
    text: "",
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
    const { parseStrings, parseJson, parseXml } = this.props
    if (this.state.text.length === 0) {
      console.error('File not loaded yet')
    } else {
      const locale = this.state.locale
      const text = this.state.text

      switch (this.state.type) {
        case 'strings':
          parseStrings(locale, text)
          break;

        case 'application/json':
          parseJson(locale, text)
          break;

        case 'text/xml':
          parseXml(locale, text)
          break;

        default:
          console.error('File type not supported')
      }
    }
  }

  render() {
    return (
      <div>
        <input type="text" className="locale-select" placeholder="Locale Selector" onChange={event => this.setState({ locale: event.target.value })} />
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
