import React, { Component } from 'react'
import { Image, Button } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Club extends Component {
  state = {
    currentClub: {},
    starters: [],
    bench: [],
    effectiveness_score: '',
    starterSelection: {},
    benchSelection: {},
    formation: '4-5-1',
    goalies: [],
    defenders: [],
    midfielders: [],
    forwards: []
  }

  componentDidMount() {
  const clubID = this.props.match.params.id
  fetch(`${BASE_URL}/clubs/${clubID}`)
  .then(resp => resp.json())
  .then(json => {

    let form_def_num = this.state.formation.split('-')[0]
    let form_mid_num = this.state.formation.split('-')[1]
    let form_for_num = this.state.formation.split('-')[2]
    let goalies = json.players.filter(player => player.club_position === 'GK')
    let defenders = json.players.filter(player => player.club_position.includes('B'))
    let midfielders = json.players.filter(player => player.club_position.includes('M') || player.club_position === 'RW' || player.club_position === 'LW')
    let forwards = json.players.filter(player => player.club_position.includes('F') || player.club_position === 'ST' || player.club_position === 'RW' || player.club_position === 'LW')
    let starters = [].concat(goalies.slice(0, 1), defenders.slice(0, form_def_num), midfielders.slice(0, form_mid_num), forwards.slice(0, form_for_num))
    let bench = []
    json.players.map(player => {
      if (!starters.includes(player)) {
        bench.push(player)
      }})

    this.setState({
      currentClub: json,
      // starters: json.players.slice(0, 11),
      // bench: json.players.slice(11),
      starters: starters,
      bench: bench,
      goalies: goalies,
      defenders: defenders,
      midfielders: midfielders,
      forwards: forwards,
      effectiveness_score: this.effectiveness_score(json.players)
      })
    })
  }

  handlePlayerClick = event => {
    // debugger
    let index = parseInt(event.target.id, 10)
    if (this.state.starters.map(player => player.id === event.target.value).includes(true)) {
      this.setState({starterSelection: this.state.starters.slice(index, index + 1)[0]})
    } else {
      this.setState({benchSelection: this.state.bench.slice(index, index + 1)[0]})
    }
  }

  handleChangePlayers = event => {
    event.preventDefault()
    const i1 = this.state.starters.indexOf(this.state.starterSelection)
    const i2 = this.state.bench.indexOf(this.state.benchSelection)

    let new_starters = this.state.starters
    let new_bench = this.state.bench

    new_starters.splice(i1, 1, this.state.benchSelection)
    new_bench.splice(i2, 1, this.state.starterSelection)

    this.setState({
      starters: new_starters,
      bench: new_bench,
      effectiveness_score: this.effectiveness_score(new_starters),
      starterSelection: {},
      benchSelection: {}
    })
  }

  effectiveness_score = (players) => {
    let total = 0
    players.slice(0,11).map(player => (total += player.rating))
    return (total/11).toFixed(1)
  }

  // get_formation_numbers = () => {
  //   let form_def_num = this.state.formation.split('-')[0]
  //   let form_mid_num = this.state.formation.split('-')[1]
  //   let form_for_num = this.state.formation.split('-')[2]
  // }

  render() {

    return(
      <div>
        <h3>
          <Image width='50' src={this.state.currentClub.badge} avatar />
          {this.state.currentClub.name}
        </h3>

        <h4>Current Clout: {this.state.effectiveness_score} Gucci Belts</h4>

        Current Formation: {this.state.formation}
        <br/>
        Starting Lineup:
        <ul>
          {this.state.starters[0] ? this.state.starters.map((player,index) => <li key={index} id={index} value={player.id} onClick={this.handlePlayerClick}>{player.name} -- {player.club_position}</li>) : null}
        </ul>

        <br/>
        Starter: {this.state.starterSelection.name ? this.state.starterSelection.name : null}
        <br/>
        Substitute: {this.state.benchSelection.name ? this.state.benchSelection.name : null}
        <br/>
        <Button onClick={this.handleChangePlayers}>Change Lineup!</Button>
        <br/>
        <br/>

        Bench:
        <ul>
          {this.state.bench[0] ? this.state.bench.map((player,index) => <li key={index} id={index} value={player.id} onClick={this.handlePlayerClick}>{player.name} -- {player.club_position}</li>) : null}
        </ul>
      </div>
    )
  }
}

export default Club
