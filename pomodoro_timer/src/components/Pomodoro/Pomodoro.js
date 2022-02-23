import React, { Component } from "react";
import "./pomodoro.css";

// 1. Not to use createRef in the input box 
// 2. disabled value should be the object => status
// 3. Write down the validation folder
class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
    //   disabledStatus: {
    //       "start" : 

    //   }
      disabled: [false, true, true],
      msg: "Start the Pomodoro timer !!",
    };
    // 2. To eliminate this
    this.minutesRef = React.createRef();
    this.secondsRef = React.createRef();
  }

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  startTimer = () => {
    const { minutes, seconds} = this.state;
    if (minutes < 0 || seconds < 0 || seconds >= 60) {
      this.setState({
        minutes:0,
        seconds:0,
        disabled: [false, true, true],
        msg: "Pls enter valid minute or second !!",
      });
      return;
    }
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
      else if (seconds == 0) {
        if (minutes == 0) {
          clearInterval(this.interval);
          this.setState({
            minutes: 0,
            seconds: 0,
            disabled: [false, true, true],
            msg: "Times Up !!",
          });
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
    clearInterval(this.interval);
    this.setState({
      minutes: 0,
      seconds: 0,
      disabled: [false, true, true],
      msg: "Start the Pomodoro timer again !!",
    });
    this.minutesRef.current.value = "";
    this.secondsRef.current.value = "";
  };

  formatTimer(minute, second) {
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 0) {
      second = "59";
    }
    if (second < 10 && second >= 0) {
      second = "0" + second;
    }
    return `${minute} : ${second}`;
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
            {/* 1. Declare a function what to print */}
            {(minutes <0 || seconds <0 || seconds>60) && <div>00 : 00</div>}
            {minutes>=0 && seconds>=0 && seconds<60 &&
                this.formatTimer(minutes, seconds)}</div>
        <div className="msg">{msg}</div>
      </div>
    );
  }
}

export default Pomodoro;
