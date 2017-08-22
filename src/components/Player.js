import React, { Component } from 'react'
import PlayerRadarChart from './PlayerRadarChart'
// import { Image, Button } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Player extends Component {
  state = {
    currentPlayer: {}
  }

  componentDidMount() {
  const playerID = this.props.match.params.id
  fetch(`${BASE_URL}/players/${playerID}`)
  .then(resp => resp.json())
  .then(json => {
    this.setState({
      currentPlayer: json
      })
    })
  }

  render() {

    const player = this.state.currentPlayer

    // Remove club object relation, id, and name from player attributes to avoid redundancies
    const player_keys = Object.keys(player).splice(2, (Object.keys(player).length - 3))
    const player_values = Object.values(player).splice(2, (Object.values(player).length - 3))

    return(
      <div>
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
