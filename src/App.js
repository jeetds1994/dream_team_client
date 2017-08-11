import React, { Component } from 'react'
import './App.css'
import ClubContainer from './containers/ClubContainer'
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <ClubContainer />
      </div>
    )
  }
}

export default App
