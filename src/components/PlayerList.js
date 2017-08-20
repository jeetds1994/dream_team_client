import React, { Component } from 'react'
import Player from './Player'
import { Grid, Menu } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'


class PlayerList extends Component {

  render() {
    const { activeItem } = this.props

    return (
      <div>
      <Route exact path='/players/:id' component={Player} />
        <Grid container stackable doubling columns={5} divided>
          <Grid.Row>
            {this.props.players[0] && this.props.players.map((player,index) => {
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
          <Menu pagination>
            <Menu.Item name='1' active={activeItem === '1'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='2' active={activeItem === '2'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='3' active={activeItem === '3'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='4' active={activeItem === '4'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='5' active={activeItem === '5'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='6' active={activeItem === '6'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='7' active={activeItem === '7'} onClick={this.props.handlePageNumClick} />
          </Menu>
        </Grid>
      </div>
    )
  }

}

// <Image width='50' src={player.badge} avatar />
export default PlayerList
