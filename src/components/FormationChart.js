import React, { Component } from 'react'
import { Scatter } from 'react-chartjs-2'
// import _isEqual from 'lodash/isEqual'

class FormationChart extends Component {
  constructor(props){
    super(props)
    this.state = {
      club: {},
      formation: {},
      starters: {},
      chartData: {}
    }
  }


  // componentWillReceiveProps(nextProps) {
  //   if(!_isEqual(nextProps, this.state)){
  //       this.setState(nextProps)
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.chartData !== this.state.chartData) {
  //       this.setState({
  //         chartData: {
  //           labels: nextProps.chartData.map(starter => `${starter.name.split(' ')[0]} - ${starter.club_position}`),
  //           datasets: [{
  //               label: "Player Ratings",
  //               data: nextProps.chartData.map(starter => starter.rating),
  //               backgroundColor: 'rgba(240, 100, 90, 1)'
  //             }]
  //         }
  //       })
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.state) {

      let positionalData = []
      switch (nextProps.formation.format) {
        case "4-4-2":
          positionalData = [{x:5, y:0}, {x:2, y:2}, {x:4, y:2}, {x:6, y:2}, {x:8, y:2}, {x:2, y:5}, {x:4, y:5}, {x:6, y:5}, {x:8, y:5}, {x:4, y:8}, {x:6, y:8}]
          break
        case "4-5-1":
          positionalData = [{x:5, y:0}, {x:2, y:2}, {x:4, y:2}, {x:6, y:2}, {x:8, y:2}, {x:4, y:4.5}, {x:6, y:4.5}, {x:5, y:7}, {x:1.5, y:8}, {x:8.5, y:8}, {x:5, y:9}]
          break
        case "3-5-2":
          positionalData = [{x:5, y:0}, {x:3, y:2}, {x:5, y:2}, {x:7, y:2}, {x:4, y:4.5}, {x:6, y:4.5}, {x:5, y:7}, {x:1.5, y:6}, {x:8.5, y:6}, {x:4, y:9}, {x:6, y:9}]
          break
        case "3-4-3":
          positionalData = [{x:5, y:0}, {x:3, y:2}, {x:5, y:2}, {x:7, y:2}, {x:2, y:5}, {x:4, y:5}, {x:6, y:5}, {x:8, y:5}, {x:3, y:8}, {x:5, y:8}, {x:7, y:8}]
          break
        case "4-3-3":
          positionalData = [{x:5, y:0}, {x:2, y:2}, {x:4, y:2}, {x:6, y:2}, {x:8, y:2}, {x:3, y:5}, {x:5, y:5}, {x:7, y:5}, {x:3, y:8}, {x:5, y:8}, {x:7, y:8}]
          break
        case "5-3-2":
          positionalData = [{x:5, y:0}, {x:1, y:3}, {x:3, y:2}, {x:5, y:2}, {x:7, y:2}, {x:9, y:3}, {x:4, y:4.5}, {x:6, y:4.5}, {x:5, y:6}, {x:4, y:8}, {x:6, y:8}]
          break
        case "5-4-1":
          positionalData = [{x:5, y:0}, {x:1, y:3}, {x:3, y:2}, {x:5, y:2}, {x:7, y:2}, {x:9, y:3}, {x:5, y:4.5}, {x:3, y:5.5}, {x:7, y:5.5}, {x:5, y:6.5}, {x:5, y:8.5}]
          break

      }

        this.setState({
          chartData: {
            // labels: nextProps.chartData.map(starter => `${starter.name.split(' ')[0]} - ${starter.club_position}`),
            datasets: [{
                label: "Team 1",
                data: positionalData,
      	        pointRadius: 10,
      	        pointHoverRadius: 10,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 1,
                backgroundColor: 'rgba(240, 100, 90, 1)'
              }]
          },
          club: nextProps.club,
          formation: nextProps.formation,
          starters: nextProps.starters
        })
    }
  }

  // var divStyle = {
  //   color: 'white',
  //   backgroundImage: 'url(' + imgUrl + ')',
  //   WebkitTransition: 'all', // note the capital 'W' here
  //   msTransition: 'all' // 'ms' is the only lowercase vendor prefix
  // };

  render() {
    const divStyle = {
      width: '200px',
      height: '300px',
      backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Soccer_Field_Transparant.svg/2000px-Soccer_Field_Transparant.svg.png)'
    }

    const chartOptions = {
      maintainAspectRatio: false,
      showLines: false,
      // chartArea: {backgroundColor: 'rgba(50, 200, 150, 0.3)'},
      title:    {
                  display: true,
                  text: `${this.state.club.name} -- ${this.state.formation.format}`,
                  fontSize: 25,
                  position: "top",
                  fontColor: "black"
                },
      scales:   {
                  xAxes: [{display: false,}],
                  yAxes: [{display: false,}]
                },
      legend:   {
                  display: false,
                },
      tooltips: {
                  enabled: true,
                  titleFontSize: 24,
                }

    }

    return (
      <div style={divStyle} className="chart">
        <Scatter
          data={this.state.chartData}
          options={chartOptions}
        />
      </div>
    )
  }
}

export default FormationChart
