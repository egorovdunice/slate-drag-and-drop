import React, {useRef, useState} from 'react';

import Editor from "rich-markdown-editor";
import DragAndDrop from "./slate-drag-and-drop";

function App() {
  const ref = useRef(null);
  const [readOnly, setReadOnly] = useState(false);

  const plugins = [
    DragAndDrop({
      ref,
      setReadOnly: (value) => setReadOnly(value)
    }),
  ];

  return (
    <div className="App" style={{padding: 40}}>
      <Editor
        ref={ref}
        plugins={plugins}
        id={'editor'}
        readOnly={readOnly}
      />
    </div>
  );
}

export default App;
