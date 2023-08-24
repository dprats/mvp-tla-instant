import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useRef } from "react";

export default function MonacoTextEditor() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    console.log(editorRef.current.getValue());
  }

  return (
    <div>
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2 py-3">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            TLA+ Editor
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit quam
            corrupti consectetur.
          </p>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            onClick={showValue}
            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Console Log
          </button>
        </div>
      </div>

      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
