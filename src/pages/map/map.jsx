import React from 'react';
import Layout from '../../Components/Layout.jsx';
import '../projects/projects.css';
import './map.css';

function Map() {
  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1>Exhibition Map</h1>
          <div className="map-controls">
            <button className="btn-secondary">Zoom In</button>
            <button className="btn-secondary">Zoom Out</button>
            <button className="btn-secondary">Reset</button>
          </div>
        </div>

        <div className="map-container">
          <div className="map-placeholder">
            <h2>🗺️ Interactive Map</h2>
            <p>Exhibition booth layout will be displayed here</p>
            <p className="map-note">
              You can integrate the expoverse-interactive-map component here
            </p>
          </div>
        </div>

        <div className="map-legend">
          <h3>Legend</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span>
              <span>Engineering Zone</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#a855f7' }}></span>
              <span>Sponsors Zone</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#f97316' }}></span>
              <span>Services</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Map;
