import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { MEDIUM_TLA } from '../utils/constants';
import SequenceDiagram from "@/components/SequenceDiagram";
import SpecProperties from "@/components/SpecProperties";
import LLMChatContainer from "@/components/LLMChatContainer"
import Spinner from "@/components/common/Spinner";


import { JOHN_SPEC_FROM_SEQUENCE_DIAGRAM, 
  DEFAULT_SEQUENCE_DIAGRAM2, 
  LAYERS_O1_TLA, 
  DATABASE_TRANSACTION_SPEC,
  DINING_PHILOSOPHERS_SPEC
} from '../utils/constants';


const TLAPlusCode = LAYERS_O1_TLA; //DINING_PHILOSOPHERS_SPEC; //LAYERS_O1_TLA; //DATABASE_TRANSACTION_SPEC; //JOHN_SPEC_FROM_SEQUENCE_DIAGRAM;

export default function MonacoTextEditorTLA({ readOnly = false, content = TLAPlusCode }) {
  
  //state for sequence diagram
  const default_sequence = DEFAULT_SEQUENCE_DIAGRAM2;

  const [currentCode, setCurrentCode] = useState(content);
  const [sequenceDiagramData, setSequenceDiagramData] = useState(default_sequence);
  const [isUpdating, setIsUpdating] = useState(false);


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

  function handleEditorChange(value, event) {
    setCurrentCode(value);
  }

  async function updateSequenceDiagram() {

    setIsUpdating(true);
    //get TLA code from the editor
    const currentContent = editorRef.current.getValue();

    //Ask the LLM to print new sequence diagram using the new code
    const userInput = `Give me code for a sequence diagram for Mermaid, based on the following TLA+ spec: ${currentContent}. 
    Wrap the sequence diagram code in between two tags: <sequence> and </sequence>. Make sure the code starts with the phrase "sequenceDiagram"`;
    const newUserChatMessage = { role: 'user', content: userInput };
    // console.log(userInput);

    // console.log("DATA SENT");
    // console.log(newUserChatMessage);
    // console.log("********");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserChatMessage), 
      });

      const data = await response.json();

      if (response.status !== 200) {
        console.log("ERROR:");
        console.log(response);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      // console.log("DATA RESULT FROM API");
      // console.log(data.result.content);
      // console.log("********");

      function extractSequenceContent(str) {
        const match = str.match(/<sequence>([\s\S]*?)<\/sequence>/);
        return match ? match[1].trim() : null;
      }

      const newSequenceDiagram = extractSequenceContent(data.result.content);
      setSequenceDiagramData(newSequenceDiagram);
      setIsUpdating(false);

    } catch(error) {

      // Consider implementing your own error handling logic here
        console.log("CATCH")
      console.error(error);
      alert(error.message);
    }
  
    //Get new sequence diagram 
    // console.log(sequenceDiagramData);
  
  }

  async function updateAgentsAndStates() {

    setIsUpdating(true);
    //get TLA code from the editor
    const currentContent = editorRef.current.getValue();

    //Ask the LLM to print new sequence diagram using the new code
    const userInput = `Read this TLA+ spec. Return JSON where every key is a state and every value is an array of possible states: ${currentContent}. `;
    const newUserChatMessage = { role: 'user', content: userInput };
    // console.log(userInput);

    console.log("DATA SENT");
    console.log(newUserChatMessage);
    console.log("********");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserChatMessage), 
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log("DATA RESULT FROM API");
      console.log(data.result.content);
      console.log("********");

      // const newSequenceDiagram = extractSequenceContent(data.result.content);
      // console.log("SEQUENCE DIAGRAM");
      // console.log(newSequenceDiagram);
      // console.log("********");
      // setSequenceDiagramData(newSequenceDiagram);
      // setIsUpdating(false);

    } catch(error) {

      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  
    //Get new sequence diagram 
    // console.log(sequenceDiagramData);
  
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div ref={editorContainerRef} style={{ flex: 1 }}>
        <Editor
          theme="vs-dark"
          defaultLanguage="TLA"
          value={content}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{readOnly, automaticLayout: true}} // automaticLayout helps resize editor with container
        />
      </div>
      <div style={{ flex: 1 }}>
        {isUpdating ? <Spinner /> : <SequenceDiagram data={sequenceDiagramData}/>} {/* Conditionally render spinner or SequenceDiagram */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateSequenceDiagram}>Update Sequence Diagram based on TLA+</button>
        <SpecProperties />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateAgentsAndStates}>Update information on agents, states, transitions</button>
      </div>
      <div style={{ flex: 1 }}>
        <LLMChatContainer defaultText='How can I help? (you have to copy/paste the spec)' currentCode={currentCode}/>
      </div>
    </div>
  );

  
}