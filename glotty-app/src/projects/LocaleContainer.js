import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import fetchLocales from '../actions/locales/fetch'
import addLocale from '../actions/projects/add-locale'

import './LocaleContainer.css'

export class LocaleContainer extends PureComponent {
  state = {
    focus: false,
    search: '',
    selected: {},
    display: [],
  }

  componentWillMount() {
    this.props.fetchLocales()
  }

  submitForm(event) {
    event.preventDefault()
    const { projectId, localeCodes, addLocale } = this.props
    const data = {
      localeCodes: localeCodes,
      addLocale: this.state.selected.code
    }
    this.setState({ search: '', selected: {} })
    addLocale(projectId, data)
  }

  focus() {
    if (this.state.display.length === 0) this.setState({ display: this.props.locales.slice(0, 10)})
    this.setState({ focus: true })
  }

  async blur() {
    await sleep(200)
    this.setState({ focus: false })
  }

  updateSearch(event) {
    const search = new RegExp('.*' + event.target.value.toLowerCase().replace(/\W+/gi, '.*') + '.*')
    const filtered = this.props.locales.filter((locale) => (
      (!!locale.code && search.test(locale.code.toLowerCase())) ||
      (!!locale.name && search.test(locale.name.toLowerCase()))
    )).slice(0, 10)
    this.setState({ search: event.target.value, display: filtered })
  }

  selectLocale(option) {
    this.setState({ search: `${option.name} (${option.code})`, selected: option })
  }

  classNames() {
    const classes = 'option-list'

    if (this.state.focus) return classes + ' focused'

    return classes
  }

  toggleCheckbox(event) {
    if (event.target.checked) this.props.selectLocale(event.target.value)
    if (!event.target.checked) this.props.deselectLocale(event.target.value)
  }

  render() {
    const { locales, projectLocales } = this.props

    if (!locales || !projectLocales) return null

    return(
      <div className="container">
        <h2>Locales</h2>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="grid-container">
            <div className="grid-x">
              <div className="content-box medium-10">
                <input
                  type="text"
                  placeholder="Select a locale to add"
                  className='locale-select'
                  onFocus={this.focus.bind(this)}
                  onBlur={this.blur.bind(this)}
                  onChange={this.updateSearch.bind(this)}
                  value={this.state.search}/>
                  <div className={this.classNames()}>
                  <div className="medium-10">
                  {this.state.display.map((option, index) => <p key={index} onClick={this.selectLocale.bind(this, option)}>{`${option.name} (${option.code})`}</p>)}
                  </div>
                  </div>
              </div>
              <div className="medium-2">
                <button
                  className="primary button"
                  onClick={this.submitForm.bind(this)}>
                  Add locale
                </button>
              </div>
            </div>
          </div>
        </form>
        <h5>Supported locales:</h5>
        <table>
          <thead>
            <tr>
              <th width="5%">Select</th>
              <th width="20%">Code</th>
              <th width="75%">Name</th>
            </tr>
          </thead>
          <tbody>
            {projectLocales.map((locale, index) => {
              return (
                <tr key={index}>
                <td className='text-center'><input type='checkbox' onChange={this.toggleCheckbox.bind(this)} value={locale.code} /></td>
                <td>{locale.code}</td>
                <td>{locale.name}</td>
                </tr>
              )})}
            </tbody>
        </table>
      </div>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mapStateToProps = ({ locales }) => ({ locales })

export default connect(mapStateToProps, { fetchLocales, addLocale })(LocaleContainer)
