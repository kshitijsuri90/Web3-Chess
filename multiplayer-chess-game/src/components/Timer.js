import * as React from "react";
import Typography from "@mui/material/Typography";

class SimpleCountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      count: 30,
      playerTurnToMoveIsWhite: props.playerTurnToMoveIsWhite,
      paused: false,
      seconds: "00",
      minutes: (Number(props.time)/60).toString(),
    };

    this.timer = setInterval(() => this.tick(), props.timeout || 1000);
    this.convertCountToTime(props.time);
  }

  convertCountToTime(count) {
    var seconds = count % 60;
    var secondString = "";
    if (Number(seconds) < 10) {
      secondString = "0";
    }
    secondString += seconds;
    var minutes = Math.floor(count / 60);
    var minuteString = "";
    if (Number(minutes) < 10) {
      minuteString += "0";
    }
    minuteString += minutes;
    this.setState({
      seconds: secondString,
      minutes: minuteString,
    });
  }

  tick() {
    const countdown = this.state.count;
    if (this.props.paused) return;
    if (countdown === 0) {
      if (this.state.playerTurnToMoveIsWhite) {
        alert("Time's up. Black wins!");
        clearInterval(this.timer);
        this.props.gameOverMethod(true);
      } else {
        alert("Time's up. White wins!");
        clearInterval(this.timer);
        this.props.gameOverMethod(true);
      }
    } else {
      //console.log(this.state.playerTurnToMoveIsWhite + " " + countdown);
      this.setState({
        count: countdown - 1,
      });
      this.convertCountToTime(countdown);
    }
  }

  render() {
    var settings = {
      count: this.state.count,
      border: true,
      showTitle: true,
      noPoints: true,
    };
    return (
      <div className="App">
        <div>
          <Typography component="h1" variant="h3">
            {this.state.minutes}:{this.state.seconds}
          </Typography>
        </div>
      </div>
    );
  }
}

export default SimpleCountdownTimer;
