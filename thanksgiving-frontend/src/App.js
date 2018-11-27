import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Table from './components/Table';
class App extends Component {
  constructor(){
    super()
    this.state ={
      logged : false

    }
  }
  render() {
    return (
      <div className="App">
        <div id='theLogo'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {this.state.logged ? <Table /> : <Login logged={this.state.logged} />}
      </div>
    );
  }
}

export default App;
