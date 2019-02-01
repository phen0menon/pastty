import React, { Component } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { updateGuestPaste, createPaste } from "../actions/guestActions";
import { updateGuestSyntax } from "../actions/guestActions";
import { editorProps } from "../helpers/editorProps";
import { withRouter } from "react-router";
import { isNotEmpty } from "../helpers/validate";
import { enableLiveAutocompletion } from "brace/ext/language_tools";

class Editor extends Component {
  pasteHandler = () => {
    if (!isNotEmpty(this.props.editorValue)) return;

    if (
      this.props.editorStatus === "initial" &&
      this.props.editorValue !== this.props.previousEditorValue
    ) {
      const { editorValue, editorSyntax } = this.props;

      const payload = {
        name: "Test Paste",
        code: editorValue,
        description: "Test",
        type: editorSyntax,
        codeType: "snippet"
      };
      this.props.createPaste(payload, this.props.history);
    }
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
    var _editorProps = Object.assign({}, editorProps, {
      onChange: value => this.props.setEditorValue(value),
      value: this.props.editorValue,
      defaultValue: this.props.editorValue
    });

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
