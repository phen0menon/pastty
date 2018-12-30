import React, { Component } from 'react';
import AceEditor from 'react-ace';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editor_value: "",
      editor_syntax: "java",
    };
  }
  componentDidMount() {
    const currentScope = this;
    const editor = window.ace.edit('paste');

    editor.setOptions({readOnly: true, highlightActiveLine: false, highlightGutterLine: false});
    editor.renderer.$cursorLayer.element.style.display = "none";
    editor.getSession().setUseWorker(false);

    const { paste } = this.props.match.params;
    const url = 'http://sn.a6raywa1cher.com:9000/script/' + paste;

    fetch(url, { method: 'GET' }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ editor_value: data.code, editor_syntax: data.type });
    }).catch(err => {
      alert('Sorry! Some error got caught!')
    });
  }
  render() {
    return(
      <div className="row col-12 main-module no-front-margins no-front-paddings">
        <div className="row col-12 no-front-margins no-front-paddings">
          <div className="chat-module col-10 no-front-paddings">
            <AceEditor
              mode={this.state.editor_syntax}
              theme="xcode"
              height="100%"
              width="100%"
              readOnly={true}
              highlightActiveLine={false}
              highlightGutterLine={false}
              wrapEnabled={true}
              fontSize={14}
              defaultValue={this.state.editor_value}
              value={this.state.editor_value}
              name="paste"
              editorProps={{$blockScrolling: true}}
            />
          </div>
          <div className="chat-sidebar col-2">
            <div className="chat-sidebar-inner">
              <div className="paste-info">
                <div className="datetime text-center">
                  [ In Development ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
