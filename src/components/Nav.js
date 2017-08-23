import React, { Component } from 'react'
import { Button, Image, Grid, Menu, Input, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class Nav extends Component {
  state = {
    activeItem: [],
    isLoading: false,
    results: [],
    searchTerm: '',
  }

  handleItemClick = (e, { name }) => this.setState({activeItem: name})

  componentWillMount() {
  this.resetComponent()
  }

  // handleLogout = () => {
  //   this.props.logout()
  //   auth.signOut()
  //   .then(data => console.log(data))
  // }
  //
  // handleClick= (id, name) =>{
  //   const baseUrl = process.env.REACT_APP_API
  //   let clubID = null
  //   fetch(`${baseUrl}/clubs`)
  //   .then(res => res.json())
  //   .then(json => {
  //     let club = json.clubs.filter((club)=>{
  //       return club.name === name
  //     })
  //     debugger
  //     clubID = club[0].id
  //   })
  //   // .then(()=> this.props.createFavoritedPost(clubID, this.props.auth.currentUserId))
  // }

  resetComponent = () => {
    this.setState({
      isLoading: false,
      results: [],
      searchTerm: ''
    })
  }

  handleResultSelect = (e, { result }) => {
    // debugger
    this.setState({ searchTerm: result.name })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, searchTerm: value })

    setTimeout(() => {
      if (this.state.searchTerm.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.searchTerm), 'i')
      const isMatch = (result) => re.test(result.name)

      this.setState({
        results: _.filter(this.props.clubs.club, isMatch),
        isLoading: false
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results, activeItem } = this.state

    // <Input icon='search' placeholder='Search...' />
    // color: #4BA2F4

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item header style={{ fontSize: '1.1em', padding:'10px 10px 17px 5px'}}>
              <span style={{color:'#000000'}}>{`{`}</span><Image src='logo.ico' alt='logo' style={{width: '16px', height: '16px'}} /><span style={{color:'#000000'}}>{`DREAM`}</span><span style={{color:'#88f2e8'}}>TEAM</span><span style={{color:'#000000'}}>&nbsp;{`}`}</span>
          </Menu.Item>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} style={{ fontSize: '1.1em', padding:'10px 10px 15px 5px'}}><Link to='/'>Home</Link></Menu.Item>
          <Menu.Item name='clubs' active={activeItem === 'clubs'} onClick={this.handleItemClick} style={{ fontSize: '1.1em', padding:'10px 10px 15px 5px'}}><Link to='/clubs'>Clubs</Link></Menu.Item>
          <Menu.Item name='players' active={activeItem === 'players'} onClick={this.handleItemClick} style={{ fontSize: '1.1em', padding:'10px 10px 15px 5px'}}><Link to='/players'>Players</Link></Menu.Item>
          <Menu.Menu position='right'>
            <Grid>
              <Grid.Column width={8}>
                <Menu.Item style={{ fontSize: '0.9em', padding: '10px 5px'}}>
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    {...this.props}
                  />
                </Menu.Item>
              </Grid.Column>
             </Grid>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} style={{ fontSize: '1em', padding:'5px 10px 16px 0px'}}>
              <Button>Log Out</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default Nav
