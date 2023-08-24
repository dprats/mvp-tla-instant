import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { MEDIUM_TLA } from '../utils/constants';
import SequenceDiagram from "@/components/SequenceDiagram";
import SpecProperties from "@/components/SpecProperties";

import { JOHN_SPEC_FROM_SEQUENCE_DIAGRAM, DEFAULT_SEQUENCE_DIAGRAM2 } from '../utils/constants';


const TLAPlusCode = JOHN_SPEC_FROM_SEQUENCE_DIAGRAM;

export default function MonacoTextEditorTLA({ readOnly = false, content = TLAPlusCode }: { readOnly?: boolean, content?: string }) {
  
  //state for sequence diagram
  const default_sequence = DEFAULT_SEQUENCE_DIAGRAM2;
  const [sequenceDiagramData, setSequenceDiagramData] = useState(default_sequence);

  //state for TLA spec
  // const default_spec = JOHN_SPEC_FROM_SEQUENCE_DIAGRAM;
  // const [spec, setSpec] = useState(default_spec);
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);

  // TLA+ language configuration rules, since no pre-existing definition is available
  // this will generate very basic highlighting, consider extending them according to your needs
  const TLAplusLanguageConfiguration = {
    defaultToken: 'invalid',
    keywords: [
      'VARIABLE', 'Init', 'Next', 'Spec', 'EXTENDS', 'INSTANCE', 'CONSTANT', 'ASSUME', 'THEOREM', 'PROOF', 'BY', 'QED', 'SUFFICES', 'PICK', 'HAVE', 'TAKE', 'DEFINE', 'IN'
    ],
    operators: [
      '=', '#', '/\\', '\\/', '~', '=>', 'CHOOSE'
    ],
    tokenizer: {
      root: [
        [/[a-z_$][\w$]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier'} }],
        [/[A-Z][\w\$]*/, 'type.identifier'], 
        [/[=><!~#\/\\]+/, 'delimiter.compare'], 
        [/[\w]+/, 'variable'],
      ]
    }
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    // Register a new language with Monaco
    monaco.languages.register({ id: 'TLA' });

    // Set its syntax highlighting rules
    monaco.languages.setMonarchTokensProvider('TLA', TLAplusLanguageConfiguration);

    // Calculate height based on content lines
    const model = editor.getModel();
    const lineCount = model.getLineCount();
    const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
    const paddingBottom = editor.getOption(monaco.editor.EditorOption.padding).bottom;

    const editorContentHeight = (lineCount * lineHeight) + paddingBottom;

    // Update the height property to reflect content
    editorContainerRef.current.style.height = `${Math.max(editorContentHeight, 10)}px`;

    editor.layout();
  }

  function showValue() {
    console.log(editorRef.current.getValue());
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div ref={editorContainerRef} style={{ flex: 1 }}>
        <Editor
          theme="vs-dark"
          defaultLanguage="TLA"
          value={content}
          onMount={handleEditorDidMount}
          options={{readOnly, automaticLayout: true}} // automaticLayout helps resize editor with container
        />
      </div>
      <div style={{ flex: 1 }}>
        <SequenceDiagram data={sequenceDiagramData}/>
        <SpecProperties />
      </div>
    </div>
  );
  
}