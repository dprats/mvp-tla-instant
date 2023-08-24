import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import SequenceDiagram from "@/components/SequenceDiagram";
import { DEFAULT_SEQUENCE_DIAGRAM, DEFAULT_SEQUENCE_DIAGRAM2 } from '../utils/constants';

export default function MonacoTextEditorSequenceDiagram() {
  const default_sequence = DEFAULT_SEQUENCE_DIAGRAM2;
  const [sequenceDiagramData, setSequenceDiagramData] = useState(default_sequence);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  //read the values in the editor
  function createSequenceDiagramHandler()  {
    setLoading(true); // Set loading to true
    const new_sequence_diagram = editorRef.current.getValue();
    console.log(new_sequence_diagram);
    setSequenceDiagramData(new_sequence_diagram);
    setKey(prevKey => prevKey + 1); // Increment key
    setTimeout(() => setLoading(false), 1000); // Set loading to false after 1 second
  }

  return (
    <div>
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2 py-3">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Sequence Diagram
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            This editor can be used to describe your sequence diagram system in markdown. You can write, edit, copy/paste.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Editor
          height="40vh"
          defaultLanguage="markdown"
          theme="hc-black"
          defaultValue={default_sequence}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            onClick={createSequenceDiagramHandler}
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
          >
            Create my sequence diagram.
          </button>
        </div>
      {loading ? 
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div> 
        : 
        <SequenceDiagram key={key} data={sequenceDiagramData}/>
      }
    </div>
  );
}
