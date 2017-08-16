import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import ClubList from '../components/ClubList'
import Club from '../components/Club'


const BASE_URL = process.env.REACT_APP_API

class ClubContainer extends Component {

  state = {
    clubs: [],
    loading: true
  }

  componentDidMount(){
    fetch(`${BASE_URL}/clubs`)
    .then(res => res.json())
    .then(clubs => this.setState({
      clubs: clubs,
      loading: false
    }))
  }

  render() {
    const loader = (
      <Dimmer active inverted>
        <Loader size='large' inverted content='Loading...' />
      </Dimmer>)

    return(
      <div>
        {this.state.loading ? loader : null}
        <Switch>
          <Route exact path='/clubs' render={() => <ClubList clubs={this.state.clubs}/>} />
          <Route path='/clubs/:id' component={Club} />
        </Switch>
      </div>
    )
  }

}

export default ClubContainer
