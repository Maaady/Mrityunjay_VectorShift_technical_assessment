// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './styles/submit.css';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);

    const handleSubmit = async () => {
        try {
            // Prepare pipeline data
            const pipelineData = {
                nodes: nodes.map((node) => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data,
                })),
                edges: edges.map((edge) => ({
                    source: edge.source,
                    target: edge.target,
                    id: edge.id,
                })),
            };

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`Backend error: ${response.status}`);
            }

            const result = await response.json();

            // Display user-friendly alert
            const alertMessage = `
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Number of Nodes: ${result.num_nodes}
🔗 Number of Edges: ${result.num_edges}
${result.is_dag ? '✅ Is DAG: Yes' : '⚠️ Is DAG: No (Contains Cycles)'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `.trim();

            alert(alertMessage);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`❌ Error submitting pipeline:\n${error.message}`);
        }
    };

    const handleClear = () => {
        // Clear is handled by the browser's form reset
        window.location.reload();
    };

    return (
        <div className="submit-container">
            <button className="clear-button" type="button" onClick={handleClear}>
                Clear
            </button>
            <button className="submit-button" type="button" onClick={handleSubmit}>
                Submit Pipeline
            </button>
        </div>
    );
}
