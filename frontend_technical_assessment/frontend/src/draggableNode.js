// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '90px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#3b82f6',
          justifyContent: 'center', 
          flexDirection: 'column',
          fontWeight: 600,
          fontSize: '12px',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
          transition: 'all 0.2s ease',
          border: '1px solid #60a5fa',
        }} 
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#60a5fa';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.5)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#3b82f6';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
    );
  };
  