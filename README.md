# Mrityunjay_VectorShift_technical_assessment

A comprehensive technical assessment project implementing a visual pipeline builder with a React frontend and FastAPI backend.

## Project Overview

This project demonstrates building an interactive workflow system where users can:
- Create visual pipelines by dragging and connecting nodes
- Validate pipeline integrity (DAG compliance)
- Define data flows through various processing nodes
- Persist and manage pipeline configurations

## Project Structure

```
.
├── frontend_technical_assessment/          # Main project directory
│   ├── frontend/                          # React-based UI
│   │   ├── public/                        # Static assets
│   │   ├── src/
│   │   │   ├── nodes/                     # Node component implementations
│   │   │   ├── styles/                    # CSS styling
│   │   │   └── *.js                       # Core React components
│   │   ├── package.json                   # Frontend dependencies
│   │   └── README.md                      # Frontend documentation
│   │
│   ├── backend/                           # FastAPI server
│   │   ├── main.py                        # Backend API and logic
│   │   └── README.md                      # Backend documentation
│   │
│   └── [Documentation files]              # Project guides and specs
│
└── README.md                               # This file
```

## Key Features

### Frontend (React + ReactFlow)
- **Node Abstraction**: Reusable BaseNode component eliminating code duplication
- **10 Node Types**: Input, Output, LLM, Text, Calculator, Filter, Merger, Logger, Validator, and more
- **Dynamic Text Nodes**: Variable detection with automatic handle creation
- **Professional Styling**: Dark theme with type-specific color coding
- **State Management**: Zustand for efficient state handling
- **Responsive Design**: Adapts to different screen sizes

### Backend (FastAPI)
- **Pipeline Validation**: Checks pipeline structure and integrity
- **DAG Detection**: Uses DFS algorithm to ensure no circular dependencies
- **RESTful API**: Simple endpoints for pipeline operations
- **CORS Support**: Enables frontend communication
- **Error Handling**: Comprehensive validation and error responses

## Quick Start

### Frontend Setup
```bash
cd frontend_technical_assessment/frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

### Backend Setup
```bash
cd frontend_technical_assessment/backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```
Backend runs on `http://localhost:8000`

## Documentation

- [Frontend Documentation](frontend_technical_assessment/frontend/README.md) - Detailed frontend architecture and components
- [Backend Documentation](frontend_technical_assessment/backend/README.md) - API endpoints and validation logic
- [Architecture Diagrams](frontend_technical_assessment/ARCHITECTURE_DIAGRAMS.md) - System design and data flow
- [Node Abstraction Guide](frontend_technical_assessment/NODE_ABSTRACTION_GUIDE.md) - Component design patterns
- [Text Node Guide](frontend_technical_assessment/TEXT_NODE_GUIDE.md) - Variable handling and dynamic resizing
- [Styling Guide](frontend_technical_assessment/STYLING_GUIDE.md) - Design system and CSS architecture
- [Backend Integration Guide](frontend_technical_assessment/BACKEND_INTEGRATION_GUIDE.md) - API integration details
- [Deployment Guide](frontend_technical_assessment/DEPLOYMENT_GUIDE.md) - Production setup instructions

## Technical Stack

**Frontend**
- React 18.x
- ReactFlow 10.x (node and edge management)
- Zustand (state management)
- CSS3 (styling)

**Backend**
- Python 3.8+
- FastAPI (web framework)
- Pydantic (data validation)
- Uvicorn (ASGI server)

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                  React Frontend                      │
│  ┌─────────────────────────────────────────────┐   │
│  │         Canvas (ReactFlow)                  │   │
│  │  ┌──────────────┐    ┌──────────────┐      │   │
│  │  │ Input Node   ├───→│ Output Node  │      │   │
│  │  └──────────────┘    └──────────────┘      │   │
│  │                                            │   │
│  │  Toolbar | Submit Button | Store           │   │
│  └─────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┬──┘
                                                   │
                    HTTP / REST API                │
                                                   │
┌──────────────────────────────────────────────────▼──┐
│            FastAPI Backend                          │
│  ┌────────────────────────────────────────────┐    │
│  │  POST /pipelines/parse                     │    │
│  │  - Validate pipeline structure             │    │
│  │  - Check DAG compliance                    │    │
│  │  - Return validation results               │    │
│  └────────────────────────────────────────────┘    │
│                                                     │
│  ┌────────────────────────────────────────────┐    │
│  │  Algorithms                                │    │
│  │  - DFS-based cycle detection               │    │
│  │  - Graph validation                        │    │
│  └────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## Development Workflow

1. **Create Nodes**: Add new node types in `frontend/src/nodes/`
2. **Implement Logic**: Backend handles validation and processing
3. **Style Components**: Update CSS files with consistent theming
4. **Validate Pipelines**: Send to backend for DAG and integrity checks
5. **Deploy**: Follow deployment guide for production

## API Example

### Validate a Pipeline
```bash
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "input1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
      {"id": "output1", "type": "output", "position": {"x": 200, "y": 0}, "data": {}}
    ],
    "edges": [
      {"id": "edge1", "source": "input1", "target": "output1"}
    ]
  }'
```

**Response**:
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## Testing

- Frontend: Manual testing via UI, node connections, and visual feedback
- Backend: Test DAG validation with cyclic and acyclic pipelines
- Integration: Validate full pipeline flow from frontend to backend

## Performance Considerations

- **DAG Detection**: O(V + E) using DFS algorithm
- **Frontend Rendering**: ReactFlow optimized for large graphs
- **State Management**: Zustand provides minimal re-renders
- **API Requests**: Debounced validation calls

## Contributing Guidelines

1. Follow existing code patterns and naming conventions
2. Update documentation when adding features
3. Test new nodes with various configurations
4. Ensure CORS compatibility for frontend integration
5. Maintain consistent styling across components

## License

Technical assessment project for VectorShift