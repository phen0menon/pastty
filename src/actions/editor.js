import Actions from "./index";

export const updateGuestPaste = editorValue => dispatch => {
  dispatch({
    type: Actions.UPDATE_GUEST_PASTE,
    payload: editorValue
  });
};

export const updateGuestSyntax = (syntax, callback) => dispatch => {
  dispatch({
    type: Actions.UPDATE_GUEST_SYNTAX,
    payload: syntax,
    callback
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
    })
    .catch(res => {
      dispatch({ type: Actions.CREATE_PASTE_FAIL });
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
  let status = 0;

  fetch(url, { method: "GET" })
    .then(response => {
      if (response.status === 404) {
        callbackError();
      }

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
