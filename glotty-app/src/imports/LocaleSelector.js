import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import './LocaleSelector.css'

export class LocaleContainer extends PureComponent {
  state = {
    focus: false,
    search: '',
    selected: {},
    display: [],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.empty) this.setState({ search: '', selected: {} })
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
    this.props.setLocaleCode(option.code)
    this.setState({ search: `${option.name} (${option.code})`, selected: option })
  }

  classNames() {
    const classes = 'option-list'

    if (this.state.focus) return classes + ' focused'

    return classes
  }

  render() {
    return(
      <div className="locale-selector">
        <input
          type="text"
          placeholder="Select a locale to add"
          className='locale-select'
          onFocus={this.focus.bind(this)}
          onBlur={this.blur.bind(this)}
          onChange={this.updateSearch.bind(this)}
          value={this.state.search}
        />
        <div className={this.classNames()}>
          <div className="medium-10">
          {this.state.display.map((option, index) => <p key={index} onClick={this.selectLocale.bind(this, option)}>{`${option.name} (${option.code})`}</p>)}
          </div>
        </div>
      </div>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mapStateToProps = ({ locales }) => ({ locales })

export default connect(mapStateToProps, {})(LocaleContainer)
