// filterNode.js
// A filter node that applies conditions to data streams

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const handles = [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
    },
    {
      id: 'true',
      type: 'source',
      position: Position.Right,
      style: { top: '30%' }
    },
    {
      id: 'false',
      type: 'source',
      position: Position.Right,
      style: { top: '70%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="filter"
      title="Filter"
      handles={handles}
    >
      <label>
        Condition:
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="equals">Equals</option>
          <option value="contains">Contains</option>
          <option value="greater">Greater Than</option>
          <option value="less">Less Than</option>
        </select>
      </label>
      <label>
        Value:
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          placeholder="Compare value"
        />
      </label>
    </BaseNode>
  );
};
