// validatorNode.js
// A validator node that checks data against validation rules

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ValidatorNode = ({ id, data }) => {
  const [validationType, setValidationType] = useState(data?.validationType || 'email');
  const [strict, setStrict] = useState(data?.strict || false);

  const handles = [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
    },
    {
      id: 'valid',
      type: 'source',
      position: Position.Right,
      style: { top: '30%' }
    },
    {
      id: 'invalid',
      type: 'source',
      position: Position.Right,
      style: { top: '70%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="validator"
      title="Validator"
      handles={handles}
    >
      <label>
        Type:
        <select value={validationType} onChange={(e) => setValidationType(e.target.value)}>
          <option value="email">Email</option>
          <option value="url">URL</option>
          <option value="phone">Phone</option>
          <option value="number">Number</option>
        </select>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input 
          type="checkbox" 
          checked={strict}
          onChange={(e) => setStrict(e.target.checked)}
        />
        <span>Strict Mode</span>
      </label>
    </BaseNode>
  );
};
