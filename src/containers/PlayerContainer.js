import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PlayerList from '../components/PlayerList'
import Player from '../components/Player'


const BASE_URL = process.env.REACT_APP_API

class PlayerContainer extends Component {

  state = {
    players: []
  }

  componentDidMount(){
    fetch(`${BASE_URL}/players`)
    .then(res => res.json())
    .then(players => this.setState({players}))
  }

  render() {
    return(
      <Switch>
        <Route exact path='/players' render={() => <PlayerList players={this.state.players}/>} />
        <Route path='/players/:id' component={Player} />
      </Switch>
    )
  }

}

export default PlayerContainer
