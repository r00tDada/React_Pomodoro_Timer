import React, { Component } from "react";
import styles from "./pomodoro.module.css";

// 1. Not to use createRef in the input box => done
// 2. disabled value should be the object => status - done
// 3. Write down the validation folder

class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0,
      disabledStatus: {
        "start" : 0,
        "pause" : 1,
        "reset"  : 1,
      },
      msg: "Start the Pomodoro timer !!",
    };
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
        disabledStatus: {
          "start" : 1,
          "pause" : 0,
          "reset"  : 0,
        },
        msg: "Pls enter valid minute or second !!",
      });
      return;
    }
    this.setState({
      disabledStatus: {
        "start" : 1,
        "pause" : 0,
        "reset"  : 0,
      },
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
            disabledStatus: {
              "start" : 0,
              "pause" : 1,
              "reset"  : 1,
            },
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
      disabledStatus: {
        "start" : 0,
        "pause" : 1,
        "reset"  : 0,
      },
      msg: "Timer has been Paused !!",
    });
  };

  resetTimer = () => {
    clearInterval(this.interval);
    this.setState({
      minutes: 0,
      seconds: 0,
      disabledStatus: {
        "start" : 0,
        "pause" : 1,
        "reset"  : 1,
      },
      msg: "Start the Pomodoro timer again !!",
    });
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
    const { minutes, seconds, disabledStatus, msg } = this.state;
    return (
      <div>
        <div className={styles.title}>Pomodoro Timer</div>
        <br />
        <br />
        <div>
          <label> Minutes</label>
          <input
            type="number"
            name="minutes"
            className={styles.input_box}
            onChange={this.inputHandler}
          />
          <label>Seconds </label>
          <input
            type="number"
            name="seconds"
            className={styles.input_box}
            onChange={this.inputHandler}
          />
        </div>
        <br />
        <div>
          <button
            disabled={disabledStatus["start"]}
            onClick={this.startTimer}
            id="start"
          >
            START
          </button>
          <button
            disabled={disabledStatus["pause"]}
            onClick={this.pauseTimer}
            id="pause"
          >
            PAUSE
          </button>
          <button
            disabled={disabledStatus["reset"]}
            onClick={this.resetTimer}
            id="reset"
          >
            RESET
          </button>
        </div>
        <div className={styles.timer}>
            {/* 1. Declare a function what to print */}
            {(minutes <0 || seconds <0 || seconds>60) && <div>00 : 00</div>}
            {minutes>=0 && seconds>=0 && seconds<60 &&
                this.formatTimer(minutes, seconds)}</div>
        <div className={styles.msg}>{msg}</div>
      </div>
    );
  }
}

export default Pomodoro;
