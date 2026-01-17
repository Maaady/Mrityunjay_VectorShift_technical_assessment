// calculatorNode.js
// A simple calculator node that performs basic arithmetic operations

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = [
    {
      id: 'input1',
      type: 'target',
      position: Position.Left,
      style: { top: '30%' }
    },
    {
      id: 'input2',
      type: 'target',
      position: Position.Left,
      style: { top: '70%' }
    },
    {
      id: 'result',
      type: 'source',
      position: Position.Right,
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="calculator"
      title="Calculator"
      handles={handles}
    >
      <label>
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Addition (+)</option>
          <option value="subtract">Subtraction (-)</option>
          <option value="multiply">Multiplication (*)</option>
          <option value="divide">Division (/)</option>
        </select>
      </label>
    </BaseNode>
  );
};
