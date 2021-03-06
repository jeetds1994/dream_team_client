import React, { Component } from 'react'
import { Image, Grid, Menu, Search } from 'semantic-ui-react'
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
        results: _.filter(this.props.clubs, isMatch),
        isLoading: false
      })
    }, 500)
  }

  resultRenderer = (result) => {
    console.log(result)
    return (
      <div >
        <div className='image'>
          <img src={result.badge} alt='club-badge' />
        </div>
        <div className='content'>
          <div className='title'>
            <a href={`/clubs/${result.url}`}>
            {result.name}
            </a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { isLoading, value, results, activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item header style={{padding:'0px 10px 0px 5px', margin:'0px 0px 9px 0px'}}>
              <span style={{color:'#000000'}}>{`{`}</span><Image src='/logo.png' style={{width: '16px', height: '16px'}} /><span style={{color:'#000000'}}>{`DREAM`}</span><span style={{color:'#88f2e8'}}>TEAM</span><span style={{color:'#000000'}}>&nbsp;{`}`}</span>
          </Menu.Item>
          <Link to='/'><Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} style={{padding:'14px 10px 10px 4px'}}>Home</Menu.Item></Link>
          <Link to='/clubs'><Menu.Item name='clubs' active={activeItem === 'clubs'} onClick={this.handleItemClick} style={{padding:'14px 10px 10px 5px'}}>Clubs</Menu.Item></Link>
          <Link to='/players'><Menu.Item name='players' active={activeItem === 'players'} onClick={this.handleItemClick} style={{padding:'14px 10px 10px 5px'}}>Players</Menu.Item></Link>
          <Menu.Menu position='right'>
            <Grid>
              <Grid.Column width={8}>
                <Menu.Item style={{ fontSize: '0.85em', padding: '5px 15px 3px 0px'}}>
                  <Search
                    placeholder='Search...'
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    resultRenderer={this.resultRenderer}
                    results={results}
                    value={value}
                    {...this.props}
                  />
                </Menu.Item>
              </Grid.Column>
             </Grid>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default Nav
