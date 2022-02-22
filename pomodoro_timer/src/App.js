import './App.css';
import React, { Component } from 'react'
import Pomodoro from './components/Pomodoro';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Pomodoro/>
      </div>
    )
  }
}

export default App;
