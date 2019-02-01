import Actions from "actions/";

const initialEditorValue = "// Enter your code here\n";

const initialState = {
  previousEditorValue: initialEditorValue,
  editorValue: initialEditorValue,
  editorSyntax: "java",
  editorStatus: "initial",
  editorDescription: null,
  createdPasteLink: null,
  pasteAuthor: null,
  pasteTimeCreated: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.UPDATE_GUEST_PASTE: {
      return { ...state, editorValue: action.payload };
    }

    case Actions.UPDATE_GUEST_SYNTAX: {
      const { callback, payload: editorSyntax } = action;

      callback();

      return { ...state, editorSyntax };
    }

    case Actions.CREATE_PASTE: {
      return { ...state, editorStatus: "loading" };
    }

    case Actions.CREATE_PASTE_SUCCESS: {
      return {
        ...state,
        previousEditorValue: state.editorValue,
        createdPasteLink: action.payload,
        editorStatus: "paste"
      };
    }

    case Actions.FETCH_PASTE: {
      return { ...state, editorStatus: "loading" };
    }

    case Actions.FETCH_PASTE_SUCCESS: {
      const syntax = action.payload.type;

      if (syntax) {
        action.callback(syntax);
      }

      return {
        ...state,
        editorStatus: "paste",
        editorValue: action.payload.code,
        editorSyntax: action.payload.type,
        editorDescription: action.payload.description,
        pasteTimeCreated: action.payload.timeOfCreation,
        pasteAuthor: action.payload.author
      };
    }

    case Actions.FETCH_PASTE_FAIL: {
      return initialState
    }

    case Actions.SET_STATUS_TO_GUEST: {
      return initialState
    }

    case Actions.FORK_PASTE: {
      return { ...state, createdPasteLink: null, editorStatus: "initial" };
    }

    default:
      return state;
  }
}
