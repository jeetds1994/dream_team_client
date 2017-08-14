import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ClubList from '../components/ClubList'
import Club from '../components/Club'


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
      <Switch>
        <Route exact path='/clubs' render={() => <ClubList clubs={this.state.clubs}/>} />
        <Route path='/clubs/:id' component={Club} />
      </Switch>
    )
  }

}

export default ClubContainer
