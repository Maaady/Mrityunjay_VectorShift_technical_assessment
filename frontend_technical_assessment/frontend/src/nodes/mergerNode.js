// mergerNode.js
// A merger node that combines multiple data streams

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergerNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concatenate');
  const [separator, setSeparator] = useState(data?.separator || ', ');

  const handles = [
    {
      id: 'input1',
      type: 'target',
      position: Position.Left,
      style: { top: '20%' }
    },
    {
      id: 'input2',
      type: 'target',
      position: Position.Left,
      style: { top: '50%' }
    },
    {
      id: 'input3',
      type: 'target',
      position: Position.Left,
      style: { top: '80%' }
    },
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="merger"
      title="Merger"
      handles={handles}
    >
      <label>
        Merge Type:
        <select value={mergeType} onChange={(e) => setMergeType(e.target.value)}>
          <option value="concatenate">Concatenate</option>
          <option value="array">Array</option>
          <option value="object">Object</option>
        </select>
      </label>
      <label>
        Separator:
        <input 
          type="text" 
          value={separator} 
          onChange={(e) => setSeparator(e.target.value)}
          maxLength="5"
        />
      </label>
    </BaseNode>
  );
};
