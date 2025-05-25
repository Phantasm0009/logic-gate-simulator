import React, { useState } from 'react';
import '../styles.css';

/**
 * Component that displays mini popup explaining real-world applications of circuits
 */
export default function RealWorldPopup({ message, isVisible, onClose }) {
  return (
    <div className={`real-world-popup ${isVisible ? 'visible' : ''}`}>
      <div className="real-world-popup-content">
        <div className="real-world-popup-header">
          <span className="real-world-popup-title">Real-world Connection</span>
          <button className="real-world-popup-close" onClick={onClose}>×</button>
        </div>
        <div className="real-world-popup-body">
          <span className="real-world-icon">🔍</span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
