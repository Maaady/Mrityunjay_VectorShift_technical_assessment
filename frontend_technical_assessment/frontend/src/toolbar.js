// toolbar.js

import { DraggableNode } from './draggableNode';
import './styles/toolbar.css';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar-container">
            <div className="toolbar-title">Pipeline Nodes</div>
            <div className="toolbar-section">
                <div className="toolbar-group">
                    <div className="group-label">Core</div>
                    <div className="toolbar-grid">
                        <DraggableNode type='customInput' label='Input' />
                        <DraggableNode type='llm' label='LLM' />
                        <DraggableNode type='customOutput' label='Output' />
                        <DraggableNode type='text' label='Text' />
                    </div>
                </div>

                <div className="toolbar-group">
                    <div className="group-label">Processing</div>
                    <div className="toolbar-grid">
                        <DraggableNode type='calculator' label='Calculator' />
                        <DraggableNode type='filter' label='Filter' />
                        <DraggableNode type='merger' label='Merger' />
                        <DraggableNode type='validator' label='Validator' />
                    </div>
                </div>

                <div className="toolbar-group">
                    <div className="group-label">Utilities</div>
                    <div className="toolbar-grid">
                        <DraggableNode type='logger' label='Logger' />
                    </div>
                </div>
            </div>
        </div>
    );
};
