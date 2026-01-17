# Quick Start Guide

## Installation & Setup

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 3: Build for Production
```bash
npm run build
```

---

## Using the Pipeline Builder

### Basic Workflow

#### 1. Add Nodes
- Click and drag nodes from the left toolbar onto the canvas
- Available categories:
  - **Core**: Input, Output, LLM, Text
  - **Processing**: Calculator, Filter, Merger, Validator
  - **Utilities**: Logger

#### 2. Configure Nodes
- Click on a node to edit its properties
- Different node types have different options
- Changes apply immediately

#### 3. Connect Nodes
- Click and drag from output handle (right side) to input handle (left side)
- Connection will snap and animate
- Blue line shows the connection path

#### 4. Text Variables
- In Text nodes, use `{{ variableName }}` syntax
- Automatically creates input handles
- Connect data sources to variable handles

#### 5. Submit
- Click "Submit Pipeline" button when done
- Click "Clear" to reset the canvas

---

## Node Types Explained

### 📥 Input Node
**Purpose**: Define data entry points
**Config**: 
- Name: What to call this input
- Type: Text or File
**Handles**: 
- Output on right (source)

**Example**: "User Data" input that provides user information

### 📤 Output Node
**Purpose**: Define data exit points
**Config**:
- Name: What to call this output
- Type: Text or Image
**Handles**:
- Input on left (target)

**Example**: "Result" output that collects final processed data

### 🤖 LLM Node
**Purpose**: Process text through language model
**Config**: (None)
**Handles**:
- System input (left, top)
- Prompt input (left, middle)
- Response output (right)

**Example**: Send system instructions and user prompt, get AI response

### 📝 Text Node
**Purpose**: Create templates with variables
**Config**: Text field
**Special Feature**: Variables with `{{ }}`
**Handles**:
- Variable inputs (left, one per variable)
- Text output (right)

**Example**: 
```
"Hello {{ name }}, your score is {{ score }}"
Creates 2 handles: name, score
```

### 🔢 Calculator Node
**Purpose**: Perform math operations
**Config**: 
- Operation: +, -, *, /
**Handles**:
- Input1 (left, top)
- Input2 (left, bottom)
- Result (right)

**Example**: Add two numbers together

### 🔀 Filter Node
**Purpose**: Conditional branching
**Config**:
- Condition: equals, contains, greater, less
- Value: comparison value
**Handles**:
- Input (left)
- True branch (right, top)
- False branch (right, bottom)

**Example**: Route data based on a condition

### 🔗 Merger Node
**Purpose**: Combine multiple data streams
**Config**:
- Merge Type: concatenate, array, object
- Separator: for concatenation
**Handles**:
- Input1, Input2, Input3 (left)
- Output (right)

**Example**: Combine user data with profile data

### 📊 Validator Node
**Purpose**: Validate data format
**Config**:
- Type: email, URL, phone, number
- Strict Mode: toggle
**Handles**:
- Input (left)
- Valid branch (right, top)
- Invalid branch (right, bottom)

**Example**: Check if email is valid, route accordingly

### 📋 Logger Node
**Purpose**: Debug and monitor data flow
**Config**:
- Log Level: debug, info, warn, error
- Prefix: custom prefix for logs
**Handles**:
- Input (left)
- Output (right)

**Example**: Log intermediate data for debugging

---

## Common Patterns

### Pattern 1: Simple Data Flow
```
Input → Text → Output
```
Simple template with static text

### Pattern 2: Template with Variables
```
Input1 → Text ({{ var1 }}) → Output
Input2 ──┘
```
Connect multiple inputs to text variables

### Pattern 3: Conditional Processing
```
Input → Validator → (valid) → LLM → Output
              └→ (invalid) → Logger
```
Route data based on validation

### Pattern 4: Data Combination
```
Input1 ─┐
        ├→ Merger → Text ({{ combined }}) → Output
Input2 ─┘
```
Merge multiple data sources

### Pattern 5: Math Processing
```
Input1 ─┐
        ├→ Calculator → Filter → Output
Input2 ─┘
```
Perform calculations then filter results

---

## Tips & Tricks

### 💡 Zoom & Pan
- **Scroll**: Zoom in/out
- **Middle Mouse**: Pan around
- **Controls**: Use buttons in top-left

### 💡 Minimap
- Bottom-right corner
- Shows full pipeline overview
- Click to navigate

### 💡 Undo
- The app doesn't have undo yet
- Use "Clear" button to start fresh
- Nodes can be deleted by selecting them

### 💡 Variable Names
✅ Valid: `input`, `data_1`, `USER_NAME`
❌ Invalid: `data-1`, `123input`, `my var`

### 💡 Text Node Tricks
- Resize by typing - textarea grows automatically
- Duplicate variables are ignored: `{{ x }} ... {{ x }}`
- Use monospace font for code-like templates

### 💡 Connection Tips
- Hover over handles to see connection points
- Connections snap to grid (20px)
- Blue animated lines show active connections

---

## Keyboard Shortcuts

| Action | Key |
|--------|-----|
| Pan | Middle Mouse Drag |
| Zoom In | Scroll Up |
| Zoom Out | Scroll Down |
| Select Node | Click |
| Delete Node | Delete (after selecting) |
| Deselect | Click empty canvas |

---

## Troubleshooting

### Issue: Can't connect nodes
**Solution**: Check handle types - outputs connect to inputs, not the other way around

### Issue: Text node not showing variables
**Solution**: Use exact syntax `{{ variableName }}` - spaces matter!

### Issue: Node disappeared
**Solution**: It might be off-screen. Use minimap to navigate or click "Clear"

### Issue: Connection keeps breaking
**Solution**: Ensure handle IDs are unique. Check browser console for errors.

### Issue: Styling looks wrong
**Solution**: Clear browser cache (Ctrl+Shift+Delete) or use incognito mode

---

## What's Next?

### Extend with More Nodes
1. Look at `src/nodes/calculatorNode.js`
2. Copy the pattern
3. Create new node type
4. Add to `ui.js` nodeTypes
5. Add to `toolbar.js`

### Customize Styling
1. Edit `src/styles/` CSS files
2. Change colors in `baseNode.css`
3. Add new node type colors

### Add Features
1. **Persistence**: Save/load pipelines
2. **Execution**: Run the pipeline
3. **Validation**: Check pipeline integrity
4. **Analytics**: Track execution metrics

---

## Project Structure

```
frontend/
├── src/
│   ├── nodes/              # Node components
│   │   ├── BaseNode.js     # Abstraction layer
│   │   ├── *Node.js        # Individual nodes
│   │   └── ...
│   ├── styles/             # CSS files
│   │   ├── baseNode.css
│   │   └── ...
│   ├── App.js              # Main component
│   ├── ui.js               # Canvas component
│   ├── toolbar.js          # Toolbar component
│   ├── store.js            # State management
│   └── index.js            # Entry point
├── public/
│   └── index.html
└── package.json
```

---

## API Reference

### Creating a Custom Node

```javascript
// src/nodes/myNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MyNode = ({ id, data }) => {
  const [myConfig, setMyConfig] = useState(data?.myConfig || 'default');

  const handles = [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      nodeType="myNodeType"
      title="My Node"
      handles={handles}
    >
      <label>
        Config:
        <select value={myConfig} onChange={(e) => setMyConfig(e.target.value)}>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </label>
    </BaseNode>
  );
};
```

### Register Node

```javascript
// src/ui.js
import { MyNode } from './nodes/myNode';

const nodeTypes = {
  // ... existing nodes
  myNodeType: MyNode,
};
```

### Add to Toolbar

```javascript
// src/toolbar.js
<DraggableNode type='myNodeType' label='My Node' />
```

---

## Resources

- **ReactFlow Docs**: https://reactflow.dev/
- **React Docs**: https://react.dev/
- **CSS Guide**: https://developer.mozilla.org/en-US/docs/Web/CSS/

---

## Support

For issues or questions:
1. Check browser console for errors
2. Review the documentation files:
   - `IMPLEMENTATION_SUMMARY.md` - Overview
   - `NODE_ABSTRACTION_GUIDE.md` - Node architecture
   - `TEXT_NODE_GUIDE.md` - Text node details
   - `STYLING_GUIDE.md` - Design system

---

## Summary

✨ You now have a powerful, extensible pipeline builder!

- **Easy to use**: Drag, drop, connect
- **Easy to extend**: Add custom nodes quickly
- **Professional design**: Modern, cohesive styling
- **Well-documented**: Comprehensive guides included

Start building pipelines! 🚀
