import React, { Component } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { fetchPaste } from "../actions/guestActions";
import { editorPropsPaste } from "../helpers/editorProps";
import { withRouter } from "react-router";
import { currentDomain } from "../helpers/constants";
import * as moment from "moment";

class Paste extends Component {
  componentDidMount() {
    this.props.fetchPaste(this.props.match.params.paste, this.props.history);

    const editor = window.ace.edit("paste");

    editor.renderer.setScrollMargin(3, 3);
    editor.setOptions({
      readOnly: true,
      highlightActiveLine: false,
      highlightGutterLine: false
    });
    editor.renderer.$cursorLayer.element.style.display = "none";
    editor.getSession().setUseWorker(false);
  }
  render() {
    var _editorPropsPaste = Object.assign({}, editorPropsPaste, {
      onChange: value => this.props.setEditorValue(value),
      value: this.props.editorValue,
      defaultValue: this.props.editorValue,
      mode: this.props.editorSyntax
    });

    return (
      <div className="w-100">
        <div className="chat-sidebar d-none d-md-block">
          <div className="chat-sidebar-inner">
            <div className="paste-info">
              <div className="form-group">
                <div className="undertitle">Author</div>
                <div>{this.props.pasteAuthor}</div>
              </div>

              <div className="form-group">
                <div className="undertitle">Created at</div>
                <div>{this.props.pasteTimeCreated}</div>
              </div>

              <div className="form-group">
                <div className="undertitle">Description</div>
                <div>{this.props.editorDescription}</div>
              </div>

              <div className="form-group">
                <label className="undertitle">Link</label>
                <input
                  className="form-control"
                  onFocus={event => event.target.select()}
                  readOnly={true}
                  value={currentDomain + this.props.match.params.paste}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="chat-module no-front-paddings">
          <div className="chat-module-inner">
            <AceEditor {..._editorPropsPaste} />
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
    editorDescription: store.guest.editorDescription,
    pasteTimeCreated: moment
      .utc(store.guest.pasteTimeCreated)
      .local()
      .format("LLL"),
    pasteAuthor: store.guest.pasteAuthor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPaste: (payload, history) => dispatch(fetchPaste(payload, history))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Paste)
);
