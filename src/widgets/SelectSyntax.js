import React, { Component } from 'react';

import '../helpers/acemodes'
import 'brace/theme/xcode';

const initialState = {
    syntax: 'java'
}

export default class SelectSyntax extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(event) {
        this.setState({ syntax: event.target.value }, () => {
            this.setEditorSyntax(this.state.syntax);
        })     
    }
    setEditorSyntax(lang) {        
        var editor = window.ace.edit('paste')
        editor.getSession().setMode('ace/mode/' + lang)
    }
    render() {
        return(
            <select value={this.state.syntax} className="form-control" onChange={this.handleSelect}>
                <option value="java">Java 8</option>
                <option value="c_cpp">C / C++</option>
                <option value="javascript">JavaScript</option>
                <option value="kotlin">Kotlin</option>
                <option value="golang">Golang</option>
                <option value="python">Python</option>
                <option value="rust">Rust</option>
                <option value="typescript">TypeScript</option>
            </select>
        )
    }
}