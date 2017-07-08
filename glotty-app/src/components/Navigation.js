// src/components/Navigation.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import signOut from '../actions/users/sign-out'
import "./Navigation.css"

class Navigation extends PureComponent {

  render() {
    const { signedIn } = this.props
    return (
      <div className="top-bar grid-container">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">
              <Link to="/">Glotty</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              { signedIn ?
                <Link to="/sign-in" onClick={() => {this.props.signOut()}}>Sign Out</Link> :
                <Link to="/sign-in">Sign In</Link>
              }
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
