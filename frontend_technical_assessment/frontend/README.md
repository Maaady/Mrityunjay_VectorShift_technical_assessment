# Pipeline Builder - Technical Assessment

A modern, interactive visual pipeline builder built with React and ReactFlow. This project demonstrates advanced component abstraction, dynamic node handling, and professional UI/UX design.

## Features

### Part 1: Node Abstraction ✅

**BaseNode Component** - A reusable abstraction layer that eliminates code duplication:
- Centralized styling and configuration
- Simplified handle management
- Automatic node type styling
- Easy to extend with new node types

**Refactored Existing Nodes:**
- Input Node - Configurable data input sources
- Output Node - Data output destinations
- LLM Node - Language model processor with multiple inputs
- Text Node - Enhanced with dynamic resizing and variables

**New Nodes (5 Examples):**
1. **Calculator Node** - Performs arithmetic operations (add, subtract, multiply, divide)
2. **Filter Node** - Applies conditional filtering to data streams
3. **Merger Node** - Combines multiple data streams with customizable strategies
4. **Logger Node** - Captures and logs data flow with configurable log levels
5. **Validator Node** - Validates data against rules (email, URL, phone, number)

### Part 2: Styling ✅

Professional, unified dark-themed design with:
- Modern gradient backgrounds
- Consistent color scheme (blues, purples, teals)
- Smooth transitions and hover effects
- Type-specific node colors for quick visual identification
- Responsive layout that adapts to different screen sizes
- Custom scrollbars and UI controls
- Better button and form styling

**Color Coding by Node Type:**
- 🟢 Input: Green (#10b981)
- 🟠 Output: Orange (#f59e0b)
- 🩷 LLM: Pink (#ec4899)
- 🟣 Text: Purple (#8b5cf6)
- 🔵 Calculator: Cyan (#06b6d4)
- 🟢 Filter: Teal (#14b8a6)
- 🔷 Merger: Indigo (#6366f1)
- 🔴 Logger: Red (#ef4444)
- 🟣 Validator: Violet (#8b5cf6)

### Part 3: Text Node Logic ✅

**Dynamic Resizing:**
- Textarea automatically expands/contracts based on content
- Maximum height of 200px prevents excessive growth
- Smooth animations on resize

**Variable Detection:**
- Automatically detects variables in format: `{{ variableName }}`
- Creates corresponding left-side Handles for each variable
- Visual display of detected variables with styled tags
- Supports multiple variables in a single text node

## File Structure

```
src/
├── nodes/
│   ├── BaseNode.js          # Abstraction layer for all nodes
│   ├── inputNode.js         # Refactored Input node
│   ├── outputNode.js        # Refactored Output node
│   ├── llmNode.js           # Refactored LLM node
│   ├── textNode.js          # Enhanced Text node with variables
│   ├── calculatorNode.js    # New: Calculator node
│   ├── filterNode.js        # New: Filter node
│   ├── mergerNode.js        # New: Merger node
│   ├── loggerNode.js        # New: Logger node
│   └── validatorNode.js     # New: Validator node
├── styles/
│   ├── App.css              # Main app styling
│   ├── baseNode.css         # Node abstraction styling
│   ├── textNode.css         # Text node specific styling
│   ├── toolbar.css          # Toolbar styling
│   ├── ui.css               # Pipeline UI styling
│   └── submit.css           # Submit button styling
├── App.js                   # Main application component
├── ui.js                    # ReactFlow canvas component
├── toolbar.js               # Node toolbar component
├── submit.js                # Submit button component
├── draggableNode.js         # Draggable toolbar item
├── store.js                 # Zustand state management
└── index.css                # Global styles

public/
└── index.html               # HTML template
```

## Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

### Usage

1. **Add Nodes**: Drag nodes from the toolbar onto the canvas
2. **Connect Nodes**: Click and drag from output handles to input handles
3. **Configure Nodes**: Click on nodes to modify their properties
4. **Variables in Text**: Use `{{ variableName }}` syntax to create input handles
5. **Submit**: Click "Submit Pipeline" to export your configuration

## Technology Stack

- **React 18** - UI framework
- **ReactFlow 11** - Visual node editor
- **Zustand** - State management
- **CSS** - Styling (no CSS-in-JS libraries)

## Key Design Patterns

### 1. BaseNode Abstraction
The `BaseNode` component eliminates code duplication by:
- Managing handles dynamically through props
- Centralizing styling through CSS classes
- Supporting type-specific styling through data attributes

**Benefits:**
- New nodes can be created with 20 lines of code instead of 50
- Consistent styling across all nodes
- Easy to apply global design changes

### 2. Handle Management
Handles are configured as arrays:
```javascript
const handles = [
  { id: 'input', type: 'target', position: Position.Left },
  { id: 'output', type: 'source', position: Position.Right }
];
```

### 3. Variable Detection
Text nodes use regex to detect variables:
```javascript
const varPattern = /\{\{(\w+)\}\}/g;
// Automatically creates handles for each variable
```

## Future Enhancements

- Add more node types (Conditional, Loop, Parallel)
- Implement pipeline execution engine
- Add save/load functionality
- Implement node validation rules
- Add undo/redo functionality
- Create custom node builder UI
- Add analytics and monitoring

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
