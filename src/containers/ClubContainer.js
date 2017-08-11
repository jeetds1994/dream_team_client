import React, { Component } from 'react'
import ClubList from '../components/ClubList'

class ClubContainer extends Component {

  state = {
    clubs: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/clubs?page=1')
    .then(res => res.json())
    .then(clubs => this.setState({clubs}))
  }

  render() {
    return(
      <div>
        <ClubList clubs={this.state.clubs}/>
      </div>
    )
  }

}

export default ClubContainer
