import React, { Component } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { updateGuestSyntax } from "../actions/guestActions";

import "../helpers/acemodes";
import "brace/theme/xcode";

class SelectSyntax extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(event) {
    const selectedSyntax = event.target.value;

    this.props.setEditorSyntax(selectedSyntax);

    window.ace
      .edit("paste")
      .getSession()
      .setMode("ace/mode/" + selectedSyntax);
  }
  render() {
    return (
      <select
        value={this.props.editorSyntax}
        className="form-control"
        onChange={this.handleSelect}
      >
        <option value="java">Java 8</option>
        <option value="c_cpp">C / C++</option>
        <option value="javascript">JavaScript</option>
        <option value="kotlin">Kotlin</option>
        <option value="golang">Golang</option>
        <option value="python">Python</option>
        <option value="rust">Rust</option>
        <option value="typescript">TypeScript</option>
      </select>
    );
  }
}

const mapStateToProps = store => {
  return {
    editorSyntax: store.guest.editorSyntax
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditorSyntax: editorSyntax => dispatch(updateGuestSyntax(editorSyntax))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSyntax);
