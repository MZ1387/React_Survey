import React, { Component } from 'react';

import Survey from './survey';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Survey</h2>
        </div>
        <Survey />
      </div>
    );
  }
}

export default App;
