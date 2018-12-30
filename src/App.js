import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import brace from 'brace';
import AceEditor from 'react-ace';

import Navbar from './components/Nav'
import Guest from './components/Guest'
import Paste from './components/Paste'

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return(
      <Router>
        <div className="row main-module no-front-margins">
          <Navbar />

          <Route exact path="/" component={Guest} />
          <Route path="/:paste" component={Paste} />
        </div>
      </Router>

    )
  }
}

export default App;
