import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { Redirect, Link } from 'react-router-dom'
import SelectSyntax from '../widgets/SelectSyntax'

const initialState = {
  editor_value: '// Enter your code here\n',
  status: null,
  redirect_link: null,
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.changeEditorValue = this.changeEditorValue.bind(this);
    this.getEditorValue = this.getEditorValue.bind(this);
  }
  componentDidMount() {
    const currentScope = this;
    const editor = window.ace.edit('paste');

    editor.commands.addCommand({
      name: 'Save (update) paste',
      bindKey: { win: 'Ctrl-s',  mac: 'Command-s' },
      exec: function(editor) {
        if (currentScope.status !== 'loading') {
          currentScope.setState({ status: 'loading' }, () => {
            let code = currentScope.getEditorValue();
            let type = editor.getSession().getMode().$id.split('/')[2];

            var payload = {
              "name": "Test Paste",
              "code": code,
              "description": "Test Description",
              "type": type,
              "codeType": "snippet",
            }

            var settings = {
              method: "PUT",
              body: JSON.stringify(payload),
              headers: { "ContentType": "application/json" }
            }

            fetch("http://sn.a6raywa1cher.com:9000/script", settings)
            .then((res) => res.json())
            .then((res) => {
              currentScope.setState({
                status: null,
                redirect_link: res.shortname
              })
            })
          })
        } else {
          console.log('Already loading!...');
        }
      }
    });
  }
  getEditorValue() {
    return this.state.editor_value;
  }
  changeEditorValue(value) {
    this.setState({ editor_value: value })
  }
  render() {
    const { redirect_link } = this.state;

    if (redirect_link) {
      return <Redirect to={"/" + redirect_link} />
    }

    return(
      <div className="row col-12 main-module no-front-margins no-front-paddings">
        <div className="row col-12 no-front-margins no-front-paddings">
          <div className="chat-module col-10 no-front-paddings">
            <AceEditor
              mode="java"
              theme="xcode"
              height="100%"
              width="100%"
              wrapEnabled={true}
              defaultValue={this.state.editor_value}
              value={this.state.editor_value}
              cursorStart={2}
              onChange={this.changeEditorValue}
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
