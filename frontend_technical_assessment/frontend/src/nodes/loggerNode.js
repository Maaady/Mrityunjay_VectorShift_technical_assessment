// loggerNode.js
// A logger node that captures and displays data flow information

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'info');
  const [prefix, setPrefix] = useState(data?.prefix || '[LOG]');

  const handles = [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
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
      nodeType="logger"
      title="Logger"
      handles={handles}
    >
      <label>
        Log Level:
        <select value={logLevel} onChange={(e) => setLogLevel(e.target.value)}>
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
          <option value="error">Error</option>
        </select>
      </label>
      <label>
        Prefix:
        <input 
          type="text" 
          value={prefix} 
          onChange={(e) => setPrefix(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
