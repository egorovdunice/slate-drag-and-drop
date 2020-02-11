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
        ref={ref}           // required
        plugins={plugins}   // required
        id={'editor'}       // required
        readOnly={readOnly} // required
        defaultValue={
`Hello world! 
    GoodBye Moon!`
        }
      />
    </div>
  );
}

export default App;
