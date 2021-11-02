import React, { Component } from 'react'

import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <Footer />
      </div >
    )
  }
}

export default App;