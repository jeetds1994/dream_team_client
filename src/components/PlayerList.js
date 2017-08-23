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
        <br/>
        <br/>
        <Grid container stackable doubling columns={5} divided>
          <Menu pagination>
            <Menu.Item name='1' active={activeItem === '1'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='2' active={activeItem === '2'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='3' active={activeItem === '3'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='4' active={activeItem === '4'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='5' active={activeItem === '5'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='6' active={activeItem === '6'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='7' active={activeItem === '7'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='8' active={activeItem === '8'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='9' active={activeItem === '9'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='10' active={activeItem === '10'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='11' active={activeItem === '11'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='12' active={activeItem === '12'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='13' active={activeItem === '13'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='14' active={activeItem === '14'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='15' active={activeItem === '15'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='16' active={activeItem === '16'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='17' active={activeItem === '17'} onClick={this.props.handlePageNumClick} />
            <Menu.Item name='18' active={activeItem === '18'} onClick={this.props.handlePageNumClick} />
          </Menu>
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
        </Grid>
      </div>
    )
  }

}

// <Image width='50' src={player.badge} avatar />
export default PlayerList
