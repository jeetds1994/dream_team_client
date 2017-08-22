import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2'
// import _isEqual from 'lodash/isEqual'

class PlayerRadarChart extends Component {
  constructor(props){
    super(props)
    this.state = {
      player: {},
      secondPlayer: {},
      chartData: {},
      chartOptions: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.state) {
      // let chartOptions = this.getChartOptions()

      // let player_keys = []
      // let player_values = []
      // if (nextProps.player.name) {
      //   player_keys = Object.keys(nextProps.player).splice(2, (Object.keys(nextProps.player).length - 3))
      //   player_values = Object.values(nextProps.player).splice(2, (Object.values(nextProps.player).length - 3))
      // }

      // Establish an averaging equation
      var average = (arr) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length

      // Separate out and create different arrays for players attributes and averages
      let attackAttributes = [
                          nextProps.player["attacking_position"],
                          nextProps.player["crossing"],
                          nextProps.player["short_pass"],
                          nextProps.player["long_pass"],
                          nextProps.player["shot_power"],
                          nextProps.player["finishing"],
                          nextProps.player["long_shots"],
                          nextProps.player["curve"],
                          nextProps.player["freekick_accuracy"],
                          nextProps.player["penalties"],
                          nextProps.player["volleys"]
                        ]

      let defenseAttributes = [
                            nextProps.player["marking"],
                            nextProps.player["sliding_tackle"],
                            nextProps.player["standing_tackle"],
                            nextProps.player["interceptions"]
                          ]

      let goalieAttributes = [
                              nextProps.player["gk_positioning"],
                              nextProps.player["gk_diving"],
                              nextProps.player["gk_kicking"],
                              nextProps.player["gk_handling"],
                              nextProps.player["gk_reflexes"]
                            ]

      let mentalityAttributes = [
                                  nextProps.player["aggression"],
                                  nextProps.player["vision"],
                                  nextProps.player["composure"]
                                ]

      let physicalAttributes = [
                                nextProps.player["reactions"],
                                nextProps.player["acceleration"],
                                nextProps.player["speed"],
                                nextProps.player["stamina"],
                                nextProps.player["strength"],
                                nextProps.player["balance"],
                                nextProps.player["agility"],
                                nextProps.player["jumping"],
                                nextProps.player["heading"]
                              ]

      let skillAttributes = [
                              nextProps.player["ball_control"],
                              nextProps.player["dribbling"]
                            ]

      let otherAttributes = [
                              nextProps.player["nationality"],
                              nextProps.player["club_name"],
                              nextProps.player["club_position"],
                              nextProps.player["club_kit"],
                              nextProps.player["rating"],
                              nextProps.player["height"],
                              nextProps.player["weight"],
                              nextProps.player["preferred_foot"],
                              nextProps.player["birth_date"],
                              nextProps.player["age"],
                              nextProps.player["work_rate"],
                              nextProps.player["weak_foot"],
                              nextProps.player["skill_moves"]
                            ]

      // Average the various metrics for player
      let attackRating = average(attackAttributes).toFixed(2)
      let defenseRating = average(defenseAttributes).toFixed(2)
      let mentalityRating = average(mentalityAttributes).toFixed(2)
      let physicalRating = average(physicalAttributes).toFixed(2)
      let skillRating = average(skillAttributes).toFixed(2)


      // Establish dummy arrays, in second player exists
      let attackAttributesSecond = []
      let defenseAttributesSecond = []
      let goalieAttributesSecond = []
      let mentalityAttributesSecond = []
      let physicalAttributesSecond = []
      let skillAttributesSecond = []
      let otherAttributesSecond = []
      let attackRatingSecond = []
      let defenseRatingSecond = []
      let mentalityRatingSecond = []
      let physicalRatingSecond = []
      let skillRatingSecond = []

      // If second player exists, separate out and create different arrays for players attributes
      if (nextProps.secondPlayer) {

        attackAttributesSecond = [
                            nextProps.secondPlayer["attacking_position"],
                            nextProps.secondPlayer["crossing"],
                            nextProps.secondPlayer["short_pass"],
                            nextProps.secondPlayer["long_pass"],
                            nextProps.secondPlayer["shot_power"],
                            nextProps.secondPlayer["finishing"],
                            nextProps.secondPlayer["long_shots"],
                            nextProps.secondPlayer["curve"],
                            nextProps.secondPlayer["freekick_accuracy"],
                            nextProps.secondPlayer["penalties"],
                            nextProps.secondPlayer["volleys"]
                          ]

        defenseAttributesSecond = [
                              nextProps.secondPlayer["marking"],
                              nextProps.secondPlayer["sliding_tackle"],
                              nextProps.secondPlayer["standing_tackle"],
                              nextProps.secondPlayer["interceptions"]
                            ]

        goalieAttributesSecond = [
                                nextProps.secondPlayer["gk_positioning"],
                                nextProps.secondPlayer["gk_diving"],
                                nextProps.secondPlayer["gk_kicking"],
                                nextProps.secondPlayer["gk_handling"],
                                nextProps.secondPlayer["gk_reflexes"]
                              ]

        mentalityAttributesSecond = [
                                    nextProps.secondPlayer["aggression"],
                                    nextProps.secondPlayer["vision"],
                                    nextProps.secondPlayer["composure"]
                                  ]

        physicalAttributesSecond = [
                                  nextProps.secondPlayer["reactions"],
                                  nextProps.secondPlayer["acceleration"],
                                  nextProps.secondPlayer["speed"],
                                  nextProps.secondPlayer["stamina"],
                                  nextProps.secondPlayer["strength"],
                                  nextProps.secondPlayer["balance"],
                                  nextProps.secondPlayer["agility"],
                                  nextProps.secondPlayer["jumping"],
                                  nextProps.secondPlayer["heading"]
                                ]

        skillAttributesSecond = [
                                nextProps.secondPlayer["ball_control"],
                                nextProps.secondPlayer["dribbling"]
                              ]

        otherAttributes = [
                            nextProps.secondPlayer["nationality"],
                            nextProps.secondPlayer["club_name"],
                            nextProps.secondPlayer["club_position"],
                            nextProps.secondPlayer["club_kit"],
                            nextProps.secondPlayer["rating"],
                            nextProps.secondPlayer["height"],
                            nextProps.secondPlayer["weight"],
                            nextProps.secondPlayer["preferred_foot"],
                            nextProps.secondPlayer["birth_date"],
                            nextProps.secondPlayer["age"],
                            nextProps.secondPlayer["work_rate"],
                            nextProps.secondPlayer["weak_foot"],
                            nextProps.secondPlayer["skill_moves"]
                          ]

        // Average the various metrics for second player
        attackRatingSecond = average(attackAttributesSecond).toFixed(2)
        defenseRatingSecond = average(defenseAttributesSecond).toFixed(2)
        mentalityRatingSecond = average(mentalityAttributesSecond).toFixed(2)
        physicalRatingSecond = average(physicalAttributesSecond).toFixed(2)
        skillRatingSecond = average(skillAttributesSecond).toFixed(2)
      }

      // Quick function to test if an object is empty
      function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false
        }
        return true
      }

      if (isEmpty(nextProps.player) && isEmpty(nextProps.secondPlayer)) {
        console.log("Case 1: There isn't nextProps.player yet")
        this.setState({
          chartData: {
            labels: ['Attack', 'Defense', 'Mental', 'Physical', 'Skill'],
            datasets: [{
                data: [attackRating, defenseRating, mentalityRating, physicalRating, skillRating],
      	        pointRadius: 5,
      	        pointHoverRadius: 5,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 1,
      	        pointHoverBorderWidth: 1,
                backgroundColor: 'rgba(0, 200, 200, 0.4)'
              }]
          },
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (!isEmpty(nextProps.player) && nextProps.player.club_position !== "GK" && isEmpty(nextProps.secondPlayer)) {
        console.log("Case 2: nextProps.player is not a GK, and there isn't a nextProps.secondPlayer. nextProps.player.club_position is:", nextProps.player.club_position)
        this.setState({
          chartData: {
            labels: ['Attack', 'Defense', 'Mental', 'Physical', 'Skill'],
            datasets: [{
                label: nextProps.player.name,
                data: [attackRating, defenseRating, mentalityRating, physicalRating, skillRating],
      	        pointRadius: 5,
      	        pointHoverRadius: 5,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 1,
      	        pointHoverBorderWidth: 1,
                backgroundColor: 'rgba(0, 200, 200, 0.4)'
              }]
          },
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (!isEmpty(nextProps.player) && nextProps.player.club_position === "GK" && isEmpty(nextProps.secondPlayer)) {
        console.log("Case 3: nextProps.player IS a GK, and there isn't a nextProps.secondPlayer. nextProps.player.club_position is:", nextProps.player.club_position)
        this.setState({
          chartData: {
            labels: ['Positioning', 'Diving', 'Kicking', 'Handling', 'Reflexes'],
            datasets: [{
                label: nextProps.player.name,
                data: goalieAttributes,
      	        pointRadius: 2,
      	        pointHoverRadius: 3,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 2,
      	        pointHoverBorderWidth: 2,
                backgroundColor: 'rgba(0, 200, 200, 0.4)'
              }]
          },
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (nextProps.player.club_position === "GK" && !isEmpty(nextProps.secondPlayer) && nextProps.secondPlayer.club_position === "GK") {
        console.log("Case 4: nextProps.player IS a GK, and there IS a nextProps.secondPlayer, and secondPlayer IS a GK. nextProps.player.club_position and nextProps.secondPlayer.club_position is:", nextProps.player.club_position, nextProps.secondPlayer.club_position)
        this.setState({
          chartData: {
            labels: ['Positioning', 'Diving', 'Kicking', 'Handling', 'Reflexes'],
            datasets: [{
                label: `${nextProps.player.name} vs. `,
                data: goalieAttributes,
      	        pointRadius: 2,
      	        pointHoverRadius: 3,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 2,
      	        pointHoverBorderWidth: 2,
                backgroundColor: 'rgba(0, 200, 200, 0.4)'
              },
              {
                  label: nextProps.secondPlayer.name,
                  data: goalieAttributesSecond,
        	        pointRadius: 2,
        	        pointHoverRadius: 3,
        	        pointBorderColor: "#fff",
        	        pointBorderWidth: 2,
        	        pointHoverBorderWidth: 2,
                  backgroundColor: 'rgba(240, 100, 90, 0.5)',
                }]
          },
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (!isEmpty(nextProps.secondPlayer) && nextProps.secondPlayer.club_position === "GK" && isEmpty(nextProps.player)) {
        console.log("Case 5: There isn't a nextProps.player, but nextProps.secondPlayer IS a GK. nextProps.secondPlayer.club_position is:", nextProps.player.club_position)
        this.setState({
          chartData: {
            labels: ['Positioning', 'Diving', 'Kicking', 'Handling', 'Reflexes'],
            datasets: [{
                label: nextProps.secondPlayer.name,
                data: goalieAttributesSecond,
      	        pointRadius: 2,
      	        pointHoverRadius: 3,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 2,
      	        pointHoverBorderWidth: 2,
                backgroundColor: 'rgba(240, 50, 50, 0.3)',
              }]
          },
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (!isEmpty(nextProps.player) && nextProps.player.club_position !== "GK" && !isEmpty(nextProps.secondPlayer) && nextProps.secondPlayer.club_position !== "GK") {
        console.log("Case 6: nextProps.player is not a GK, and there IS a nextProps.secondPlayer, and secondPlayer isn't a GK. nextProps.player.club_position and nextProps.secondPlayer.club_position is:", nextProps.player.club_position, nextProps.secondPlayer.club_position)
        this.setState({
          chartData: {
            labels: ['Attack', 'Defense', 'Mental', 'Physical', 'Skill'],
            datasets: [{
              label: nextProps.player.name,
                data: [attackRating, defenseRating, mentalityRating, physicalRating, skillRating],
      	        pointRadius: 5,
      	        pointHoverRadius: 5,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 1,
      	        pointHoverBorderWidth: 1,
                backgroundColor: 'rgba(0, 200, 200, 0.3)'
              },
              {
                label: nextProps.secondPlayer.name,
                data: [attackRatingSecond, defenseRatingSecond, mentalityRatingSecond, physicalRatingSecond, skillRatingSecond],
      	        pointRadius: 5,
      	        pointHoverRadius: 5,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 1,
      	        pointHoverBorderWidth: 1,
                backgroundColor: 'rgba(240, 50, 50, 0.3)',
              }]
          },
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (!isEmpty(nextProps.secondPlayer) && nextProps.secondPlayer.club_position !== "GK" && isEmpty(nextProps.player)) {
        console.log("Case 7: nextProps.secondPlayer is not a GK, and there isn't a nextProps.player. nextProps.secondPlayer.club_position is:", nextProps.secondPlayer.club_position)
        this.setState({
          chartData: {
            labels: ['Attack', 'Defense', 'Mental', 'Physical', 'Skill'],
            datasets: [{
                label: nextProps.secondPlayer.name,
                data: [attackRatingSecond, defenseRatingSecond, mentalityRatingSecond, physicalRatingSecond, skillRatingSecond],
      	        pointRadius: 5,
      	        pointHoverRadius: 5,
      	        pointBorderColor: "#fff",
      	        pointBorderWidth: 1,
      	        pointHoverBorderWidth: 1,
                backgroundColor: 'rgba(240, 50, 50, 0.3)',
              }]
          },
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (!isEmpty(nextProps.player) && nextProps.player.club_position !== "GK" && !isEmpty(nextProps.secondPlayer) && nextProps.secondPlayer.club_position === "GK") {
        console.log("Case 8: There are two players, but one is a goalie and one is a field player")
        this.setState({
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }

      if (!isEmpty(nextProps.player) && nextProps.player.club_position === "GK" && !isEmpty(nextProps.secondPlayer) && nextProps.secondPlayer.club_position !== "GK") {
        console.log("Case 9: There are two players, but one is a goalie and one is a field player")
        this.setState({
          player: nextProps.player,
          secondPlayer: nextProps.secondPlayer
        })
      }
    }
  }

  // getChartOptions = () => {
  //
  //   return chartOptions
  // }

  render() {

    function isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false
      }
      return true
    }

    const divStyle = {
      width: '300px',
      height: '300px'
    }

    const chartOptions = {
      maintainAspectRatio: false,
      showLines: true,
      showAllTooltips: true, //only needed if you enable the componentWillMount method commented above
      title:    {
                  display: true,
                  text: isEmpty(this.state.player) && isEmpty(this.state.secondPlayer) ? "Please Select a Player" : isEmpty(this.state.secondPlayer) ? `#${this.state.player.club_kit} ${this.state.player.club_position} ${this.state.player.name} -- Age ${this.state.player.age}` : isEmpty(this.state.player) ? `#${this.state.secondPlayer.club_kit} ${this.state.secondPlayer.club_position} ${this.state.secondPlayer.name} -- Age ${this.state.secondPlayer.age}` : this.state.player.club_position === `GK` && this.state.secondPlayer.club_position !== `GK` ? `You can't compare Keepers and Field Players` : this.state.player.club_position !== `GK` && this.state.secondPlayer.club_position === `GK` ? `You can't compare Keepers and Field Players` : `${this.state.player.name} vs. ${this.state.secondPlayer.name}`,
                  fontSize: 16,
                  position: "top",
                  fontColor: "black"
                },
      animation:{
                  duration: 1000,
                },
      layout:   {
                padding: {
                  left: 5,
                  right: 5,
                  top: 0,
                  bottom: 10
                  }
                },
      scale:   {
                display: true,
                ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                      }
                },
      legend:   {
                  display: false
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
        <Radar
          data={this.state.chartData}
          options={chartOptions}
        />
      </div>
    )
  }
}

export default PlayerRadarChart
