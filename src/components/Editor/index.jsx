import React, { Component } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import {
  updateGuestPaste,
  createPaste,
  updateGuestSyntax
} from "actions/editor";
import { editorProps } from "helpers/editorProps";
import { isNotEmpty } from "helpers/validate";
import { withRouter } from "react-router";
import { enableLiveAutocompletion } from "brace/ext/language_tools";
import "brace/mode/java";

class Editor extends Component {
  pasteHandler = () => {
    const {
      editorStatus,
      editorValue,
      previousEditorValue,
      editorSyntax
    } = this.props;

    if (
      !isNotEmpty(editorValue) ||
      (editorStatus !== "initial" && editorValue !== previousEditorValue)
    )
      return;

    const payload = {
      name: "Test Paste",
      code: editorValue,
      description: "Test",
      type: editorSyntax,
      codeType: "snippet"
    };
    this.props.createPaste(payload, this.props.history);
  };

  configureEditor = () => {
    const editor = window.ace.edit("paste");

    editor.getSession().setUseWorker(false);
    editor.renderer.setScrollMargin(3, 3);
    editor.commands.addCommand({
      name: "Save (update) paste",
      bindKey: { win: "Ctrl-s", mac: "Command-s" },
      exec: editor => {
        this.pasteHandler();
      }
    });

    editor.focus();
    editor.gotoLine(
      editor
        .getSession()
        .getValue()
        .split("\n").length
    );
    editor.navigateFileEnd();
  };

  componentDidMount() {
    this.configureEditor();
  }

  render() {
    const { editorValue, editorSyntax: mode } = this.props;

    let _editorProps = Object.assign({}, editorProps, {
      onChange: eValue => this.props.setEditorValue(eValue),
      value: editorValue,
      defaultValue: editorValue
    });

    if (mode) _editorProps = { ..._editorProps, mode };

    return (
      <div
        className="w-100"
        style={{ opacity: this.props.editorStatus === "loading" ? 0.5 : 1 }}
      >
        <div className="chat-sidebar d-none d-md-block">
          <div className="chat-sidebar-inner">
            <div className="paste-info">
              <div className="datetime text-center">
                {this.props.editorDescription}
              </div>
            </div>
          </div>
        </div>
        <div className="chat-module no-front-paddings">
          <div className="chat-module-inner">
            <AceEditor {..._editorProps} />
          </div>
        </div>
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
    setEditorValue: editorValue => dispatch(updateGuestPaste(editorValue)),
    createPaste: (payload, history) => dispatch(createPaste(payload, history)),
    setEditorSyntax: editorSyntax => dispatch(updateGuestSyntax(editorSyntax))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Editor)
);
