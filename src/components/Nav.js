import React, { Component } from 'react';
import SelectSyntax from '../widgets/SelectSyntax'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div className="header-module col-12 no-front-paddings">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">Pastty</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_navbar" aria-controls="main_navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="main_navbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active ml-2">
                <Link to="/" className="btn btn-primary">New Paste</Link>
              </li>
              <li className="nav-item ml-2">
                <button className="btn btn-success">Save (Ctrl + S)</button>
              </li>
              <li className="nav-item ml-2">
                <button className="btn btn-warning">Share</button>
              </li>
              <li className="nav-item ml-2">
                <SelectSyntax />
              </li>
            </ul>
          </div>
          <div className="my-2 my-lg-0">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">GitHub</button>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;
