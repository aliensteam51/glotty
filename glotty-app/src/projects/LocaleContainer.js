/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import addLocale from '../actions/projects/add-locale'
import deleteLocale from '../actions/locales/delete'

import './LocaleContainer.css'

export class LocaleContainer extends PureComponent {
  state = {
    focus: false,
    search: '',
    selected: {},
    display: [],
  }

  submitForm(event) {
    event.preventDefault()
    const { projectId, localeCodes, addLocale } = this.props
    const data = {
      localeCodes: localeCodes,
      addLocale: this.state.selected.code
    }
    this.setState({ search: '', selected: {}, display: [] })
    addLocale(projectId, data)
  }

  focus() {
    const { localeCodes, locales } = this.props
    if (this.state.display.length === 0) this.setState({ display: locales.filter(lc => !localeCodes.includes(lc.code)).slice(0, 10)})
    this.setState({ focus: true })
  }

  async blur() {
    await sleep(200)
    this.setState({ focus: false })
  }

  updateSearch(event) {
    const { localeCodes, locales } = this.props
    const search = new RegExp('.*' + event.target.value.toLowerCase().replace(/\W+/gi, '.*') + '.*')
    const filtered = locales.filter((locale) => (
      (!localeCodes.includes(locale.code)) &&
      ((!!locale.code && search.test(locale.code.toLowerCase())) ||
      (!!locale.name && search.test(locale.name.toLowerCase())))
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

  deleteLocale(localeCode) {
    const { localeCodes, projectId, deleteLocale } = this.props
    if(confirm('Delete the locale?')) deleteLocale(projectId, { localeCodes, deleteLocale: localeCode })
  }

  render() {
    const { locales, projectLocales } = this.props

    if (!locales || !projectLocales) return null
    return(
      <div className="container">
        <h2>Locales</h2>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="grid-container">
            <div className="grid-x grid-padding-x">
              <div>
                <label htmlFor="middle-label" className="text-left middle">Add Locale to Project</label>
              </div>
              <div className="medium-4 cell">
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

        { projectLocales.length === 0 ? null:

        <div>
        <h5>Supported locales:</h5>
        <table>
          <thead>
            <tr>
              <th width="5%">Select</th>
              <th width="20%">Code</th>
              <th width="70%">Name</th>
              <th width="5%"></th>
            </tr>
          </thead>
          <tbody>
            {projectLocales.map((locale, index) => {
              return (
                <tr key={locale.code}>
                <td className='text-center'><input type='checkbox' onChange={this.toggleCheckbox.bind(this)} value={locale.code} /></td>
                <td>{locale.code}</td>
                <td>{locale.name}</td>
                <td>
                  <button
                    className="button tiny alert"
                    onClick={this.deleteLocale.bind(this, locale.code)}>
                    X
                  </button>
                </td>
                </tr>
              )})}
            </tbody>
        </table>
        </div>
        }

      </div>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mapStateToProps = ({ locales }) => ({ locales })

export default connect(mapStateToProps, { addLocale, deleteLocale })(LocaleContainer)
