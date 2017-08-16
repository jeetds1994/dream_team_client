import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import PlayerList from '../components/PlayerList'
import Player from '../components/Player'


const BASE_URL = process.env.REACT_APP_API

class PlayerContainer extends Component {

  state = {
    players: [],
    loading: true
  }

  componentDidMount(){
    fetch(`${BASE_URL}/players`)
    .then(res => res.json())
    .then(players => this.setState({
      players: players,
      loading: false
    }))
  }

  render() {
    const loader = (
      <Dimmer active inverted>
        <Loader size='large' inverted content='Loading...' />
      </Dimmer>)

    return(
      <div>
        {this.state.loading ? loader : null}
        <Switch>
          <Route exact path='/players' render={() => <PlayerList players={this.state.players}/>} />
          <Route path='/players/:id' component={Player} />
        </Switch>
      </div>
    )
  }

}

export default PlayerContainer
