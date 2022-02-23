import React, { Component } from "react";
import styles from "./pomodoro.module.css";
import { formatTimer } from "./pomodoro.validation";
import { resetForm } from "./pomodoro.helpers";
class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      disabledStatus: { start: 0, pause: 1, reset: 1 },
      msg: "Start the Pomodoro timer !!",
    };
  }

  startTimer = () => {
    const { minutes, seconds } = this.state;
    if (minutes < 0 || seconds < 0 || seconds >= 60) {
      this.setState({
        minutes: 0,
        seconds: 0,
        disabledStatus: { start: 0, pause: 1, reset: 1},
        msg: "Pls enter valid minute or second !!",
      });
      resetForm("form");
      return;
    }
    this.setState({
      disabledStatus: {start: 1, pause: 0, reset: 0 },
      msg: "Timer has Started !!",
    });

    this.interval = setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      } else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.interval);
          this.setState({
            minutes: 0,
            seconds: 0,
            disabledStatus: { start: 0, pause: 1, reset: 1 },
            msg: "Times Up !!",
          });
          resetForm("form");
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
      disabledStatus: { start: 0, pause: 1, reset: 0},
      msg: "Timer has been Paused !!",
    });
  };

  resetTimer = () => {
    clearInterval(this.interval);
    this.setState({
      minutes: 0,
      seconds: 0,
      disabledStatus: { start: 0, pause: 1, reset: 1},
      msg: "Start the Pomodoro timer again !!",
    });
    resetForm("form");
  };

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { minutes, seconds, disabledStatus, msg } = this.state;
    return (
      <div>
        <div className={styles.title}>Pomodoro Timer</div> <br />
        <br />
        <form id="form">
          <label> Minutes</label>
          <input type="number" name="minutes" onChange={this.inputHandler} />
          <label>Seconds </label>
          <input type="number" name="seconds" onChange={this.inputHandler} />
        </form>{" "}
        <br />
        <div>
          <button disabled={disabledStatus["start"]} onClick={this.startTimer}>
            {" "}
            START{" "}
          </button>
          <button disabled={disabledStatus["pause"]} onClick={this.pauseTimer}>
            {" "}
            PAUSE{" "}
          </button>
          <button disabled={disabledStatus["reset"]} onClick={this.resetTimer}>
            {" "}
            RESET{" "}
          </button>
        </div>
        <div className={styles.timer}>{formatTimer(minutes, seconds)}</div>
        <div className={styles.msg}>{msg}</div>
      </div>
    );
  }
}

export default Pomodoro;
