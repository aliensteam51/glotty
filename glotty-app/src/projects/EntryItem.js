/*global event*/
/*eslint no-restricted-globals: ["off", "confirm"]*/
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import addPlatform from '../actions/platforms/add'
import deleteEntry from '../actions/entries/delete'
import PlatformItem from './PlatformItem'

const platformOptions = [
  {
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

    const newOptions = this.state.options.filter((pf) => (pf.code !== this.state.selectedPlatform))

    this.setOptions(newOptions)

    addPlatform(_id, data)
  }

  componentWillMount() {
    const { platforms } = this.props

    if (!platforms) return

    const platformCodes = platforms.map((platf) => (platf.platformCode))
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
    return (
      <PlatformItem
        key={index} {...platform}
        entryId={this.props._id}
        style={{ display: this.state.display }}
        selectedLocales={this.props.selectedLocales}/>
    )
  }

  render() {
    const {name, description, tags, group, deleted, platforms, _id} = this.props
    console.log(this.state.selectedPlatform.length)
    return (
      <tbody
        className={deleted ? "deleted" : ""}>
        <tr>
          <td className="text-center">
            { deleted ? null :
              <button
                className="button tiny alert"
                onClick={() => {if(confirm('Delete the item?')) {this.props.deleteEntry(_id)}}}>
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
              <button className="button tiny" onClick={() => {
                this.state.hidden ?
                this.setState({ display: "table-row", hidden: false }):
                this.setState({ display: "none", hidden: true }) }}>
                {this.state.hidden? "+": "-"}
              </button>
            }
          </td>
        </tr>

         { deleted ? (null) : platforms.map(this.renderPlatforms.bind(this)) }
         { deleted || this.state.selectedPlatform.length === 0 ? null :
         <tr style={{ display: this.state.display }}>
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

export default connect(mapStateToProps, { addPlatform, deleteEntry })(EntryItem)
