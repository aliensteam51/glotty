import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import fetchLocales from '../actions/locales/search'

import './LocaleContainer.css'

export class LocaleContainer extends PureComponent {
  state = {
    focus: false,
    search: ''
  }

  componentWillMount() {
    this.props.fetchLocales(this.state.search)
  }

  submitForm(event) {
    event.preventDefault()
    console.log('Form submitted')
  }

  focus() {
    this.setState({ focus: true })
  }

  blur() {
    this.setState({ focus: false })
  }

  updateSearch(event) {
    this.setState({ search: event.target.value })
    this.props.fetchLocales(event.target.value)
    console.log(event.target.value)
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
          <input type="text" onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.updateSearch.bind(this)}/>
          <div className={this.classNames()}>
            {locales.map((option, index) => <p key={index}>{option.name}</p>)}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ locales }) => ({ locales })

export default connect(mapStateToProps, { fetchLocales })(LocaleContainer)
