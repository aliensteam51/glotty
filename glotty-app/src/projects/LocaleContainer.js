import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import fetchLocales from '../actions/locales/search'

import './LocaleContainer.css'

export class LocaleContainer extends PureComponent {
  state = {
    focus: false,
    search: '',
    selected: {},
  }

  componentWillMount() {
    this.props.fetchLocales('')
  }

  submitForm(event) {
    event.preventDefault()
    console.log('Form submitted')
  }

  focus() {
    this.setState({ focus: true })
  }

  async blur() {
    await sleep(200)
    this.setState({ focus: false })
  }

  updateSearch(event) {
    this.setState({ search: event.target.value })
    const search = event.target.value.replace(/\W+/gi, '.*')
    this.props.fetchLocales(search)
  }

  selectLocale(option) {
    this.setState({ search: option.name, selected: option })
  }

  classNames() {
    const classes = 'option-list'

    if (this.state.focus) return classes + ' focused'

    return classes
  }

  render() {
    const { locales } = this.props

    if (!locales) return null

    return(
      <div className="container">
        <h2>Locales</h2>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="grid-container">
            <div className="medium-4 grid-x">
            <input
              type="text"
              className='locale-select'
              onFocus={this.focus.bind(this)}
              onBlur={this.blur.bind(this)}
              onChange={this.updateSearch.bind(this)}
              value={this.state.search}/>
            <div className={this.classNames()}>
            {locales.map((option, index) => <p key={index} onClick={this.selectLocale.bind(this, option)}>{option.name}</p>)}
            </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mapStateToProps = ({ locales }) => ({ locales })

export default connect(mapStateToProps, { fetchLocales })(LocaleContainer)
