
import React from "react";
import { DEFAULT_SEQUENCE_DIAGRAM } from '../utils/constants';
import dynamic from "next/dynamic";

// Created a No SSR component as Mermaid needs window context to render
const DynamicMermaidComponentWithNoSSR = dynamic(() => import("./Mermaid"), {
  ssr: false,
});

export default function SequenceDiagram({data}) {
    // let sequenceDiagramData = DEFAULT_SEQUENCE_DIAGRAM;
  return (
    <div className="flex flex-col space-y-2 border-2 border-gray-300 p-4 rounded-md SequenceDiagram">
      {/* <h1>Sequence Diagram of the spec</h1> */}
      <DynamicMermaidComponentWithNoSSR key={data} chart={data} />
    </div>
  );
}
