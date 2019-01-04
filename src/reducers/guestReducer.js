import {
  UPDATE_GUEST_PASTE,
  UPDATE_GUEST_SYNTAX,
  CREATE_PASTE,
  CREATE_PASTE_SUCCESS,
  FETCH_PASTE,
  FETCH_PASTE_SUCCESS,
  FETCH_PASTE_FAIL,
  SET_STATUS_TO_GUEST,
  FORK_PASTE
} from "../actions/types";

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
    case UPDATE_GUEST_PASTE:
      return Object.assign({}, state, {
        editorValue: action.payload
      });

    case UPDATE_GUEST_SYNTAX:
      return Object.assign({}, state, {
        editorSyntax: action.payload
      });

    case CREATE_PASTE:
      return Object.assign({}, state, {
        editorStatus: "loading"
      });

    case CREATE_PASTE_SUCCESS:
      return Object.assign({}, state, {
        previousEditorValue: state.editorValue,
        createdPasteLink: action.payload,
        editorStatus: "paste"
      });

    case FETCH_PASTE:
      return Object.assign({}, state, {
        editorStatus: "loading"
      });

    case FETCH_PASTE_SUCCESS:
      return Object.assign({}, state, {
        editorStatus: "paste",
        editorValue: action.payload.code,
        editorSyntax: action.payload.type,
        editorDescription: action.payload.description,
        pasteTimeCreated: action.payload.timeOfCreation,
        pasteAuthor: action.payload.author
      });

    case FETCH_PASTE_FAIL:
      return Object.assign({}, state, initialState);

    case SET_STATUS_TO_GUEST:
      return Object.assign({}, state, initialState);

    case FORK_PASTE:
      return Object.assign({}, state, {
        createdPasteLink: null,
        editorStatus: "initial"
      });

    default:
      return state;
  }
}
