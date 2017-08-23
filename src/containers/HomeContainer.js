import React, { Component } from 'react'
import { Image, Segment } from 'semantic-ui-react'
// import { Dimmer, Loader } from 'semantic-ui-react'
import FeatureCards from '../components/FeatureCards'
import DataStatistics from '../components/DataStatistics'

class HomeContainer extends Component {

  render() {
    return(
      <div>
          <div>
            <div id='landing-page' className='home-text'>
            <br/>
            <br/>
            <br/>
            <span style={{color:'#ffffff'}}>{`{`}&nbsp;</span><span style={{color:'#ffffff'}}>{`DREAM`}</span><span style={{color:'#88f2e8'}}>TEAM</span><span style={{color:'#ffffff'}}>&nbsp;{`}`}</span>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
          </div>
        <Segment>
          <div className='ui container'>
            <div>
              <DataStatistics />
              <br/>
            </div>
            <FeatureCards />
          </div>
        </Segment>
      </div>
    )
  }

}

export default HomeContainer
