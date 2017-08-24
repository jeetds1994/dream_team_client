import React, { Component } from 'react'
import PlayerRadarChart from './PlayerRadarChart'
import { Dimmer, Loader } from 'semantic-ui-react'
// import { Image, Button } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Player extends Component {
  state = {
    player: {},
    loading: true
  }

  componentDidMount() {
  const playerID = this.props.match.params.id
  fetch(`${BASE_URL}/players/${playerID}`)
  .then(resp => resp.json())
  .then(json => {
    this.setState({
      player: json,
      loading: false
      })
    })
  }

  average = (arr) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length

  getAttack = (player) => {
    let attackAttributes = [
                              this.state.player["attacking_position"],
                              this.state.player["crossing"],
                              this.state.player["short_pass"],
                              this.state.player["long_pass"],
                              this.state.player["shot_power"],
                              this.state.player["finishing"],
                              this.state.player["long_shots"],
                              this.state.player["curve"],
                              this.state.player["freekick_accuracy"],
                              this.state.player["penalties"],
                              this.state.player["volleys"]
                            ]
      return this.average(attackAttributes).toFixed(1)
    }

    getDefense = () => {
      let defenseAttributes = [
                            this.state.player["marking"],
                            this.state.player["sliding_tackle"],
                            this.state.player["standing_tackle"],
                            this.state.player["interceptions"]
                          ]
      return this.average(defenseAttributes).toFixed(1)
    }

    getGoalie = () => {
      let goalieAttributes = [
                              this.state.player["gk_positioning"],
                              this.state.player["gk_diving"],
                              this.state.player["gk_kicking"],
                              this.state.player["gk_handling"],
                              this.state.player["gk_reflexes"]
                            ]
      return this.average(goalieAttributes).toFixed(1)
    }

    getMental = () => {
      let mentalityAttributes = [
                                  this.state.player["aggression"],
                                  this.state.player["vision"],
                                  this.state.player["composure"]
                                ]
      return this.average(mentalityAttributes).toFixed(1)
    }

    getPhysical = () => {
      let physicalAttributes = [
                                this.state.player["reactions"],
                                this.state.player["acceleration"],
                                this.state.player["speed"],
                                this.state.player["stamina"],
                                this.state.player["strength"],
                                this.state.player["balance"],
                                this.state.player["agility"],
                                this.state.player["jumping"],
                                this.state.player["heading"]
                              ]
      return this.average(physicalAttributes).toFixed(1)
    }

    getSkill = () => {
      let skillAttributes = [
                              this.state.player["ball_control"],
                              this.state.player["dribbling"]
                            ]
      return this.average(skillAttributes).toFixed(1)
    }

    getOther = () => {
      let otherAttributes = [
                              this.state.player["nationality"],
                              this.state.player["club_name"],
                              this.state.player["club_position"],
                              this.state.player["club_kit"],
                              this.state.player["rating"],
                              this.state.player["height"],
                              this.state.player["weight"],
                              this.state.player["preferred_foot"],
                              this.state.player["birth_date"],
                              this.state.player["age"],
                              this.state.player["work_rate"],
                              this.state.player["weak_foot"],
                              this.state.player["skill_moves"]
                            ]
      return otherAttributes
    }

  render() {
    const loader = (
      <Dimmer active inverted>
        <Loader size='large' inverted content='Loading...' />
      </Dimmer>)

    const player = this.state.player

    // Remove club object relation, id, and name from player attributes to avoid redundancies
    const player_keys = Object.keys(player).splice(2, (Object.keys(player).length - 3))
    const player_values = Object.values(player).splice(2, (Object.values(player).length - 3))

    return(
      <div>
        {this.state.loading ? loader : null}
        <h4>Player Name: {player.name ? player.name : null}</h4>

        Attack Rating: {this.getAttack()}<br/>
        Defense Rating: {this.getDefense()}<br/>
        Physical Rating: {this.getPhysical()}<br/>
        Skill Rating: {this.getSkill()}<br/>
        Mental Rating: {this.getMental()}<br/>
        {this.state.player.club_position === 'GK' ? `Goalie Rating: ${this.getGoalie()}` : null}
        <br/>
        <br/>
        <br/>
        <PlayerRadarChart player={this.state.player} />
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
