import React, { Component } from "react";
import SelectSyntax from "components/SelectSyntax";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPaste, setStatusToGuest, forkPaste } from "actions/editor";
import { withRouter } from "react-router";
import { isNotEmpty } from "helpers/validate";

class Navbar extends Component {
  createAndSavePaste = () => {
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
  };
  render() {
    return (
      <div className="header-module col-12 no-front-paddings">
        <nav class="navbar navbar-expand navbar-dark bg-dark py-2">
          <a class="navbar-brand  d-none d-sm-block" href="#">Pastty</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-sm-auto">
              <li class="nav-item active">
                <Link
                  to="/"
                  className="btn btn-primary"
                  onClick={() => this.props.setStatusToGuest()}
                >
                  <i className="fas fa-plus-circle" /> New
                  </Link>      </li>

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
              <li className="nav-item ml-2 syntax-select-item">
                <SelectSyntax />
              </li>
            </ul>
            <div class="col-sm-20 d-none d-sm-block">
              <form class="form-inline my-2 my-lg-0 ">
                <a
                  href="https://github.com/phen0menon/pastty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary my-2 my-sm-0"
                >
                  <i className="fab fa-github" /> GitHub
            </a>
              </form>
            </div>
          </div>
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
