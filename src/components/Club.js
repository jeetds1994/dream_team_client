import React, { Component } from 'react'
import { Image, Button, Dropdown, Input } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Club extends Component {
  state = {
    currentClub: {},
    starters: [],
    bench: [],
    effectiveness_score: '',
    firstSelection: {},
    secondSelection: {},
    formation: {"format": '4-5-1'},
    formationOptions: [],
    savedFormations: [],
    setFormationDefault: false,
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

    let goalies = json.players.filter(player => player.club_position === 'GK')
    let defenders = json.players.filter(player => player.club_position.includes('B'))
    let midfielders = json.players.filter(player => player.club_position.includes('M') || player.club_position === 'RW' || player.club_position === 'LW')
    let forwards = json.players.filter(player => player.club_position.includes('F') || player.club_position === 'ST' || player.club_position === 'RW' || player.club_position === 'LW')
    let starters = [].concat(goalies.slice(0, 1), defenders.slice(0, this.state.formation.format.split('-')[0]), midfielders.slice(0, this.state.formation.format.split('-')[1]), forwards.slice(0, this.state.formation.format.split('-')[2]))
    // let starters = [].concat(this.state.goalies.slice(0, this.state.formation.goalkeepers), this.state.defenders.slice(0, this.state.formation.defenders), this.state.midfielders.slice(0, this.state.formation.midfielders), this.state.forwards.slice(0, this.state.formation.forwards))
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
      effectiveness_score: this.effectiveness_score(starters)
      })
    })

    fetch(`${BASE_URL}/formations`)
    .then(res => res.json())
    .then(formationOptions => {
      // let starters = [].concat(this.state.goalies.slice(0, this.state.formation.goalkeepers), this.state.defenders.slice(0, this.state.formation.defenders), this.state.midfielders.slice(0, this.state.formation.midfielders), this.state.forwards.slice(0, this.state.formation.forwards))
      // let bench = []
      // this.state.currentClub.players.map(player => {
      //   if (!starters.includes(player)) {
      //     bench.push(player)
      //   }})

      this.setState({
        formationOptions,
        // formation: formationOptions[0],
        // starters: starters,
        // bench: bench,
        // effectiveness_score: this.effectiveness_score(starters)
      })})

      fetch(`${BASE_URL}/club_formations`)
      .then(res => res.json())
      .then(club_formations => {
        let savedFormations = club_formations.filter(formation => formation.club.id === parseInt(clubID, 10))
        this.setState({savedFormations})
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

    // This puts first player selected into firstSelection if one does not exist yet; otherwise, player goes into secondSelection
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
      let new_formation = this.state.formationOptions.filter(formation => formation.format === event.target.innerText)[0]
      let starters = [].concat(this.state.goalies.slice(0, new_formation.goalkeepers), this.state.defenders.slice(0, new_formation.defenders), this.state.midfielders.slice(0, new_formation.midfielders), this.state.forwards.slice(0, new_formation.forwards))
      let bench = []
      this.state.currentClub.players.map(player => {
        if (!starters.includes(player)) {
          bench.push(player)
        }})

      this.setState({
        formation: new_formation,
        starters: starters,
        bench: bench,
        effectiveness_score: this.effectiveness_score(starters)
      })
    }

    handleSavedFormationChange = event => {
      let savedFormation = this.state.savedFormations.filter(club_formation => club_formation.formation.format === event.target.innerText)[0]
      let new_formation = savedFormation.formation

      let goalies
      let defenders
      let midfielders
      let forwards

      if (new_formation.format === "3-4-3") {
        goalies = this.state.currentClub.players.filter(player => player.id === savedFormation.player_1)
        defenders = this.state.currentClub.players.filter(player => player.id === savedFormation.player_2 || player.id === savedFormation.player_3 || player.id === savedFormation.player_4)
        midfielders = this.state.currentClub.players.filter(player => player.id === savedFormation.player_5 || player.id === savedFormation.player_6 || player.id === savedFormation.player_7 || player.id === savedFormation.player_8)
        forwards = this.state.currentClub.players.filter(player => player.id === savedFormation.player_9 || player.id === savedFormation.player_10 || player.id === savedFormation.player_11)
      }

      if (new_formation.format === "4-5-1") {
        goalies = this.state.currentClub.players.filter(player => player.id === savedFormation.player_1)
        defenders = this.state.currentClub.players.filter(player => player.id === savedFormation.player_2 || player.id === savedFormation.player_3 || player.id === savedFormation.player_4 || player.id === savedFormation.player_5)
        midfielders = this.state.currentClub.players.filter(player => player.id === savedFormation.player_6 || player.id === savedFormation.player_7 || player.id === savedFormation.player_8 || player.id === savedFormation.player_9 || player.id === savedFormation.player_10)
        forwards = this.state.currentClub.players.filter(player => player.id === savedFormation.player_11)
      }

      let starters = [].concat(goalies.slice(0, new_formation.goalkeepers), defenders.slice(0, new_formation.defenders), midfielders.slice(0, new_formation.midfielders), forwards.slice(0, new_formation.forwards))
      let bench = []
      this.state.currentClub.players.map(player => {
        if (!starters.includes(player)) {
          bench.push(player)
        }})

      this.setState({
        formation: new_formation,
        starters: starters,
        bench: bench,
        effectiveness_score: this.effectiveness_score(starters)
      })
    }

    handleSetFormationDefault = event => {
      this.setState({setFormationDefault: event.target.checked})
    }

    handleSaveLineup = event => {
      fetch(`${BASE_URL}/club_formations`,
            {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
              'club_id': this.state.currentClub.id,
              'formation_id': this.state.formation.id,
              "current_club_formation": true,
              "default_club_formation": this.state.setFormationDefault,
              "player_1": this.state.starters[0].id,
              "player_2": this.state.starters[1].id,
              "player_3": this.state.starters[2].id,
              "player_4": this.state.starters[3].id,
              "player_5": this.state.starters[4].id,
              "player_6": this.state.starters[5].id,
              "player_7": this.state.starters[6].id,
              "player_8": this.state.starters[7].id,
              "player_9": this.state.starters[8].id,
              "player_10": this.state.starters[9].id,
              "player_11": this.state.starters[10].id,
            })
          })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        this.setState({
        setFormationDefault: false
      })})
    }

  effectiveness_score = (players) => {
    let total = 0
    players.slice(0,11).map(player => (total += player.rating))
    return (total/11).toFixed(1)
  }

  render() {
    // Semantic dropdown requires these three fields to properly display and select options
    const formationOptions = this.state.formationOptions.map(formation => ({key: formation.format, value: formation.format, text: formation.format}))
    const savedFormations = this.state.savedFormations.map(club_formation => ({key: club_formation.formation.format, value: club_formation.formation.format, text: club_formation.formation.format}))
    // debugger

    return(
      <div>
        <h3>
          <Image width='50' src={this.state.currentClub.badge} avatar />
          {this.state.currentClub.name}
        </h3>

        <h4>Current Clout: {this.state.effectiveness_score} Gucci Belts</h4>

        Team Formation: <Dropdown value={this.state.formation.format} search selection options={formationOptions} onChange={this.handleFormationChange}/>
        <br/>
        Saved Formations: <Dropdown search selection options={savedFormations} onChange={this.handleSavedFormationChange}/>
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
        <Button onClick={this.handleSaveLineup}>Submit Lineup!</Button>
        <br/>
        Set as Default? <Input type="checkbox" onClick={this.handleSetFormationDefault} value={this.state.setFormationDefault} />
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
