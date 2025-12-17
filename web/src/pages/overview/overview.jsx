import React from 'react';
import Layout from '../../Components/Layout.jsx';
import './overview.css';

function Overview() {
  return (
    <Layout>
      <div className="overview-container">
        <div className="overview-header">
          <h1>📊 Overview</h1>
          <p>Exhibition Management Dashboard</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <h3>24</h3>
              <p>Active Projects</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>150</h3>
              <p>Students</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <h3>12</h3>
              <p>Companies</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎫</div>
            <div className="stat-content">
              <h3>45</h3>
              <p>Booths</p>
            </div>
          </div>
        </div>

        <div className="recent-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📋</span>
              <div className="activity-details">
                <p className="activity-title">New project submitted</p>
                <p className="activity-time">2 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🏢</span>
              <div className="activity-details">
                <p className="activity-title">Company registered</p>
                <p className="activity-time">5 hours ago</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🎫</span>
              <div className="activity-details">
                <p className="activity-title">Booth assigned</p>
                <p className="activity-time">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Overview;
