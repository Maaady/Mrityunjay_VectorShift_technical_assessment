// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      id: 'system',
      type: 'target',
      position: Position.Left,
      style: { top: `${100/3}%` }
    },
    {
      id: 'prompt',
      type: 'target',
      position: Position.Left,
      style: { top: `${200/3}%` }
    },
    {
      id: 'response',
      type: 'source',
      position: Position.Right,
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="llm"
      title="LLM"
      handles={handles}
    >
      <span style={{ fontSize: '13px', color: '#cbd5e1' }}>
        Language Model Processor
      </span>
    </BaseNode>
  );
}
