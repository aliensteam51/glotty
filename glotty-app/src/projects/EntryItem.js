import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import addPlatform from '../actions/platforms/add'
import deleteEntry from '../actions/entries/delete'
import reviveEntry from '../actions/entries/revive'
import patchEntry from '../actions/entries/patch'

import PlatformItem from './PlatformItem'

const platformOptions = [{
    name: 'iOS',
    code: 'ios'
  },
  {
    name: 'Android',
    code: 'android'
  },
  {
    name: 'i18n',
    code: 'i18n'
  }
]

export class EntryItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      display: "none",
      hidden: true,
      selectedPlatform: '',
      options: [],
      edit: false,
      name: this.props.name,
      description: this.props.description,
      group: this.props.group,
      tags: this.props.tags,
    }
  }

  handlePlatformSelection(event) {
    this.setState({ selectedPlatform: event.target.value })
  }

  handlePlatformChoice(event) {
    event.preventDefault()
    const { _id, locales, platforms, addPlatform } = this.props
    const data = {
      locales: locales,
      platforms: platforms,
      addPlatform: this.state.selectedPlatform
    }

    addPlatform(_id, data)
  }

  editEntry(event) {
    event.preventDefault()
    const {
      name,
      description,
      group,
      tags,
    } = this.state

    const entry = {
      name,
      description,
      group,
      tags,
    }
    const entryId = this.props._id
    this.props.patchEntry(entryId, entry)
    this.setState({ edit: false})
  }

  componentWillMount() {
    const { platforms } = this.props

    if(!platforms) return

    const platformCodes = platforms.map((platf) => (platf.platformCode))
    const options = platformOptions.filter((platf) => (!platformCodes.includes(platf.code)))

    this.setOptions(options)
  }

  componentWillReceiveProps(nextProps) {
    const platformCodes = nextProps.platforms.map((platf) => (platf.platformCode))
    const options = platformOptions.filter((platf) => (!platformCodes.includes(platf.code)))

    this.setOptions(options)
  }

  setOptions(options) {
    this.setState({
      options: options,
      selectedPlatform: options.length === 0 ? '' : options[0].code
    })
  }

  renderPlatforms(platform, index) {
    return(
      <PlatformItem
        key={index} {...platform}
        entryId={this.props._id}
        hidden={this.state.hidden}
        selectedLocales={this.props.selectedLocales}/>
    )
  }

  render() {
    const { name, description, tags, group, deleted, platforms, _id} = this.props
    const { edit } = this.state
    return(
      <tbody
        className={deleted ? "deleted" : ""}>
        { edit ? <tr>
          <td></td>
          <td>
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={(event) => this.setState({name: event.target.value})}  />
          </td>
          <td>
            <textarea
              type="text"
              placeholder="Description"
              value={this.state.description}
              onChange={(event) => this.setState({description: event.target.value})}  />
          </td>
          <td>
            <input
              type="text"
              placeholder="Group"
              value={this.state.group}
              onChange={(event) => this.setState({group: event.target.value})}  />
          </td>
          <td>
            <input
              type="text"
              placeholder="Tags"
              value={this.state.tags}
              onChange={(event) => this.setState({tags: event.target.value})} />
          </td>
          <td className="text-center">
            <button
              className="button tiny"
              onClick={this.editEntry.bind(this)}>
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
            </button>
          </td>
        </tr>

        :

          <tr>
            <td className="text-center">
              { deleted ?
                <button
                  className="button tiny"
                  onClick={() => {this.props.reviveEntry(_id)}}>
                  O
                </button> :
                <button
                  className="button tiny alert"
                  onClick={() => {this.props.deleteEntry(_id)}}>
                  X
                </button>
              }
            </td>
            <td>{name}</td>
            <td>{description}</td>
            <td>{group}</td>
            <td>{tags.join(", ")}</td>
            <td className="text-center">
              { deleted ? null :
              <button className="button tiny" style={{marginRight: "2px"}} onClick={() => {
                this.state.hidden ?
                  this.setState({ hidden: false }):
                  this.setState({ hidden: true })}}>
                {this.state.hidden? "+": "-"}
              </button>
              }
              <button
                className="button tiny"
                onClick={() => this.setState({ edit: true})} >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        }
        <tr className={this.state.hidden ? "hide" : "show"}>
        </tr>
        { deleted ? (null) : platforms.map(this.renderPlatforms.bind(this)) }
        { deleted || this.state.selectedPlatform.length === 0 ? null :
        <tr className={this.state.hidden ? "hide" : "show"}>
          <td colSpan="4"></td>
          <td>
            <select value={this.state.selectedPlatform} onChange={this.handlePlatformSelection.bind(this)}>
              {this.state.options.map((opt, index) => (
                <option key={index} value={opt.code}>{opt.name}</option>
              ))}
            </select>
          </td>
          <td>
            <input
              type="submit"
              className="button tiny"
              value="Add Platform"
              onClick={this.handlePlatformChoice.bind(this)}/>
          </td>
        </tr>
        }
      </tbody>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
})

export default connect(mapStateToProps, {
  addPlatform,
  deleteEntry,
  reviveEntry,
  patchEntry
})(EntryItem)
