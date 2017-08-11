import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'

class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='clubs' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name='players' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
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
