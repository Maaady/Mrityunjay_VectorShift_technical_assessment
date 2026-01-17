# Pipeline Builder Backend

A FastAPI-based backend service for validating and processing pipeline workflows. This service handles pipeline parsing, cycle detection, and DAG validation for a visual pipeline builder.

## Overview

The backend provides REST API endpoints to validate pipeline configurations, checking for:
- Valid pipeline structure (nodes and edges)
- Directed Acyclic Graph (DAG) compliance - ensuring no circular dependencies
- Edge validation - confirming connections reference existing nodes

## Architecture

### Technology Stack
- **Framework**: FastAPI (async Python web framework)
- **CORS**: Enabled for frontend communication
- **Validation**: Pydantic models for type safety
- **Algorithm**: DFS-based cycle detection for DAG validation

### Core Components

#### Data Models

**Node**
```python
{
  "id": str,
  "type": str,
  "position": Dict[str, Any],
  "data": Dict[str, Any]
}
```

**Edge**
```python
{
  "source": str,
  "target": str,
  "id": str
}
```

**Pipeline**
```python
{
  "nodes": List[Node],
  "edges": List[Edge]
}
```

#### API Endpoints

**GET** `/`
- Health check endpoint
- Returns: `{ "Ping": "Pong" }`

**POST** `/pipelines/parse`
- Validates pipeline configuration
- Request body: Pipeline object
- Returns:
  ```json
  {
    "num_nodes": int,
    "num_edges": int,
    "is_dag": bool
  }
  ```

### Algorithm: DAG Detection

Uses Depth-First Search (DFS) with three-state coloring:
- **0** = Unvisited
- **1** = Currently visiting (in stack)
- **2** = Visited (complete)

**Process**:
1. Build adjacency list from edges
2. Filter edges to only include valid node connections
3. Traverse graph using DFS from each unvisited node
4. Detect cycles by finding back edges (node state = 1)
5. Return true if no cycles found, false otherwise

**Time Complexity**: O(V + E) where V = nodes, E = edges
**Space Complexity**: O(V)

## Setup

### Prerequisites
- Python 3.8+
- pip package manager

### Installation

1. Install dependencies:
```bash
pip install fastapi uvicorn pydantic
```

2. Navigate to backend directory:
```bash
cd backend
```

### Running the Server

**Development mode** (with auto-reload):
```bash
uvicorn main:app --reload
```

**Production mode**:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Server will be available at `http://localhost:8000`

## API Usage Examples

### Health Check
```bash
curl http://localhost:8000/
```

### Validate Pipeline
```bash
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "node1", "type": "input", "position": {}, "data": {}},
      {"id": "node2", "type": "output", "position": {}, "data": {}}
    ],
    "edges": [
      {"id": "edge1", "source": "node1", "target": "node2"}
    ]
  }'
```

### Response Example (Valid DAG)
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

### Response Example (Invalid - Contains Cycle)
```json
{
  "num_nodes": 2,
  "num_edges": 2,
  "is_dag": false
}
```

## CORS Configuration

The backend is configured to accept requests from any origin:
- `allow_origins`: ["*"]
- `allow_credentials`: true
- `allow_methods`: ["*"]
- `allow_headers`: ["*"]

## Error Handling

- **Validation Errors**: Returns 422 with Pydantic validation details
- **Server Errors**: Returns 500 with error description
- **Invalid References**: Edges with non-existent nodes are ignored

## Development

### File Structure
```
backend/
├── main.py          # FastAPI application and endpoints
├── __pycache__/     # Python cache directory
└── README.md        # This file
```

### Testing

To test the DAG validation logic:

```python
from main import is_dag, Node, Edge

# Valid DAG (linear chain)
nodes = [
    Node(id="n1", type="input", position={}, data={}),
    Node(id="n2", type="processor", position={}, data={}),
    Node(id="n3", type="output", position={}, data={})
]
edges = [
    Edge(source="n1", target="n2", id="e1"),
    Edge(source="n2", target="n3", id="e2")
]
assert is_dag(nodes, edges) == True

# Invalid (contains cycle)
edges = [
    Edge(source="n1", target="n2", id="e1"),
    Edge(source="n2", target="n3", id="e2"),
    Edge(source="n3", target="n1", id="e3")  # Creates cycle
]
assert is_dag(nodes, edges) == False
```

## Frontend Integration

The frontend sends POST requests to `/pipelines/parse` when validating user-created pipelines. The response determines if the pipeline is valid (acyclic) and displays the appropriate UI feedback.

## Troubleshooting

**CORS Errors**: Ensure CORS middleware is enabled (it is by default)

**Connection Refused**: Verify the server is running on the correct host/port

**Validation Errors**: Check that request JSON matches the expected schema - all required fields must be present

## License

Part of Mrityunjay_VectorShift_technical_assessment project
