import React, { Component } from 'react'
// import Club from './Club'
import { Grid, Image } from 'semantic-ui-react'


class ClubList extends Component {

  render() {
    return (
      <div>
        <Grid container stackable doubling columns={5} divided>
          <Grid.Row>
            {this.props.clubs.map((club,index) => {
              return (
                <Grid.Column key={index}>
                  <div>
                    <Image width='50' src={club.badge} avatar />
                    {club.name}
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
