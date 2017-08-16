import React, { Component } from 'react'
import Player from './Player'
import { Grid } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'


class PlayerList extends Component {

  render() {
    return (
      <div>
      <Route exact path='/players/:id' component={Player} />
        <Grid container stackable doubling columns={5} divided>
          <Grid.Row>
            {this.props.players.map((player,index) => {
              return (
                <Grid.Column>
                  <div key={player.id}>
                    <Link to={`/players/${player.id}`}>
                    {player.name}</Link>
                  </div>
                </Grid.Column>
              )
            })}
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}

// <Image width='50' src={player.badge} avatar />
export default PlayerList
