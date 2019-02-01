export const editorProps = {
  theme: "dracula",
  height: "100%",
  width: "100%",
  wrapEnabled: true,
  cursorStart: 2,
  fontSize: 14,
  name: "paste",
  editorProps: { $blockScrolling: true },
  enableLiveAutocompletion: true,
  useWorker: false
};

export const editorPropsPaste = Object.assign({}, editorProps, {
  readOnly: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
  enableLiveAutocompletion: false
});
