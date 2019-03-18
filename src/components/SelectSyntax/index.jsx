import React, { Component } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { updateGuestSyntax } from "actions/editor";
import { sortByKey } from "helpers/functions"
import Select from "react-select"
import './index.scss'

const editorModes = [
  { value: 'java', label: 'Java 8' },
  { value: 'c_cpp', label: 'C / C++' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'golang', label: 'Golang' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'perl', label: 'Perl' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'sql', label: 'SQL' },
  { value: 'plaintext', label: 'Plain Text' }
]

class SelectSyntax extends Component {
  state = {
    currentMode: editorModes[0],
  }
  handleSelect = select => {
    const { value : selectedSyntax } = select;
    this.setState({ currentMode: select })

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
      <Select 
        value={this.state.currentMode}
        onChange={this.handleSelect}
        options={editorModes}
        styles={selectStyles}
        placeholder="Syntax"
        />
    );
  }
}

const placeholderStyle = () => ({ width: 69 })
const selectStyles = {
  singleValue: placeholderStyle,
  placeholder: placeholderStyle,
  option: (provided, state) => ({ ...provided, paddingTop: 4, paddingBottom: 4  })
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
