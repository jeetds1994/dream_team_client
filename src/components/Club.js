import React, { Component } from 'react'
import { Image, Button } from 'semantic-ui-react'

const BASE_URL = process.env.REACT_APP_API

class Club extends Component {
  state = {
    currentClub: {},
    lineup: [],
    bench: [],
    effectiveness_score: '',
    firstSelection: {},
    secondSelection: {}
  }

  componentDidMount() {
  const clubID = this.props.match.params.id
  fetch(`${BASE_URL}/clubs/${clubID}`)
  .then(resp => resp.json())
  .then(json => {
    this.setState({
      currentClub: json,
      lineup: json.players.slice(0, 11),
      bench: json.players.slice(11),
      effectiveness_score: this.effectiveness_score(json.players)
      })
    })
  }

  handlePlayerClick = event => {
    // debugger
    let index = parseInt(event.target.id, 10)
    if (this.state.lineup.map(player => player.id === event.target.value).includes(true)) {
      this.setState({firstSelection: this.state.lineup.slice(index, index + 1)[0]})
    } else {
      this.setState({secondSelection: this.state.bench.slice(index, index + 1)[0]})
    }
  }

  handleChangePlayers = event => {
    event.preventDefault()
    const i1 = this.state.lineup.indexOf(this.state.firstSelection)
    const i2 = this.state.bench.indexOf(this.state.secondSelection)

    let new_lineup = this.state.lineup
    let new_bench = this.state.bench

    new_lineup.splice(i1, 1, this.state.secondSelection)
    new_bench.splice(i2, 1, this.state.firstSelection)

    this.setState({
      lineup: new_lineup,
      bench: new_bench,
      effectiveness_score: this.effectiveness_score(new_lineup),
      firstSelection: {},
      secondSelection: {}
    })
  }

  effectiveness_score = (players) => {
    let total = 0
    players.slice(0,11).map(player => (total += player.rating))
    return (total/11).toFixed(1)
  }

  render() {

    return(
      <div>
        <Image width='50' src={this.state.currentClub.badge} avatar />
        {this.state.currentClub.name}<br/>
        Current Gucci Clout: {this.state.effectiveness_score} Gucci Belts
        <br/><br/>

        Starting Lineup:
        <ul>
          {this.state.lineup[0] ? this.state.lineup.map((player,index) => <li key={index} id={index} value={player.id} onClick={this.handlePlayerClick}>{player.name} -- {player.club_position}</li>) : null}
        </ul>

        <br/>
        Starter: {this.state.firstSelection.name ? this.state.firstSelection.name : null}
        <br/>
        Substitute: {this.state.secondSelection.name ? this.state.secondSelection.name : null}
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
