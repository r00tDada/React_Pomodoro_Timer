import React, { Component } from "react";
import "./pomodoro.css";

const input_style = {
  width: "100px",
  padding: "5px",
  border: "solid 5px",
  borderColor: "rgba(140, 241, 137, 0.966)",
  margin: "10px 30px 10px 10px",
};

export class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      disabled: false
    };
    this.minutesRef = React.createRef();
    this.secondsRef = React.createRef();
  }

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  startTimer = () => {
    this.interval = setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
      if (seconds == 0) {
        if (minutes == 0) {
          clearInterval(this.interval);
        } else {
          this.setState(( prevState ) => ({
            minutes: prevState.minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.interval);
  };

  resetTimer = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
    });
    this.minutesRef.current.value = "";
    this.secondsRef.current.value = "";
  };


  displayMinute(minute){
    if(minute<10){
      minute = "0" + minute;
    }
    return minute;
  }

  displaySecond(second) {
    if (second < 0) {
        second = "59"
    };
    if (second < 10 && second >= 0) {
        second = "0" + second
    }; 
    return second;
  }



  render() {
    const { minutes, seconds } = this.state;
    return (
      <div>
        <div className="title">Pomodoro Timer</div>
        <br />
        <br />
        <div>
          <label> Minutes</label>
          <input
            type="number"
            style={input_style}
            name="minutes"
            ref={this.minutesRef}
            onChange={this.inputHandler}
          />
          <label>Seconds </label>
          <input
            type="number"
            style={input_style}
            name="seconds"
            ref={this.secondsRef}
            onChange={this.inputHandler}
          />
        </div>
        <br />
        <div>
          <button disabled={this.state.disabled} onClick={this.startTimer} className="button">
            START
          </button>
          <button onClick={this.pauseTimer} className="button">
            PAUSE
          </button>
          <button onClick={this.resetTimer} className="button">
            RESET
          </button>
        </div>
        <h1>
          {this.displayMinute(minutes)} : {this.displaySecond(seconds)}
        </h1>
      </div>
    );
  }
}

export default Pomodoro;
