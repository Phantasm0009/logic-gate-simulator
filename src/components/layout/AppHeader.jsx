import React from 'react';

const AppHeader = ({ 
  toggleSidebar,
  sidebarVisible,
  saveCircuit,
  loadCircuit,
  clearCircuit,
  exportCircuit,
  openTeacherDashboard // Add this prop
}) => {
  return (
    <header className="app-header">
      <div className="app-title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9z" />
          <path d="M9 1v3" />
          <path d="M15 1v3" />
          <path d="M9 20v3" />
          <path d="M15 20v3" />
          <path d="M20 9h3" />
          <path d="M20 14h3" />
          <path d="M1 9h3" />
          <path d="M1 14h3" />
        </svg>
        <span>Logic Gate Simulator</span>
      </div>
      <div className="app-nav">
        <button onClick={toggleSidebar} className="nav-button">
          {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <button onClick={saveCircuit} className="nav-button">Save</button>
        <button onClick={loadCircuit} className="nav-button">Load</button>
        <button onClick={clearCircuit} className="nav-button">Clear</button>
        <button onClick={exportCircuit} className="nav-button share-button">Share</button>
        <button onClick={openTeacherDashboard} className="nav-button teacher-button">
          🎓 Teacher
        </button>
        <a href="https://github.com/Phantasm0009/logic-gate-simulator" target="_blank" rel="noopener noreferrer" className="nav-button help-link">Help</a>
      </div>
    </header>
  );
};

export default AppHeader;