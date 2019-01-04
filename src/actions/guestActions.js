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
} from "./types";
import Swal from "sweetalert2";

export const updateGuestPaste = editorValue => dispatch => {
  dispatch({
    type: UPDATE_GUEST_PASTE,
    payload: editorValue
  });
};

export const updateGuestSyntax = editorSyntax => dispatch => {
  dispatch({
    type: UPDATE_GUEST_SYNTAX,
    payload: editorSyntax
  });
};

export const createPaste = (payload, history) => dispatch => {
  dispatch({ type: CREATE_PASTE });

  const settings = {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { ContentType: "application/json" }
  };

  fetch("https://sn.a6raywa1cher.com/script", settings)
    .then(res => res.json())
    .then(res => {
      const pasteLink = res.shortname;

      dispatch({ type: CREATE_PASTE_SUCCESS });
      history.push("/" + pasteLink);
    });
};

export const fetchPaste = (payload, history) => dispatch => {
  dispatch({ type: FETCH_PASTE });

  const url = "https://sn.a6raywa1cher.com/script/" + payload;

  fetch(url, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: FETCH_PASTE_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({ type: FETCH_PASTE_FAIL });
      Swal({
        type: "error",
        title: "Ошибка!",
        text:
          "Вы получили это сообщение, потому что перешли по несуществующей ссылке!",
        footer: ""
      });
      history.push("/");
    });
};

export const setStatusToGuest = () => dispatch => {
  dispatch({
    type: SET_STATUS_TO_GUEST
  });
};

export const forkPaste = history => dispatch => {
  dispatch({
    type: FORK_PASTE
  });

  history.push("/");
};
