import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'
import ClubContainer from './containers/ClubContainer'
import PlayerContainer from './containers/PlayerContainer'
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' component={Nav} />
        <Route exact path='/' component={HomeContainer} />
        <Route path='/clubs' component={ClubContainer} />
        <Route path='/players' component={PlayerContainer} />
      </div>
    )
  }
}

export default App
