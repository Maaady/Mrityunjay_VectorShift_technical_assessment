# Text Node Enhancements Guide

## Overview

The Text Node has been significantly enhanced with two major features:
1. **Dynamic Resizing** - Textarea expands/contracts with content
2. **Variable Detection** - Automatic handle creation for `{{ variableName }}` patterns

---

## Feature 1: Dynamic Resizing

### Problem
Original Text Node had a fixed height of 80px, making it hard to see text being typed.

### Solution
Textarea automatically resizes based on content:

```javascript
const autoResizeTextarea = () => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = 
      Math.min(textareaRef.current.scrollHeight, 200) + 'px';
  }
};
```

### Features
- ✅ Starts at ~60px (3 rows)
- ✅ Expands as user types
- ✅ Maximum 200px to prevent excessive growth
- ✅ Smooth animation transitions
- ✅ Auto-resize on focus

### Visual Effect
```
Before typing:     After typing:          After more typing:
┌──────────────┐   ┌──────────────┐      ┌──────────────────┐
│ Text         │   │ Text         │      │ Text             │
│              │   │ Hello world  │      │ Hello world      │
│              │   │              │      │ This is amazing  │
└──────────────┘   └──────────────┘      │ text node!       │
                                         │                  │
                                         └──────────────────┘
```

---

## Feature 2: Variable Detection & Dynamic Handles

### Problem
Manual variable configuration is tedious:
- Users had to manually create handles for each variable
- No visual feedback about what variables are available
- Error-prone and inconsistent

### Solution
Automatic detection using regex pattern matching:

```javascript
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
```

### How It Works

**Step 1: Detection**
```
User Input: "Hello {{ name }}, score: {{ score }}"
       ↓
Regex Pattern: /\{\{(\w+)\}\}/g
       ↓
Variables Found: ["name", "score"]
```

**Step 2: Handle Creation**
```javascript
const handles = [
  ...variables.map((variable, index) => ({
    id: `var-${variable}`,
    type: 'target',
    position: Position.Left,
    style: { top: `${50 + index * 25}px` }  // Stack vertically
  })),
  { id: 'output', type: 'source', position: Position.Right }
];
```

**Step 3: Visual Display**
- Handles appear on the left side
- Variable tags display in the node
- Each variable is clickable/connectable

### Variable Syntax Rules

✅ **Valid Variable Names**
```
{{ input }}          // Simple
{{ first_name }}     // Underscores
{{ data123 }}        // Numbers
{{ VALUE }}          // Uppercase
{{ score_2023 }}     // Mixed
```

❌ **Invalid Variable Names**
```
{{ first-name }}     // Hyphens not allowed
{{ 123input }}       // Can't start with number
{{ first name }}     // Spaces not allowed
{{ $var }}           // Special chars not allowed
{{ }}                // Empty not allowed
```

### Visual Example

#### Before Enhancement
```
Text Node
┌─────────────────────┐
│ Text                │
│ {{ user_name }}     │
│                     │
└─────────────────────┘
       No handles!
```

#### After Enhancement
```
Text Node
    ⊙──┌────────────────────┐
       │ Text               │
    ⊙──│ {{ user_name }}    │
       │ {{ user_score }}   │
    ⊙──│                    │
       │ Variables:         │
       │ [user_name] [user_score]
       └────────────────────┘──⊙
```

The ⊙ symbols represent handles:
- Left side: Input handles (one per variable)
- Right side: Output handle

### Dynamic Styling

Variables are displayed with styled tags:

```css
.variable-tag {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid #a78bfa;
  color: #e0e7ff;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
}
```

---

## Implementation Details

### State Management
```javascript
const [currText, setCurrText] = useState(data?.text || '{{input}}');
const textareaRef = useRef(null);
```

### Memoization for Performance
```javascript
const variables = useMemo(() => extractVariables(currText), [currText]);
```

This ensures:
- Variable extraction only happens when text changes
- Handles are only recreated when variables change
- No unnecessary re-renders

### Integration with BaseNode
```javascript
return (
  <BaseNode
    id={id}
    data={data}
    nodeType="text"
    title="Text"
    handles={handles}  // Dynamically generated!
  >
    {/* Content */}
  </BaseNode>
);
```

---

## Real-World Examples

### Example 1: Simple Template
```
Text: "Hello {{ name }}"
Result: 1 variable (name)
Handles: 1 input + 1 output
```

### Example 2: Address Template
```
Text: "{{ street }}, {{ city }}, {{ state }} {{ zip }}"
Result: 4 variables (street, city, state, zip)
Handles: 4 inputs + 1 output
```

### Example 3: Complex Message
```
Text: "User {{ user_id }} logged in at {{ timestamp }} from {{ ip_address }}"
Result: 3 variables (user_id, timestamp, ip_address)
Handles: 3 inputs + 1 output
```

### Example 4: Duplicates Ignored
```
Text: "{{ name }} says hello to {{ name }}"
Result: 1 unique variable (name - duplicate ignored)
Handles: 1 input + 1 output (not 2!)
```

The `!matches.includes(match[1])` check ensures duplicates are ignored.

---

## Styling Details

### Node Styling (baseNode.css)
```css
.base-node[data-node-type="text"] {
  border-color: #8b5cf6;      /* Purple border */
}

.base-node[data-node-type="text"] .node-title {
  color: #a78bfa;             /* Light purple text */
}
```

### Textarea Styling (textNode.css)
```css
.text-node-textarea {
  resize: none;               /* Prevent manual resize */
  width: 100%;
  min-height: 60px;           /* Start size */
  max-height: 200px;          /* Max before scrolling */
  padding: 6px 8px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #8b5cf6;
  color: #e0e7ff;
  border-radius: 4px;
  font-family: 'Courier New', monospace;  /* Monospace for code-like feel */
  font-size: 12px;
  line-height: 1.4;
  overflow-y: auto;
}

.text-node-textarea:focus {
  outline: none;
  border-color: #a78bfa;      /* Lighter on focus */
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
}
```

---

## Performance Considerations

### 1. memoization
```javascript
const variables = useMemo(() => extractVariables(currText), [currText]);
```
- Only recalculates when `currText` changes
- Prevents unnecessary re-renders of children

### 2. Textarea Reference
```javascript
const textareaRef = useRef(null);
```
- Direct DOM access for resize calculations
- No state updates needed for resize operations

### 3. Regex Execution
```javascript
const varPattern = /\{\{(\w+)\}\}/g;
```
- Efficient pattern for valid variable names
- Global flag ensures finding all matches
- Linear time complexity O(n) where n = text length

### Optimization Results
- ✅ Resize happens without triggering component re-render
- ✅ Variable detection is memoized
- ✅ No memory leaks from regex operations

---

## Edge Cases Handled

### Case 1: Empty Text
```
Text: ""
Variables: []
Result: No handles created
```

### Case 2: No Variables
```
Text: "Hello world"
Variables: []
Result: Only output handle visible
```

### Case 3: Adjacent Variables
```
Text: "{{ first }}{{ last }}"
Variables: ["first", "last"]
Result: 2 handles created correctly
```

### Case 4: Special Characters in Text
```
Text: "Price: ${{ amount }} @{{ location }}"
Variables: ["amount", "location"]
Result: Special chars outside {{ }} are ignored
```

### Case 5: Nested Braces (Invalid)
```
Text: "{{ var1 {{ var2 }} }}"
Variables: ["var2"]
Result: Only valid patterns extracted
```

### Case 6: Spaces in Variable Name (Invalid)
```
Text: "{{ my var }}"
Variables: []
Result: Spaces mean not a valid variable
```

---

## User Experience Flow

### Step 1: Create Text Node
User drags "Text" from toolbar onto canvas.

### Step 2: Add Variables
User types: `"Hello {{ user }}"`

### Step 3: See Handles
Left side handle appears for `{{ user }}`

### Step 4: Connect Input
User connects a node's output to the `user` handle

### Step 5: Node is Ready
Text content can now reference connected data

---

## Technical Stack

| Component | Technology |
|-----------|-----------|
| Text Input | HTML `<textarea>` |
| Auto-resize | JavaScript/CSS |
| Variable Detection | Regex Pattern Matching |
| Handle Generation | React/ReactFlow |
| State Management | React Hooks (useState, useMemo, useRef) |
| Styling | CSS Classes |
| Type System | JavaScript (no TypeScript) |

---

## Future Enhancements

1. **Template Library**: Pre-built text templates
2. **Syntax Highlighting**: Highlight variables in different color
3. **Variable Validation**: Warn about undefined variables
4. **Preview Mode**: Show rendered text with sample data
5. **Multi-line Variables**: Support complex variable paths like `{{ user.name }}`
6. **Escape Sequences**: Allow `\{\{` for literal braces
7. **Formatting**: Apply formatting like `{{ name | uppercase }}`

---

## Summary

The enhanced Text Node demonstrates:
✨ **Smart Automation**: Variables detected automatically
✨ **Better UX**: Textarea grows with content
✨ **Visual Feedback**: Variable tags for clarity
✨ **Scalability**: Supports unlimited variables
✨ **Performance**: Optimized with memoization
✨ **Robustness**: Handles edge cases gracefully

This pattern can be extended to other nodes and components!
