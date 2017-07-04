import React, { Component } from 'react'

import Navigation from './components/Navigation'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navigation />
        </header>
          { this.props.children }
        <footer>
        </footer>
      </div>
    )
  }
}

export default App
