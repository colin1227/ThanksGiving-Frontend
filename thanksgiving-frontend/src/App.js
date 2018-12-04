import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AllContainer from './components/allContainer/allContainer'
class App extends Component {

  render() {
    return (
      <div className="App">
        <div id='theLogo'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <AllContainer/>
        </div>
    );
  }
}

export default App;
