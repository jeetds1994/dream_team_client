import React, { Component } from 'react'
import PlayerRadarChart from './PlayerRadarChart'
import { Dimmer, Loader } from 'semantic-ui-react'
// import { Image, Button } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Player extends Component {
  state = {
    currentPlayer: {},
    loading: true
  }

  componentDidMount() {
  const playerID = this.props.match.params.id
  fetch(`${BASE_URL}/players/${playerID}`)
  .then(resp => resp.json())
  .then(json => {
    this.setState({
      currentPlayer: json,
      loading: false
      })
    })
  }

  render() {
    const loader = (
      <Dimmer active inverted>
        <Loader size='large' inverted content='Loading...' />
      </Dimmer>)

    const player = this.state.currentPlayer

    // Remove club object relation, id, and name from player attributes to avoid redundancies
    const player_keys = Object.keys(player).splice(2, (Object.keys(player).length - 3))
    const player_values = Object.values(player).splice(2, (Object.values(player).length - 3))

    return(
      <div>
        {this.state.loading ? loader : null}
        <h4>Player Name: {player.name ? player.name : null}</h4>

        <br/>
        <br/>
        <PlayerRadarChart player={this.state.currentPlayer} />
        <br/>
        <br/>


        <p>Player Stats:</p>
        <ul>
        {player.name ? player_keys.map((k,index) => <li key={index}>{`${k.split('_').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')} -- ${player_values[index]}`}</li>) : null}
        </ul>
      </div>
    )
  }
}

export default Player
