import Actions from "./index";

export const updateGuestPaste = editorValue => dispatch => {
  dispatch({
    type: Actions.UPDATE_GUEST_PASTE,
    payload: editorValue
  });
};

export const updateGuestSyntax = editorSyntax => dispatch => {
  dispatch({
    type: Actions.UPDATE_GUEST_SYNTAX,
    payload: editorSyntax
  });
};

export const createPaste = (payload, history) => dispatch => {
  dispatch({ type: Actions.CREATE_PASTE });

  const settings = {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: { ContentType: "application/json" }
  };

  fetch("https://sn.a6raywa1cher.com/api/script", settings)
    .then(res => res.json())
    .then(res => {
      const pasteLink = res.shortname;

      dispatch({ type: Actions.CREATE_PASTE_SUCCESS });
      history.push("/" + pasteLink);
    });
};

export const fetchPaste = (
  payload,
  history,
  callbackSuccess,
  callbackError
) => dispatch => {
  dispatch({ type: Actions.FETCH_PASTE });

  const url = "https://sn.a6raywa1cher.com/api/script/" + payload;

  fetch(url, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch({
        type: Actions.FETCH_PASTE_SUCCESS,
        payload: data,
        callback: callbackSuccess
      });
    })
    .catch(err => {
      dispatch({ type: Actions.FETCH_PASTE_FAIL });
      callbackError();
      history.push("/");
    });
};

export const setStatusToGuest = () => dispatch => {
  dispatch({
    type: Actions.SET_STATUS_TO_GUEST
  });
};

export const forkPaste = history => dispatch => {
  dispatch({
    type: Actions.FORK_PASTE
  });

  history.push("/");
};
