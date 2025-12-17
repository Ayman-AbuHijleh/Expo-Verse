import React from 'react';
import Layout from '../../Components/Layout.jsx';
import '../projects/projects.css';
import './companies.css';
import defaultLogo from '../../assets/expo-logo.png';

function Companies() {
  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1>Companies</h1>
          <button className="btn-add" aria-label="Add company">
            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Company</span>
          </button>
        </div>

        <div className="companies-grid">
          <div className="company-card">
            <div className="company-media">
              <img src={defaultLogo} alt="Tech Innovations logo" />
            </div>
            <h3>Tech Innovations Inc.</h3>
            <p>Technology Solutions</p>
            <div className="company-info">
              <span>📧 contact@techinnovations.com</span>
              <span>📍 Booth #45</span>
            </div>
          </div>

          <div className="company-card">
            <div className="company-media">
              <img src={defaultLogo} alt="Future Systems logo" />
            </div>
            <h3>Future Systems</h3>
            <p>Software Development</p>
            <div className="company-info">
              <span>📧 info@futuresystems.com</span>
              <span>📍 Booth #23</span>
            </div>
          </div>

          <div className="company-card">
            <div className="company-media">
              <img src={defaultLogo} alt="Green Energy Co. logo" />
            </div>
            <h3>Green Energy Co.</h3>
            <p>Renewable Energy</p>
            <div className="company-info">
              <span>📧 hello@greenenergy.com</span>
              <span>📍 Booth #12</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Companies;
