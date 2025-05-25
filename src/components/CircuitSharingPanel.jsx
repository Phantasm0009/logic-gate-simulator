import React, { useState, useRef } from 'react';
import { 
  exportCircuitToFile, 
  createShareableUrl,
  importCircuitFromFile 
} from '../utils/circuitSharingService';

/**
 * CircuitSharingPanel component for exporting and importing circuits
 */
export default function CircuitSharingPanel({ circuit, onImport, onClose }) {
  const [shareableUrl, setShareableUrl] = useState('');
  const [filename, setFilename] = useState('my-circuit');
  const [message, setMessage] = useState({ text: '', type: 'info' });
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const result = exportCircuitToFile(circuit, filename);
    if (result.success) {
      setMessage({ text: 'Circuit exported successfully!', type: 'success' });
    } else {
      setMessage({ text: `Export failed: ${result.error}`, type: 'error' });
    }
  };

  const handleCreateShareableUrl = () => {
    const result = createShareableUrl(circuit);
    if (result.success) {
      setShareableUrl(result.url);
      setMessage({ text: 'Shareable link created!', type: 'success' });
    } else {
      setMessage({ text: `Failed to create link: ${result.error}`, type: 'error' });
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareableUrl)
      .then(() => setMessage({ text: 'URL copied to clipboard!', type: 'success' }))
      .catch(err => setMessage({ text: `Copy failed: ${err}`, type: 'error' }));
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const importedCircuit = await importCircuitFromFile(file);
      onImport(importedCircuit);
      setMessage({ text: 'Circuit imported successfully!', type: 'success' });
      // Reset file input to allow importing the same file again
      event.target.value = null;
    } catch (error) {
      setMessage({ text: `Import failed: ${error.message}`, type: 'error' });
    }
  };
  
  // Handle message display timing
  React.useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: 'info' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <div className="circuit-sharing-panel">
      <div className="panel-header">
        <h3>Circuit Sharing</h3>
        <button className="close-btn" onClick={onClose} title="Close">×</button>
      </div>
        <div className="panel-content">
        <div className="info-section">
          <p className="help-text">
            Share your circuits with others or save for later use. 
            Perfect for teachers to share challenges with students.
          </p>
        </div>
        
        <div className="export-section">
          <h4>Export Circuit</h4>
          <p className="section-help">Save your circuit as a .circuit file to load later</p>
          <div className="input-group">
            <label htmlFor="filename">Filename:</label>
            <input 
              type="text" 
              id="filename" 
              value={filename} 
              onChange={(e) => setFilename(e.target.value)} 
              placeholder="Enter filename"
            />
            <span className="extension">.circuit</span>
          </div>
          <button onClick={handleExport} className="action-btn export-btn">
            <span className="icon">📤</span> Export
          </button>
        </div>
          <div className="share-section">
          <h4>Share Circuit</h4>
          <p className="section-help">Generate a link that others can use to view your circuit</p>
          <button onClick={handleCreateShareableUrl} className="action-btn share-btn">
            <span className="icon">🔗</span> Create Shareable Link
          </button>
          
          {shareableUrl && (
            <div className="url-container">
              <input 
                type="text" 
                readOnly 
                value={shareableUrl} 
                className="url-display"
              />
              <button onClick={handleCopyUrl} className="copy-btn" title="Copy URL">
                <span className="icon">📋</span>
              </button>
            </div>
          )}
        </div>
          <div className="import-section">
          <h4>Import Circuit</h4>
          <p className="section-help">Import a previously exported circuit file or open a shared link</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".circuit,.json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button onClick={handleFileUploadClick} className="action-btn import-btn">
            <span className="icon">📥</span> Import from File
          </button>
          <p className="note">Note: When opening a shared link, the circuit loads automatically</p>
        </div>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
