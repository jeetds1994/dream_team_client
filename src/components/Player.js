import React, { Component } from 'react'
import PlayerRadarChart from './PlayerRadarChart'
import { Dimmer, Loader, Grid } from 'semantic-ui-react'
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
    return attackAttributes
  }

  getAttackRating = (attackAttributes) => {
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

    // Quick function to test if an object is empty
    // function isEmpty(obj) {
    //   for(var key in obj) {
    //       if(obj.hasOwnProperty(key))
    //           return false
    //   }
    //   return true
    // }

    return(
      <div>
        <div>
          {this.state.loading ? loader : null}

          <Grid style={{padding: '20px 0px 0px 20px'}}>
            <Grid.Row>
              <Grid.Column width={4}>
                <div style={{fontSize: '24px'}}>
                  Player Name: {player.name ? player.name : null}
                  <br/>
                  <br/>
                </div>
                <div style={{fontSize: '16px'}}>
                  <h4>Overall Rating: {player.rating}</h4>
                  <br/>
                </div>

                {player.name ? player_keys.slice(0,11).map((k,index) => <li key={index}>{`${k.split('_').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')} -- ${player_values[index]}`}</li>) : null}

              </Grid.Column>
              <Grid.Column width={8} style={{padding: '15px 15px 15px 15px'}}>
                <PlayerRadarChart player={this.state.player} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{padding: '20px 0px 0px 0px'}}>
              {player.club_position === 'GK' ? (<Grid.Column width={2}>
                Keeper Rating: {this.getGoalie()}<br/>
                <br/>
                {player.name ? <li>Crossing: {this.state.player["gk_positioning"]}</li> : null}
                {player.name ? <li>Short Pass: {this.state.player["gk_diving"]}</li> : null}
                {player.name ? <li>Long Pass: {this.state.player["gk_kicking"]}</li> : null}
                {player.name ? <li>Shot Power: {this.state.player["gk_handling"]}</li> : null}
                {player.name ? <li>Finishing: {this.state.player["gk_reflexes"]}</li> : null}
              </Grid.Column>) : null}
              <Grid.Column width={2}>
                Attack Rating: {this.getAttackRating(this.getAttack())}<br/>
                <br/>
                {player.name ? <li>Crossing: {this.state.player["crossing"]}</li> : null}
                {player.name ? <li>Short Pass: {this.state.player["short_pass"]}</li> : null}
                {player.name ? <li>Long Pass: {this.state.player["long_pass"]}</li> : null}
                {player.name ? <li>Shot Power: {this.state.player["shot_power"]}</li> : null}
                {player.name ? <li>Finishing: {this.state.player["finishing"]}</li> : null}
                {player.name ? <li>Long Shots: {this.state.player["long_shots"]}</li> : null}
                {player.name ? <li>Curve: {this.state.player["curve"]}</li> : null}
                {player.name ? <li>Freekick Accuracy: {this.state.player["freekick_accuracy"]}</li> : null}
                {player.name ? <li>Penalties: {this.state.player["penalties"]}</li> : null}
                {player.name ? <li>Volleys: {this.state.player["volleys"]}</li> : null}
              </Grid.Column>
              <Grid.Column width={2}>
                Defense Rating: {this.getDefense()}<br/>
                <br/>
                {player.name ? <li>Crossing: {this.state.player["marking"]}</li> : null}
                {player.name ? <li>Short Pass: {this.state.player["sliding_tackle"]}</li> : null}
                {player.name ? <li>Long Pass: {this.state.player["standing_tackle"]}</li> : null}
                {player.name ? <li>Shot Power: {this.state.player["interceptions"]}</li> : null}
              </Grid.Column>
              <Grid.Column width={2}>
                Physical Rating: {this.getPhysical()}<br/>
                <br/>
                {player.name ? <li>Crossing: {this.state.player["reactions"]}</li> : null}
                {player.name ? <li>Short Pass: {this.state.player["acceleration"]}</li> : null}
                {player.name ? <li>Long Pass: {this.state.player["speed"]}</li> : null}
                {player.name ? <li>Shot Power: {this.state.player["stamina"]}</li> : null}
                {player.name ? <li>Finishing: {this.state.player["strength"]}</li> : null}
                {player.name ? <li>Long Shots: {this.state.player["balance"]}</li> : null}
                {player.name ? <li>Curve: {this.state.player["agility"]}</li> : null}
                {player.name ? <li>Freekick Accuracy: {this.state.player["jumping"]}</li> : null}
                {player.name ? <li>Penalties: {this.state.player["heading"]}</li> : null}
              </Grid.Column>
              <Grid.Column width={2}>
                Skill Rating: {this.getSkill()}<br/>
                <br/>
                {player.name ? <li>Crossing: {this.state.player["ball_control"]}</li> : null}
                {player.name ? <li>Short Pass: {this.state.player["dribbling"]}</li> : null}
              </Grid.Column>
              <Grid.Column width={2}>
                Mental Rating: {this.getMental()}<br/>
                <br/>
                {player.name ? <li>Crossing: {this.state.player["aggression"]}</li> : null}
                {player.name ? <li>Short Pass: {this.state.player["vision"]}</li> : null}
                {player.name ? <li>Long Pass: {this.state.player["composure"]}</li> : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}
// {this.state.player.club_position === 'GK' ? `Goalie Rating: ${this.getGoalie()}` : null}

export default Player
