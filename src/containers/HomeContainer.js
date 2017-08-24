import React, { Component } from 'react'
// import { Image, Segment } from 'semantic-ui-react'
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
              <span style={{fontSize: '0.85em', color:'#ffffff'}}>{`{`}&nbsp;</span><span style={{fontSize: '0.85em', color:'#ffffff'}}><img src='/white-logo.png' alt='logo' style={{width: '48px', height: '48px'}} />{`DREAM`}</span><span style={{fontSize: '0.85em', color:'#88f2e8'}}>TEAM</span><span style={{fontSize: '0.85em', color:'#ffffff'}}>&nbsp;{`}`}</span>
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
          <div className='ui container'>
            <div>
              <br/>
              <DataStatistics />
              <br/>
            </div>
            <FeatureCards />
          </div>
      </div>
    )
  }

}

export default HomeContainer
