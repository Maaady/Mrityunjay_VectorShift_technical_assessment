// BaseNode.js
// Abstraction layer for creating nodes with common functionality

import { Handle } from 'reactflow';
import '../styles/baseNode.css';

export const BaseNode = ({
  id,
  data,
  nodeType,
  title,
  children,
  handles = [],
  showHandle = true,
}) => {
  return (
    <div className="base-node" data-node-type={nodeType}>
      <div className="node-header">
        <span className="node-title">{title}</span>
      </div>
      
      <div className="node-content">
        {children}
      </div>

      {handles.map((handle, idx) => (
        <Handle
          key={`${id}-${handle.id}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};
