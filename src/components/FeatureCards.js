import React from 'react'
import { Card, Grid, Image } from 'semantic-ui-react'

// <h2>Dream Team</h2>
const FeatureCards = () => (
  <div className='feature-cards'>
      <Grid>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={3}>
            <Card href='/clubs'>
              <Image style={{height: '300px', width: '360px'}} src='/1485972550847_lc_galleryImage_MANCHESTER_ENGLAND_FEBRUA.JPG' />
              <Card.Content>
                <Card.Header>All The Best Teams</Card.Header>
                <Card.Meta>Blurb</Card.Meta>
                <Card.Description>Change the formation, cycle in the youngsters, or account for a recent injury Change the formation, cycle in the youngsters, or account for a recent injury Change the formation, cycle in the youngsters, or account for a recent injury Change the formation, cycle in the youngsters, or account for a recent injury</Card.Description>
              </Card.Content>
            </Card>
            <Card href='/players'>
              <Image style={{height: '300px', width: '360px'}} src='http://cdn.playbuzz.com/cdn/29946fb8-39ad-43e2-bc7a-fce5ff483c91/21096d2c-8a47-4a1a-86c4-997967f4cbf6_560_420.jpg'/>
              <Card.Content>
                <Card.Header>Every Professional Player</Card.Header>
                <Card.Meta>Blurb</Card.Meta>
                <Card.Description>Change the formation, cycle in the youngsters, or account for a recent injury Change the formation, cycle in the youngsters, or account for a recent injury</Card.Description>
              </Card.Content>
            </Card>
            <Card href='/tutorial'>
              <Image style={{height: '300px', width: '360px'}} src='/alexander-londono-322213.jpg'/>
              <Card.Content>
                <Card.Header>Become The Manager</Card.Header>
                <Card.Meta>Blurb</Card.Meta>
                <Card.Description>Change the formation, cycle in the youngsters, or account for a recent injury Change the formation, cycle in the youngsters, or account for a recent injury Change the formation, cycle in the youngsters, or account for a recent injury</Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </Grid>
    </div>
)

export default FeatureCards
