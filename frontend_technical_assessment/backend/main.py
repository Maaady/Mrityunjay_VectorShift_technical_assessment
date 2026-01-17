from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import deque, defaultdict

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edge(BaseModel):
    source: str
    target: str
    id: str

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, Any]
    data: Dict[str, Any]

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the given nodes and edges form a Directed Acyclic Graph (DAG).
    Uses topological sort with DFS to detect cycles.
    """
    if not nodes:
        return True
    
    if not edges:
        return True
    
    # Build adjacency list
    graph = defaultdict(list)
    node_ids = {node.id for node in nodes}
    
    for edge in edges:
        # Only add edge if both nodes exist
        if edge.source in node_ids and edge.target in node_ids:
            graph[edge.source].append(edge.target)
    
    # Check for cycles using DFS
    # States: 0 = unvisited, 1 = visiting, 2 = visited
    state = {node_id: 0 for node_id in node_ids}
    
    def has_cycle_dfs(node_id: str) -> bool:
        """DFS to detect cycle"""
        if state[node_id] == 1:  # Back edge found (cycle)
            return True
        if state[node_id] == 2:  # Already visited
            return False
        
        state[node_id] = 1  # Mark as visiting
        
        for neighbor in graph[node_id]:
            if has_cycle_dfs(neighbor):
                return True
        
        state[node_id] = 2  # Mark as visited
        return False
    
    # Check each node for cycles
    for node_id in node_ids:
        if state[node_id] == 0:
            if has_cycle_dfs(node_id):
                return False
    
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Parse a pipeline and return:
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges in the pipeline
    - is_dag: Whether the pipeline forms a directed acyclic graph
    """
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        dag = is_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': dag
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
