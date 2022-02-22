import React, { Component } from "react";
import "./pomodoro.css";
class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      disabled: [false, true, true],
      msg: "Start the Pomodoro timer !!",
    };
    this.minutesRef = React.createRef();
    this.secondsRef = React.createRef();
  }

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  startTimer = () => {
    this.setState({
      disabled: [true, false, false],
      msg: "Timer has Started !!",
    });
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
          this.setState({
            minutes: 0,
            seconds: 0,
            disabled: [false, true, true],
            msg: "Times Up !!!!",
          });
          this.minutesRef.current.value = "";
          this.secondsRef.current.value = "";
        } else {
          this.setState((prevState) => ({
            minutes: prevState.minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.interval);
    this.setState({
      disabled: [false, true, false],
      msg: "Timer has been Paused !!",
    });
  };

  resetTimer = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      disabled: [false, true, true],
      msg: "Start the Pomodoro timer again !!",
    });
    this.minutesRef.current.value = "";
    this.secondsRef.current.value = "";
  };

  displayMinute(minute) {
    if (minute < 10) {
      minute = "0" + minute;
    }
    return minute;
  }

  displaySecond(second) {
    if (second < 0) {
      second = "59";
    }
    if (second < 10 && second >= 0) {
      second = "0" + second;
    }
    return second;
  }

  render() {
    const { minutes, seconds, disabled, msg } = this.state;
    return (
      <div>
        <div className="title">Pomodoro Timer</div>
        <br />
        <br />
        <div>
          <label> Minutes</label>
          <input
            type="number"
            name="minutes"
            className="input_box"
            ref={this.minutesRef}
            onChange={this.inputHandler}
          />
          <label>Seconds </label>
          <input
            type="number"
            name="seconds"
            className="input_box"
            ref={this.secondsRef}
            onChange={this.inputHandler}
          />
        </div>
        <br />
        <div>
          <button
            disabled={disabled[0]}
            onClick={this.startTimer}
            className="button"
            id="start"
          >
            START
          </button>
          <button
            disabled={disabled[1]}
            onClick={this.pauseTimer}
            className="button"
            id="pause"
          >
            PAUSE
          </button>
          <button
            disabled={disabled[2]}
            onClick={this.resetTimer}
            className="button"
            id="reset"
          >
            RESET
          </button>
        </div>
        <div className="timer">
          {this.displayMinute(minutes)} : {this.displaySecond(seconds)}
        </div>
        <div className="msg">{msg}</div>
      </div>
    );
  }
}

export default Pomodoro;
