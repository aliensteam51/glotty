import React, { Component } from 'react'
import Navigation from './components/Navigation'
import LoadErrorMessage from './components/LoadErrorMessage'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navigation />
        </header>
        <LoadErrorMessage />
        { this.props.children }
        <footer></footer>
      </div>
    )
  }
}

export default App
