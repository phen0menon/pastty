import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "components/Nav";
import Editor from "components/Editor";
import Paste from "components/Paste";
import "brace/theme/dracula";
import "./index.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="row main-module no-front-margins no-front-paddings">
          <Navbar />

          <Route exact path="/" component={Editor} />
          <Route path="/:paste" component={Paste} />
        </div>
      </Router>
    );
  }
}

export default App;
