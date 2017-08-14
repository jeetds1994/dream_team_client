import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ClubContainer from './containers/ClubContainer'
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' component={Nav} />
        <Route path='/clubs' component={ClubContainer} />
      </div>
    )
  }
}

export default App
