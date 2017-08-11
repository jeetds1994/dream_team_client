import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'



class Club extends Component {

  render() {
    return(
      <div>
        <Image width='50' src={this.props.club.badge} avatar />
        {this.props.club.name}
        <ul>
          {this.props.club.players ? this.props.club.players.map((player,index) => <li key={index}>{player.name}</li>) : null}
        </ul>
      </div>
    )
  }
}

export default Club
