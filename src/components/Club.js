import React, { Component } from 'react'
import { Image, Button, Dropdown } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Club extends Component {
  state = {
    currentClub: {},
    starters: [],
    bench: [],
    effectiveness_score: '',
    firstSelection: {},
    secondSelection: {},
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
    // let index = this.state.currentClub.players.indexOf(event.target.value)
    let player = this.state.currentClub.players.filter(player => player.id === event.target.value)[0]

    // This is to de-select a player
    if (this.state.firstSelection.id === event.target.value) {
      this.setState({firstSelection: {}})
      return console.log("firstSelection should be empty")
    }

    // This is to de-select a player
    if (this.state.secondSelection.id === event.target.value) {
      this.setState({secondSelection: {}})
      return console.log("secondSelection should be empty")
    }

    // This method was used to differentiate between starterSelection and benchSelection
    // if (this.state.starters.map(player => player.id === event.target.value).includes(true)) {
    //   this.setState({firstSelection: this.state.starters.slice(index, index + 1)[0]})
    // } else {
    //   this.setState({secondSelection: this.state.bench.slice(index, index + 1)[0]})
    // }

    if (Object.keys(this.state.firstSelection).length === 0) {
      this.setState({firstSelection: player})
    } else {
      this.setState({secondSelection: player})
    }
  }

  handleChangePlayers = event => {
    event.preventDefault()

    // Ensuring two players have been selected for switch
    if (Object.keys(this.state.firstSelection).length === 0 || Object.keys(this.state.secondSelection).length === 0) {
      return console.log("Both selections must be made before changing lineup")
    }

    // Initiating variables needed for splicing used to swap player positions
    let i1
    let i2
    let new_starters = this.state.starters
    let new_bench = this.state.bench

    // Switch statement for switching the exact places of each player
    switch (this.state.starters.map(player => player.id === this.state.firstSelection.id).includes(true)) {
      case true:
        i1 = this.state.starters.indexOf(this.state.firstSelection)

        if (this.state.starters.map(player => player.id === this.state.secondSelection.id).includes(true)) {
          i2 = this.state.starters.indexOf(this.state.secondSelection)

          // Both players are starters
          new_starters.splice(i1, 1, this.state.secondSelection)
          new_starters.splice(i2, 1, this.state.firstSelection)

        } else {
          i2 = this.state.bench.indexOf(this.state.secondSelection)

          // 1st player is a starter and 2nd player is on the bench
          new_starters.splice(i1, 1, this.state.secondSelection)
          new_bench.splice(i2, 1, this.state.firstSelection)
        }

        break
      case false:
        i1 = this.state.bench.indexOf(this.state.firstSelection)

        if (this.state.starters.map(player => player.id === this.state.secondSelection.id).includes(true)) {
          i2 = this.state.starters.indexOf(this.state.secondSelection)

          // 1st player is on the bench and 2nd player is a starter
          new_bench.splice(i1, 1, this.state.secondSelection)
          new_starters.splice(i2, 1, this.state.firstSelection)

        } else {
          i2 = this.state.bench.indexOf(this.state.secondSelection)

          // Both players are on the bench
          new_bench.splice(i1, 1, this.state.secondSelection)
          new_bench.splice(i2, 1, this.state.firstSelection)
        }

        break
      default:
        console.log("Your switch statement for switching the exact places of each player isn't working")
        break
    }

    this.setState({
      starters: new_starters,
      bench: new_bench,
      effectiveness_score: this.effectiveness_score(new_starters),
      firstSelection: {},
      secondSelection: {}
    })
  }

    handleFormationChange = event => {
      let form_def_num = event.target.innerText.split('-')[0]
      let form_mid_num = event.target.innerText.split('-')[1]
      let form_for_num = event.target.innerText.split('-')[2]
      let starters = [].concat(this.state.goalies.slice(0, 1), this.state.defenders.slice(0, form_def_num), this.state.midfielders.slice(0, form_mid_num), this.state.forwards.slice(0, form_for_num))
      let bench = []
      this.state.currentClub.players.map(player => {
        if (!starters.includes(player)) {
          bench.push(player)
        }})

      this.setState({
        formation: event.target.innerText,
        starters: starters,
        bench: bench,
        effectiveness_score: this.effectiveness_score(starters)
      })
    }

  effectiveness_score = (players) => {
    let total = 0
    players.slice(0,11).map(player => (total += player.rating))
    return (total/11).toFixed(1)
  }

  render() {

    const formationOptions = [
      {key: '3-4-3', value: '3-4-3', text: '3-4-3'},
      {key: '3-5-2', value: '3-5-2', text: '3-5-2'},
      {key: '4-3-3', value: '4-3-3', text: '4-3-3'},
      {key: '4-4-2', value: '4-4-2', text: '4-4-2'},
      {key: '4-5-1', value: '4-5-1', text: '4-5-1'}
    ]

    return(
      <div>
        <h3>
          <Image width='50' src={this.state.currentClub.badge} avatar />
          {this.state.currentClub.name}
        </h3>

        <h4>Current Clout: {this.state.effectiveness_score} Gucci Belts</h4>

        Team Formation: <Dropdown value={this.state.formation} search selection options={formationOptions} onChange={this.handleFormationChange}/>
        <br/>
        <br/>
        Starting Lineup:
        <ul>
          {this.state.starters[0] ? this.state.starters.map((player,index) => <li key={index} id={index} value={player.id} onClick={this.handlePlayerClick}>{player.name} -- {player.club_position}</li>) : null}
        </ul>

        <br/>
        Player 1: {this.state.firstSelection.name ? this.state.firstSelection.name : null}
        <br/>
        Player 2: {this.state.secondSelection.name ? this.state.secondSelection.name : null}
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
