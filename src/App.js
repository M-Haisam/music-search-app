import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Results from './Components/Results/Results';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/results' component={Results} />
        </Router>
      </div>
    );
  }
}

export default App;
