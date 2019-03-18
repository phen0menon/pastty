import React, { Component } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { fetchPaste } from "actions/editor";
import { editorPropsPaste } from "helpers/editorProps";
import { withRouter } from "react-router";
import { currentDomain } from "helpers/constants";
import Swal from "sweetalert2";
import * as moment from "moment";
import "brace/mode/java";

class Paste extends Component {
  constructor(props) {
    super(props);

    this.fieldToCopy = React.createRef();
  }
  getPaste = id => {
    const callbackSuccess = syntax => {
      import(`brace/mode/${syntax}`).then(() => {
        window.ace
          .edit("paste")
          .getSession()
          .setMode("ace/mode/" + syntax);
      });
    };
    const callbackError = () => {
      Swal({
        type: "error",
        title: "Ошибка!",
        text:
          "Вы получили это сообщение, потому что перешли по несуществующей ссылке!",
        footer: ""
      });
    };

    this.props.fetchPaste(
      id,
      this.props.history,
      callbackSuccess,
      callbackError
    );
  };

  configureEditor = () => {
    const editor = window.ace.edit("paste");

    editor.renderer.setScrollMargin(3, 3);
    editor.renderer.$cursorLayer.element.style.display = "none";
    editor.getSession().setUseWorker(false);
  };

  componentDidMount() {
    this.getPaste(this.props.match.params.paste);
    this.configureEditor();
  }

  copyField = (e) => {
    this.fieldToCopy.current.select();
    document.execCommand('copy');
    e.target.focus();
    console.log('copied!')
  };

  render() {
    const { editorSyntax: mode } = this.props;
    var _editorPropsPaste = Object.assign({}, editorPropsPaste, {
      onChange: value => this.props.setEditorValue(value),
      value: this.props.editorValue,
      defaultValue: this.props.editorValue
    });
    if (mode) _editorPropsPaste = { ..._editorPropsPaste, mode };

    console.log(this.props.valueToConsole)

    return (
      <div className="w-100">
        <div className="chat-sidebar d-none d-sm-block">
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
                  onClick={this.copyField}
                  readOnly={true}
                  value={currentDomain + this.props.match.params.paste}
                  ref={this.fieldToCopy}
                />
              </div>
              <div className="form-group">
                <label className="undertitle mb-0">Views</label>
                <div>{this.props.pasteViews}</div>
              </div>

            </div>
          </div>
        </div>
        <div className="chat-module no-front-paddings chat-module-paste">
          <div className="chat-module-inner">
            <AceEditor {..._editorPropsPaste} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const {
    editorValue,
    editorSyntax,
    editorStatus,
    editorDescription,
    pasteAuthor,
    pasteViews
  } = store.guest;

  return {
    editorValue,
    editorSyntax,
    editorStatus,
    editorDescription,
    pasteViews,
    pasteAuthor,
    pasteTimeCreated: moment
      .utc(new Date(store.guest.pasteTimeCreated))
      .local()
      .format("LL HH:mm"),
    valueToConsole: store.guest.pasteTimeCreated,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPaste }
  )(Paste)
);
