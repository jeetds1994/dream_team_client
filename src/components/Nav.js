import React, { Component } from 'react'
import { Button, Menu, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  state = { activeItem: [] }

  handleItemClick = (e, { name }) => this.setState({})

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}><Link to='/'>Home</Link></Menu.Item>
          <Menu.Item name='clubs' active={activeItem === 'clubs'} onClick={this.handleItemClick}><Link to='/clubs'>Clubs</Link></Menu.Item>
          <Menu.Item name='players' active={activeItem === 'players'} onClick={this.handleItemClick}><Link to='/players'>Players</Link></Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>
              <Button>Log Out</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default Nav
