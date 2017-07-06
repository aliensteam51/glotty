import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchEntries from '../actions/entries/fetch'
import generateIos from './ios'
import generateAndroid from './android'
import generateI18n from './i18n'

export class SaveFile extends PureComponent {

  constructor(props) {
    super()

    this.state = {
      selectedPlatform: 'ios',
      selectedLanguage: props.currentProject.localeCodes[0],
    }
  }

  renderSelectLangauges() {
    const { currentProject } = this.props
    const { localeCodes } = currentProject
    let index = 0
    return localeCodes.map((locCode) => <option key={index++} value={locCode}>{locCode}</option> )
  }

  handleSelectPlatform(e){
    this.setState({ selectedPlatform: e.target.value })
  }

  handleSelectLanguage(e){
    this.setState({ selectedLanguage: e.target.value })
  }

  generateString() {
    const { entries } = this.props
    const { selectedLanguage, selectedPlatform } = this.state
    let outputString = ""

    switch(selectedPlatform) {
      case "ios":
        return outputString = generateIos(entries, selectedLanguage)

      case "i18n":
        return outputString = generateI18n(entries, selectedLanguage)

      case "android":
        return outputString = generateAndroid(entries, selectedLanguage)

      default :
        return outputString
    }
  }

  generateFile() {
    const { currentProject } = this.props
    const { name } = currentProject
    const { selectedLanguage, selectedPlatform } = this.state

    let filetype = "strings"
    if (selectedPlatform === 'android') filetype = "xml"
    if (selectedPlatform === 'i18n') filetype = "json"

    const filename = name.replace(/\s+/g, '') + "_" + selectedLanguage + `.${filetype}`
    const data = this.generateString()

    const file = new Blob([data], {type: 'text/plain'})

    if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename) //for internet explorer

    else { // all other browsers
        var a = document.createElement("a"),
        url = URL.createObjectURL(file)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        }, 0)
    }
  }

  render() {
    if (!this.props.entries[0]) return null
    return (
      <div>
        <h3>Generate your file here:</h3>
        <label>Select a Language
          <select value={this.state.selectedLanguage} onChange={this.handleSelectLanguage.bind(this)}>
            {this.renderSelectLangauges()}
          </select>
        </label>
        <label>Select a platform
          <select value={this.state.selectedPlatform} onChange={this.handleSelectPlatform.bind(this)} >
            <option value="ios">iOS</option>
            <option value="android">Android</option>
            <option value="i18n">i18n</option>
          </select>
        </label>
        <button type="button" onClick={this.generateFile.bind(this)} className="success button">Generate & Download</button>
      </div>
    )
  }
}

const mapStateToProps = ({ entries, currentProject }) => ({ entries, currentProject })

export default connect(mapStateToProps, { fetchEntries })(SaveFile)
