import React, { Component } from 'react';
import './App.scss';
import AceEditor from 'react-ace';
import SelectSyntax from './widgets/SelectSyntax'

const initialState = {
  editor_value: '// Enter your code here\n'
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.changeEditorValue = this.changeEditorValue.bind(this);
    this.getEditorValue = this.getEditorValue.bind(this);
  }
  componentDidMount() {
    const editor = window.ace.edit('paste');

    /**
     * Ctrl + S shortcut to update current paste.
     * TODO: send paste to the server.
     */
    editor.commands.addCommand({
      name: 'myCommand',
      bindKey: {win: 'Ctrl-s',  mac: 'Command-s'},
      exec: function(editor) {
        console.log('saved')
        console.log('text is: ', this.getEditorValue());
        console.log('syntax is: ', editor.getSession().getMode().$id.split('/')[2])
      }
    });
  }
  getEditorValue() {
    return this.state.editor_value;
  }
  changeEditorValue(value) {
    console.log(value)
    this.setState({ editor_value: value })
  }
  render() {
    return(
      <div className="row main-module no-front-margins">
        <div className="header-module col-12 no-front-paddings">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Pasty</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_navbar" aria-controls="main_navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="main_navbar">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active ml-2">
                  <button className="btn btn-primary" href="/">New Paste</button>
                </li>
                <li className="nav-item ml-2">
                  <button className="btn btn-success">Save (Ctrl + S)</button>
                </li>
                <li className="nav-item ml-2">
                  <button className="btn btn-warning" href="/">Share</button>
                </li>
                <li className="nav-item ml-2">
                  <SelectSyntax />
                </li>
              </ul>
              </div>
              <div className="my-2 my-lg-0">
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">GitHub</button>
              </div>
          </nav>
        </div>
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
              <div className="datetime">
                Created on 17th May 15:33 PM
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }   
}

export default App;
