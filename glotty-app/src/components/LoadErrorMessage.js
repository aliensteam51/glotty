import React, { Component } from 'react'
import { connect } from 'react-redux'
import clearError from '../actions/loading'

class LoadErrorMessage extends Component {

  state = { open: false }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
    this.props.clearError()
  }

  componentWillMount() {
    if (this.props.error) {
      this.setState({ open: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps

    this.setState({
      open: error,
    })
    setTimeout(function(){
      this.setState({ open: false })
      this.props.clearError()
    }.bind(this), 3000)
  }

  render() {
    const { error, message } = this.props
    const { open } = this.state
    if (!error) return null

    return (
      <div className={open ? "alert-box" : "hide"}>
        {message}
        <button
          className="close"
          onClick={this.handleRequestClose}
        >
          &times;
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ loadError }) => ({
  error: !!loadError,
  message: loadError || '',
})

export default connect(mapStateToProps, { clearError })(LoadErrorMessage)
