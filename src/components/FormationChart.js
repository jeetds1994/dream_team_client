import React, { Component } from 'react'
import { Scatter } from 'react-chartjs-2'
// import _isEqual from 'lodash/isEqual'

class FormationChart extends Component {
  constructor(props){
    super(props)
    this.state = {
      club: {},
      formation: {},
      starters: [],
      firstPlayer: {},
      chartData: {}
    }
  }

  // Allows tooltips to always be shown; must import 'Chart' from react-chartjs-2
  // componentWillMount() {
  //   Chart.pluginService.register({
  //     beforeRender: function (chart) {
  //       if (chart.config.options.showAllTooltips) {
  //         chart.pluginTooltips = [];
  //         chart.config.data.datasets.forEach(function (dataset, i) {
  //           chart.getDatasetMeta(i).data.forEach(function (sector, j) {
  //             chart.pluginTooltips.push(new Chart.Tooltip({
  //               _chart: chart.chart,
  //               _chartInstance: chart,
  //               _data: chart.data,
  //               _options: chart.options.tooltips,
  //               _active: [sector]
  //             }, chart));
  //           });
  //         });
  //         // turn off normal tooltips
  //         chart.options.tooltips.enabled = false;
  //       }
  //     }, afterDraw: function (chart, easing) {
  //       if (chart.config.options.showAllTooltips) {
  //         // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
  //         if (!chart.allTooltipsOnce) {
  //           if (easing !== 1) return;
  //           chart.allTooltipsOnce = true;
  //         }
  //         chart.options.tooltips.enabled = true;
  //         Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
  //           tooltip.initialize();
  //           tooltip.update(); // we don't actually need this since we are not animating tooltips
  //           tooltip.pivot();
  //           tooltip.transition(easing).draw();
  //         });
  //         chart.options.tooltips.enabled = false;
  //       }
  //     }
  //   })
  // }

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
      let starterNames = []
      if (nextProps.starters) {
        starterNames = nextProps.starters.map((starter, index) => starter.name + ' - ' + nextProps.formation[`position_${index+1}`])
      }

      let positionalData = []
      switch (nextProps.formation.format) {
        case "4-4-2":
          positionalData = [{x:5, y:0.5}, {x:2, y:3}, {x:4, y:3}, {x:6, y:3}, {x:8, y:3}, {x:2, y:6}, {x:4, y:6}, {x:6, y:6}, {x:8, y:6}, {x:4, y:9}, {x:6, y:9}]
          break
        case "4-5-1":
          positionalData = [{x:5, y:0.5}, {x:2, y:3}, {x:4, y:3}, {x:6, y:3}, {x:8, y:3}, {x:4, y:5.5}, {x:6, y:5.5}, {x:5, y:7.5}, {x:1.5, y:8.5}, {x:8.5, y:8.5}, {x:5, y:9.5}]
          break
        case "3-5-2":
          positionalData = [{x:5, y:0.5}, {x:3, y:3}, {x:5, y:3}, {x:7, y:3}, {x:4, y:5}, {x:6, y:5}, {x:5, y:7.5}, {x:1.5, y:6.5}, {x:8.5, y:6.5}, {x:4, y:9.5}, {x:6, y:9.5}]
          break
        case "3-4-3":
          positionalData = [{x:5, y:0.5}, {x:3, y:3}, {x:5, y:3}, {x:7, y:3}, {x:2, y:6}, {x:4, y:6}, {x:6, y:6}, {x:8, y:6}, {x:3, y:9}, {x:5, y:9}, {x:7, y:9}]
          break
        case "4-3-3":
          positionalData = [{x:5, y:0.5}, {x:2, y:3}, {x:4, y:3}, {x:6, y:3}, {x:8, y:3}, {x:3, y:6}, {x:5, y:6}, {x:7, y:6}, {x:3, y:9}, {x:5, y:9}, {x:7, y:9}]
          break
        case "5-3-2":
          positionalData = [{x:5, y:0.5}, {x:1, y:4}, {x:3, y:3}, {x:5, y:3}, {x:7, y:3}, {x:9, y:4}, {x:4, y:5.5}, {x:6, y:5.5}, {x:5, y:7}, {x:4, y:9}, {x:6, y:9}]
          break
        case "5-4-1":
          positionalData = [{x:5, y:0.5}, {x:1, y:4}, {x:3, y:3}, {x:5, y:3}, {x:7, y:3}, {x:9, y:4}, {x:5, y:5.5}, {x:2.5, y:6.5}, {x:7.5, y:6.5}, {x:5, y:7.5}, {x:5, y:9.5}]
          break
        default:
          console.log("No props yet")
      }

      let chartOptions = this.getChartOptions()

        this.setState({
          chartData: {
            labels: starterNames,
            datasets: [{
                label: "Team 1",
                data: positionalData,
      	        pointRadius: 15,
      	        pointHoverRadius: 18,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 2,
      	        pointHoverBorderWidth: 3,
                // backgroundColor: 'rgba(0, 200, 200, 1)'
                backgroundColor: 'rgba(240, 100, 90, 1)',
                pointHoverBackgroundColor: 'rgba(0, 100, 200, 1)'
              }]
          },
          chartOptions: chartOptions,
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

  getChartOptions = () => {
    const chartOptions = {
      maintainAspectRatio: false,
      showLines: false,
      showAllTooltips: true, //only needed if you enable the componentWillMount method commented above
      onClick: function(c,i) {
                  let e = i[0]
                  console.log(e._index)
                  var x_value = this.data.labels[e._index]
                  var y_value = this.data.datasets[0].data[e._index]
                  console.log(x_value)
                  console.log(y_value)
                 },
      title:    {
                  display: true,
                  text: `${this.state.club.name}: ${this.state.formation.format}`,
                  fontSize: 24,
                  position: "top",
                  fontColor: "black"
                },
      animation:{
                  duration: 1200,
                },
      layout:   {
                padding: {
                  left: 5,
                  right: 5,
                  top: 0,
                  bottom: 10
                  }
                },
      scales:   {
                  xAxes: [{
                    display: false,
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 10,
                      }
                    }],
                  yAxes: [{
                    display: false,
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 10,
                    }
                  }]
                },
      legend:   {
                  display: false,
                },
      tooltips: {
                  enabled: true,
                  legend: false,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  bodyFontSize: 16,
                  callbacks: {
                    label: function(tooltipItem, data) {
                       var label = data.labels[tooltipItem.index]
                       return label
                    }
                  }
                }
    }
    return chartOptions
  }

  render() {
    const divStyle = {
      width: '300px',
      height: '450px',
      backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Soccer_Field_Transparant.svg/2000px-Soccer_Field_Transparant.svg.png)'
    }

    function isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false
      }
      return true
    }

    const chartOptions = {
      // This is from https://github.com/emn178/Chart.PieceLabel.js -- Can remove if other solution is found
      // pieceLabel: {
      //   // render 'label', 'value', 'percentage' or custom function, default is 'percentage'
      //   render: 'label',
      //   showZero: true,
      //   fontSize: 12,
      //   // position to draw label, available value is 'default', 'border' and 'outside'
      //   position: 'outside',
      //   // draw label even it's overlap, default is false
      //   overlap: true
      // },
      maintainAspectRatio: false,
      showLines: false,
      showAllTooltips: true, //only needed if you enable the componentWillMount method commented above
      // chartArea: {backgroundColor: 'rgba(50, 200, 150, 0.3)'},
      // events: ['click'],
      onClick: function(c,i) {
                  let e = i[0]
                  console.log(e._index)
                  var x_value = this.data.labels[e._index]
                  var y_value = this.data.datasets[0].data[e._index]
                  console.log(x_value)
                  console.log(y_value)
                 },
      title:    {
                  display: true,
                  text: !isEmpty(this.state.club) ? `${this.state.club.name}: ${this.state.formation.format}` : '',
                  fontSize: 24,
                  position: "top",
                  fontColor: "black"
                },
      animation:{
                  duration: 1200,
                },
      layout:   {
                padding: {
                  left: 5,
                  right: 5,
                  top: 0,
                  bottom: 10
                  }
                },
      scales:   {
                  xAxes: [{
                    display: false,
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 10,
                      }
                    }],
                  yAxes: [{
                    display: false,
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 10,
                    }
                  }]
                },
      legend:   {
                  display: false,
                },
      tooltips: {
                  enabled: true,
                  legend: false,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  bodyFontSize: 16,
                  callbacks: {
                    label: function(tooltipItem, data) {
                       var label = data.labels[tooltipItem.index]
                       return label
                    }
                  }
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
