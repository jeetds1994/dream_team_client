import React, { Component } from 'react'
import Club from './Club'
import { Grid, Image } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'


class ClubList extends Component {

  render() {

    return (
      <div>
      <Route exact path='/clubs/:id' component={Club} />
        <Grid container stackable doubling columns={5} divided>
          <Grid.Row>
            {this.props.clubs.map((club,index) => {
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
