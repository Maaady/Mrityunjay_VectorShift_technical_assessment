// textNode.js

import { useState, useMemo, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import '../styles/textNode.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Extract variables from text (patterns like {{ variableName }})
  const extractVariables = (text) => {
    const varPattern = /\{\{(\w+)\}\}/g;
    const matches = [];
    let match;
    while ((match = varPattern.exec(text)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    return matches;
  };

  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Build handles for variables and main output
  const handles = [
    ...variables.map((variable, index) => ({
      id: `var-${variable}`,
      type: 'target',
      position: Position.Left,
      style: { top: `${50 + index * 25}px` }
    })),
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
    }
  ];

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  // Auto-resize on mount and when text changes
  const handleInputFocus = () => {
    setTimeout(autoResizeTextarea, 0);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="text"
      title="Text"
      handles={handles}
    >
      <div className="text-node-content">
        <label>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            onFocus={handleInputFocus}
            className="text-node-textarea"
            placeholder="Enter text with {{variables}}"
            rows="3"
          />
        </label>
        
        {variables.length > 0 && (
          <div className="variables-info">
            <span className="variables-label">Variables:</span>
            <div className="variables-list">
              {variables.map((variable) => (
                <span key={variable} className="variable-tag">
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
}
