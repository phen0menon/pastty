import React, { Component } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { updateGuestSyntax } from "actions/editor";

class SelectSyntax extends Component {
  handleSelect = event => {
    const selectedSyntax = event.target.value;

    // if (!selectedSyntax || selectedSyntax === "null") return;

    this.props.setEditorSyntax(selectedSyntax, () => {
      import(`brace/mode/${selectedSyntax}`).then(() => {
        window.ace
          .edit("paste")
          .getSession()
          .setMode("ace/mode/" + selectedSyntax);
      });
    });
  };
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
    setEditorSyntax: (syntax, callback) =>
      dispatch(updateGuestSyntax(syntax, callback))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectSyntax);
