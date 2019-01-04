import React, { Component } from "react";
import SelectSyntax from "../widgets/SelectSyntax";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  createPaste,
  setStatusToGuest,
  forkPaste
} from "../actions/guestActions";
import { withRouter } from "react-router";
import { isNotEmpty } from "../helpers/validate";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.createAndSavePaste = this.createAndSavePaste.bind(this);
  }
  createAndSavePaste() {
    let {
      editorValue,
      editorStatus,
      previousEditorValue,
      editorSyntax
    } = this.props;

    if (!isNotEmpty(editorValue)) return;

    if (editorStatus !== "paste" && editorValue !== previousEditorValue) {
      const payload = {
        name: "Test Paste",
        code: editorValue,
        description: "Test",
        type: editorSyntax,
        codeType: "snippet"
      };
      this.props.createPaste(payload, this.props.history);
    } else {
      this.props.forkPaste(this.props.history);
    }
  }
  render() {
    return (
      <div className="header-module col-12 no-front-paddings">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/" className="navbar-brand">
            Pastty
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main_navbar"
            aria-controls="main_navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="main_navbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active ml-2">
                <Link
                  to="/"
                  className="btn btn-primary"
                  onClick={() => this.props.setStatusToGuest()}
                >
                  <i className="fas fa-plus-circle" /> New
                </Link>
              </li>
              <li className="nav-item ml-2">
                <button
                  className="btn btn-success"
                  onClick={this.createAndSavePaste}
                >
                  {this.props.editorStatus === "paste" ? (
                    <>
                      <i className="fas fa-code-branch" /> Fork
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save" /> Save
                    </>
                  )}
                </button>
              </li>
              <li className="nav-item ml-2">
                <SelectSyntax />
              </li>
            </ul>
          </div>

          <a
            href="https://github.com/phen0menon/pastty"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-secondary my-2 my-sm-0"
          >
            <i className="fab fa-github" /> GitHub
          </a>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    editorValue: store.guest.editorValue,
    editorSyntax: store.guest.editorSyntax,
    editorStatus: store.guest.editorStatus,
    createdPasteLink: store.guest.createdPasteLink,
    previousEditorValue: store.guest.previousEditorValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPaste: (payload, history) => dispatch(createPaste(payload, history)),
    setStatusToGuest: () => dispatch(setStatusToGuest()),
    forkPaste: history => dispatch(forkPaste(history))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
