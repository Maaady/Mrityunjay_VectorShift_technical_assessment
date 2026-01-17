# Visual Architecture & Diagrams

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        App.js                               │
│                    (Main Container)                         │
└─────────────────┬───────────────────────┬───────────────────┘
                  │                       │
        ┌─────────▼────────┐    ┌────────▼──────────┐
        │  App.css         │    │  index.css        │
        │ (Global Layout)  │    │ (Global Styles)   │
        └──────────────────┘    └───────────────────┘


        ┌─────────────────────────────────────────────────────┐
        │         Application Header                         │
        │    (Title + Subtitle + Blue Gradient)              │
        └─────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────▼─────────────────────┐
        │      PipelineToolbar                      │
        │  (Organized Node Categories)              │
        │  ├─ Core: Input, LLM, Output, Text        │
        │  ├─ Processing: Calculator, Filter, ...   │
        │  └─ Utilities: Logger                     │
        │                                            │
        │  toolbar.css (styling + grid layout)      │
        └─────────────────────┬─────────────────────┘
                              │
        ┌─────────────────────▼─────────────────────┐
        │      PipelineUI (Canvas)                  │
        │   (ReactFlow Instance)                    │
        │  ┌──────────────────────────────────────┐ │
        │  │  Canvas with Nodes & Connections    │ │
        │  │  ┌──────────┐    ┌──────────┐       │ │
        │  │  │ Input    │    │ LLM      │       │ │
        │  │  │ (Green)  │───→│ (Pink)   │       │ │
        │  │  └──────────┘    └──────────┘       │ │
        │  │       │                              │ │
        │  │       └─→ [Other Nodes]             │ │
        │  │                                      │ │
        │  │  baseNode.css (All node styling)    │ │
        │  │  textNode.css (Text-specific)       │ │
        │  │  ui.css (Canvas + controls)         │ │
        │  └──────────────────────────────────────┘ │
        └─────────────────────┬─────────────────────┘
                              │
        ┌─────────────────────▼─────────────────────┐
        │      SubmitButton                         │
        │  [Clear] [Submit Pipeline]                │
        │                                            │
        │  submit.css (button styling)              │
        └──────────────────────────────────────────┘
```

---

## Node Architecture

```
┌────────────────────────────────────────────────────┐
│           BaseNode.js (Abstraction)                │
│                                                    │
│  export const BaseNode = ({                       │
│    id, data, nodeType, title,                    │
│    children, handles, showHandle                 │
│  }) => {                                          │
│    return (                                       │
│      <div className="base-node"                  │
│           data-node-type={nodeType}>             │
│        ┌───────────────────────────────┐         │
│        │ Node Header (Title)           │         │
│        ├───────────────────────────────┤         │
│        │ Node Content (children)       │         │
│        │ - Inputs, Selects, Textareas │         │
│        ├───────────────────────────────┤         │
│        │ Handles (generated from array)│         │
│        │ ◎ ← Handles render via map   │         │
│        └───────────────────────────────┘         │
│      </div>                                       │
│    );                                            │
│  }                                               │
└────────────────────────────────────────────────────┘
                      ▲
                      │ extends
        ┌─────────────┼─────────────┬──────────┐
        │             │             │          │
   ┌────▼────┐ ┌─────▼────┐ ┌─────▼────┐ ...
   │ Input   │ │ Output   │ │ Text     │
   │ Node    │ │ Node     │ │ Node     │
   └─────────┘ └──────────┘ └──────────┘

   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
   │ Calculator   │ │ Filter       │ │ Merger       │
   │ Node         │ │ Node         │ │ Node         │
   └──────────────┘ └──────────────┘ └──────────────┘

   ┌──────────────┐ ┌──────────────┐
   │ Logger       │ │ Validator    │
   │ Node         │ │ Node         │
   └──────────────┘ └──────────────┘
```

---

## State Management Flow

```
┌──────────────────────────────────────┐
│         Zustand Store (store.js)    │
├──────────────────────────────────────┤
│  State:                              │
│  ├─ nodes: []                       │
│  ├─ edges: []                       │
│  ├─ nodeIDs: {}                     │
│  │                                  │
│  Actions:                           │
│  ├─ getNodeID(type)                │
│  ├─ addNode(node)                  │
│  ├─ onNodesChange(changes)         │
│  ├─ onEdgesChange(changes)         │
│  ├─ onConnect(connection)          │
│  └─ updateNodeField(...)           │
└──────────────────────────────────────┘
           ▲                ▲
           │                │
      ┌────┴────┐       ┌───┴────┐
      │ ui.js   │       │toolbar  │
      │(Canvas) │       │.js      │
      └─────────┘       └─────────┘
           │                │
           └────────┬───────┘
                    │ updates
              ┌─────▼────────┐
              │ Components   │
              │ Re-render    │
              └──────────────┘
```

---

## Text Node Variable Detection Flow

```
┌─────────────────────────────────────────────┐
│  User types: "Hello {{ name }}"             │
└────────────────┬────────────────────────────┘
                 │
        ┌────────▼────────┐
        │ handleTextChange│
        │ (onChange)      │
        └────────┬────────┘
                 │ setCurrText(e.target.value)
                 │
        ┌────────▼──────────────────────────┐
        │ extractVariables(currText)         │
        │ Pattern: /\{\{(\w+)\}\}/g         │
        │                                   │
        │ Match: "{{ name }}"               │
        │ Result: ["name"]                  │
        └────────┬──────────────────────────┘
                 │
        ┌────────▼──────────────────────────┐
        │ useMemo creates handles array:     │
        │ [                                  │
        │   {                                │
        │     id: "var-name",               │
        │     type: "target",               │
        │     position: Position.Left,      │
        │     style: { top: "50px" }        │
        │   },                               │
        │   {                                │
        │     id: "output",                 │
        │     type: "source",               │
        │     position: Position.Right      │
        │   }                                │
        │ ]                                  │
        └────────┬──────────────────────────┘
                 │
        ┌────────▼──────────────────────────┐
        │ BaseNode receives handles array   │
        │ Maps to <Handle> components       │
        │ Creates left handles for each var │
        │                                   │
        │ ◎─ name  ┌─────────┐   output ─◎ │
        │          │ Text    │             │
        │          │ Hello {{ │            │
        │          │ name }} │             │
        │          │         │             │
        │          │Variables│             │
        │          │[name]   │             │
        │          └─────────┘             │
        └────────────────────────────────────┘
```

---

## Handle Configuration Pattern

```
Before (Manual):
─────────────────────────────────────────
<Handle type="target" position={Position.Left} id={`${id}-input1`} />
<Handle type="target" position={Position.Left} id={`${id}-input2`} />
<Handle type="source" position={Position.Right} id={`${id}-output`} />

Drawbacks:
❌ Repetitive code
❌ Hard to modify
❌ Error-prone
❌ No abstraction


After (Array-Driven):
─────────────────────────────────────────
const handles = [
  { id: 'input1', type: 'target', position: Position.Left },
  { id: 'input2', type: 'target', position: Position.Left },
  { id: 'output', type: 'source', position: Position.Right }
];

{handles.map(handle => (
  <Handle
    key={`${id}-${handle.id}`}
    type={handle.type}
    position={handle.position}
    id={`${id}-${handle.id}`}
    style={handle.style}
  />
))}

Benefits:
✅ Clean, declarative
✅ Easy to modify
✅ Reusable pattern
✅ Scalable
```

---

## Type-Specific Styling CSS

```
HTML Attribute → CSS Selector
─────────────────────────────────────────

<BaseNode nodeType="customInput" ... />
           ▼
.base-node[data-node-type="customInput"] {
  border-color: #10b981; /* Green */
}

<BaseNode nodeType="calculator" ... />
           ▼
.base-node[data-node-type="calculator"] {
  border-color: #06b6d4; /* Cyan */
}

Node Type Mapping:
┌──────────────────┬──────────────────┐
│ Node Type        │ Color            │
├──────────────────┼──────────────────┤
│ customInput      │ Green #10b981    │
│ customOutput     │ Orange #f59e0b   │
│ llm              │ Pink #ec4899     │
│ text             │ Purple #8b5cf6   │
│ calculator       │ Cyan #06b6d4     │
│ filter           │ Teal #14b8a4     │
│ merger           │ Indigo #6366f1   │
│ logger           │ Red #ef4444      │
│ validator        │ Violet #8b5cf6   │
└──────────────────┴──────────────────┘

CSS Inheritance:
.base-node[data-node-type="X"] {
  border-color: #color;  ← Main color
}

.base-node[data-node-type="X"] .node-title {
  color: #lighter;  ← Highlight color
}

.base-node[data-node-type="X"] input,
.base-node[data-node-type="X"] select {
  border-color: #color;  ← Input border
}
```

---

## Component File Organization

```
src/
├── App.js                    (Main container, imports css)
├── index.js                  (React root)
├── index.css                 (Global resets)
├── store.js                  (Zustand state)
├── draggableNode.js          (Toolbar item)
├── toolbar.js                (Toolbar component, imports css)
├── ui.js                     (Canvas, imports css + nodes)
├── submit.js                 (Submit button, imports css)
│
├── nodes/                    (Node components)
│   ├── BaseNode.js           (Abstraction, imports css)
│   ├── inputNode.js          (Uses BaseNode)
│   ├── outputNode.js         (Uses BaseNode)
│   ├── llmNode.js            (Uses BaseNode)
│   ├── textNode.js           (Uses BaseNode + textNode.css)
│   ├── calculatorNode.js     (Uses BaseNode)
│   ├── filterNode.js         (Uses BaseNode)
│   ├── mergerNode.js         (Uses BaseNode)
│   ├── loggerNode.js         (Uses BaseNode)
│   └── validatorNode.js      (Uses BaseNode)
│
└── styles/                   (CSS files)
    ├── App.css               (Global layout)
    ├── baseNode.css          (All nodes)
    ├── textNode.css          (Text-specific)
    ├── toolbar.css           (Toolbar)
    ├── ui.css                (Canvas)
    └── submit.css            (Buttons)
```

---

## Styling Cascade

```
Global Styles (index.css)
        ▼
App-Level Styles (App.css)
        ├─ .app-container
        ├─ .app-header
        └─ .app-subtitle
        ▼
Component-Specific Styles
        ├─ toolbar.css (.toolbar-container)
        ├─ ui.css (.pipeline-ui-wrapper)
        └─ submit.css (.submit-container)
        ▼
Node Styles (baseNode.css)
        ├─ .base-node (all nodes)
        ├─ .base-node[data-node-type="X"] (type-specific)
        ├─ .node-header, .node-title
        ├─ .node-content
        ├─ .react-flow__handle (handles)
        ├─ input, select, textarea (forms)
        └─ label (labels)
        ▼
Text Node Specific (textNode.css)
        ├─ .text-node-textarea (resize)
        ├─ .variables-info (container)
        ├─ .variables-label
        └─ .variable-tag (tags)
```

---

## Data Flow: Add Node → Render

```
User drags node from toolbar
            ▼
onDragStart fires
- Set dataTransfer with nodeType
            ▼
onDrop in canvas
- Parse dataTransfer
- Get position in canvas coordinates
            ▼
Call store.addNode()
            ▼
store.getNodeID(type)
- Returns unique ID (e.g., "text-1")
- Increments counter for next time
            ▼
Create node object:
{
  id: "text-1",
  type: "text",
  position: { x: 100, y: 50 },
  data: { id: "text-1", nodeType: "text" }
}
            ▼
Add to store.nodes[]
            ▼
Component re-renders with new node
            ▼
ReactFlow renders node using nodeTypes map:
nodeTypes["text"] → TextNode component
            ▼
TextNode renders with BaseNode
- Creates handles from array
- Applies baseNode.css styles
- Applies type-specific [data-node-type="text"] styles
            ▼
Result: New styled node appears on canvas!
```

---

## Variable Detection in TextNode

```
User Input Timeline:
─────────────────────────────────────────

t=0ms: User types 'H'
      Text: "H"
      Variables: []
      Handles: [output]

t=100ms: User types 'ello {{ n'
        Text: "Hello {{ n"
        Variables: []
        Handles: [output]

t=200ms: User types 'ame }}'
        Text: "Hello {{ name }}"
        ┌─────────────────────────────┐
        │ extractVariables() runs:    │
        │ Regex matches: {{ name }}   │
        │ Result: ["name"]            │
        └─────────────────────────────┘
        Variables: ["name"]
        ┌─────────────────────────────┐
        │ useMemo triggers:           │
        │ New handles array created   │
        │ Re-render with new handles  │
        └─────────────────────────────┘
        Handles: [
          { id: "var-name", type: "target", ... },
          { id: "output", type: "source", ... }
        ]

t=300ms: User adds ', score: {{ score }}'
        Text: "Hello {{ name }}, score: {{ score }}"
        Variables: ["name", "score"]
        Handles: [
          { id: "var-name", ... top: 50px },
          { id: "var-score", ... top: 75px },
          { id: "output", type: "source" }
        ]
        ┌──────────────────────────────┐
        │ Visual Display:              │
        │ ◎─ name                      │
        │ ◎─ score  ┌──────────────┐  │
        │          │ Text Node     │  │
        │          │ Hello {{ name │  │
        │          │ }}, score: {{ │  │
        │          │ score }}      │  │
        │          │               │  │
        │          │ Variables:    │  │
        │          │ [name][score] │  │
        │          └──────────────┘  │
        │                    output─◎│
        └──────────────────────────────┘
```

---

## Summary Diagrams

### Code Reduction with BaseNode
```
Before:  Input    Output   LLM      Text     New Nodes  Total
         └─50 ─┘  └─50 ─┘  └─30 ─┘  └─50 ─┘   └─250 ─┘ ~450 lines
         
After:   Input    Output   LLM      Text     New Nodes  Total
         └─25 ─┘  └─25 ─┘  └─20 ─┘  └─30 ─┘   └─150 ─┘ ~260 lines
         
Saved:   ▓▓▓▓▓ 40% code reduction across board!
```

### Node Type Distribution
```
Core Nodes (4):
├── Input ◎──◎
├── Output ◎──◎
├── LLM ◎──◎──◎
└── Text ◎──◎

Processing Nodes (4):
├── Calculator ◎──◎──◎
├── Filter ◎──◎──◎
├── Merger ◎──◎──◎──◎
└── Validator ◎──◎──◎

Utilities (1):
└── Logger ◎──◎
```

This architecture is:
✅ Scalable - Easy to add more
✅ Maintainable - Single abstraction
✅ Consistent - Unified design
✅ Documented - This guide
