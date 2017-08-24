import React from 'react'
import { Statistic } from 'semantic-ui-react'

const DataStatistics = () => (
  <div>
    <Statistic.Group widths='four'>
      <Statistic label='Leagues' value='30+' />
      <Statistic label='Teams' value='634' />
      <Statistic label='Players' value='17,588' />
      <Statistic label='Player Attributes' value='40+' />
    </Statistic.Group>
  </div>
)

export default DataStatistics
