import React, { Component } from 'react'
import { Grid, Image, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class ClubList extends Component {

  render() {
    const { activeItem } = this.props

    return (
      <div>
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
          </Menu>
          <Grid.Row>
            {this.props.clubs[0] && this.props.clubs.map((club,index) => {
              return (
                <Grid.Column>
                  <div key={club.id}>
                    <Link to={`/clubs/${club.id}`}>
                    <Image width='50' src={club.badge} avatar />
                    {club.name}</Link>
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


export default ClubList


// import React from 'react'
// import { Grid, Image } from 'semantic-ui-react'
//
// const GridExampleDividedNumber = () => (
//   <Grid columns={3} divided>
//     <Grid.Row>
//       <Grid.Column>
//         <Image src='/assets/images/wireframe/media-paragraph.png' />
//       </Grid.Column>
//       <Grid.Column>
//         <Image src='/assets/images/wireframe/media-paragraph.png' />
//       </Grid.Column>
//       <Grid.Column>
//         <Image src='/assets/images/wireframe/media-paragraph.png' />
//       </Grid.Column>
//     </Grid.Row>
//
//     <Grid.Row>
//       <Grid.Column>
//         <Image src='/assets/images/wireframe/media-paragraph.png' />
//       </Grid.Column>
//       <Grid.Column>
//         <Image src='/assets/images/wireframe/media-paragraph.png' />
//       </Grid.Column>
//       <Grid.Column>
//         <Image src='/assets/images/wireframe/media-paragraph.png' />
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
// )
//
// export default GridExampleDividedNumber
