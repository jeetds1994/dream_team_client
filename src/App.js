import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'
import ClubContainer from './containers/ClubContainer'
import PlayerContainer from './containers/PlayerContainer'
import Nav from './components/Nav'

const BASE_URL = process.env.REACT_APP_API

class App extends Component {

  state = {
    clubs: []
  }

  componentDidMount(){
    console.log('Nav just mounted')
    fetch(`${BASE_URL}/clubs?page=1`)
    .then(res => res.json())
    .then(clubs => this.setState({
      clubs: clubs
    }))
  }

  render() {
    return (
      <div>
        <Route path='/' render={(props)=> <Nav clubs={this.state.clubs} {...props} />} />
        <Route exact path='/' component={HomeContainer} />
        <Route path='/clubs' component={ClubContainer} />
        <Route path='/players' component={PlayerContainer} />
      </div>
    )
  }
}

export default App
