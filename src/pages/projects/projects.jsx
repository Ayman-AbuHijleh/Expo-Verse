import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../../api/projects';
import Layout from '../../Components/Layout.jsx';
import './projects.css';
import defaultLogo from '../../assets/expo-logo.png';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAllProjects();
      console.log('✅ Fetched', data?.length, 'projects');
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to pick the first project image (handles strings and objects)
  const getFirstProjectImage = (project) => {
    // Try different possible fields returned by backend
    const photos = project.project_photos || project.images || project.image || project.thumbnail;

    if (!photos) return null;

    // If it's a string (single URL) return it
    if (typeof photos === 'string') return photos;

    // If it's an array, take the first element and normalize
    if (Array.isArray(photos) && photos.length > 0) {
      const first = photos[0];
      if (!first) return null;
      if (typeof first === 'string') return first;
      if (typeof first === 'object') {
        // Common fields: uri, url, fileName, key
        return first.uri || first.url || first.fileName || first.key || null;
      }
    }

    return null;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { color: '#63c431', text: 'Approved', icon: '✓' },
      pending: { color: '#ffbd59', text: 'Pending', icon: '⏳' },
      rejected: { color: '#ff3131', text: 'Rejected', icon: '✗' }
    };
    return statusConfig[status?.toLowerCase()] || statusConfig.pending;
  };

  if (loading) {
    return (
      <Layout>
        <div className="page-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="page-container">
          <div className="error-container">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1>Projects</h1>
            <p className="page-subtitle">{filteredProjects.length} total projects</p>
          </div>
          <div style={{display: 'flex', gap: 12}}> 
            <button className="btn-add">
              <span>➕</span> Add Project
            </button>
            <button className="btn-view" onClick={() => setShowRaw(s => !s)} style={{alignSelf: 'center'}}>
              {showRaw ? 'Hide raw' : 'Show raw'}
            </button>
          </div>
        </div>

        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📁</span>
            <h3>No projects found</h3>
            <p>Start by adding your first project</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => {
              const statusInfo = getStatusBadge(project.status);
              const projectImage = getFirstProjectImage(project);
              const hasImage = !!projectImage;
              
              return (
                <div key={project.project_id || project.id || project.title} className="project-card">
                  {/* Project image (first photo or placeholder) */}
                  <div className="card-image">
                    {hasImage ? (
                      <img
                        src={projectImage}
                        alt={project.title || 'Project image'}
                        onError={(e) => { 
                          console.error('❌ Image failed to load:', projectImage);
                          e.currentTarget.onerror = null; 
                          e.currentTarget.src = defaultLogo; 
                        }}
                        onLoad={() => console.log('✅ Image loaded:', projectImage)}
                      />
                    ) : (
                      <div className="placeholder-image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: statusInfo.color }}
                    >
                      {statusInfo.icon} {statusInfo.text}
                    </span>
                  </div>
                  
                  <p className="project-description">
                    {project.description || 'No description available'}
                  </p>

                  {project.technologies && (
                    <div className="tech-tags">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-footer">
                    <div className="project-meta">
                      {project.booth && (
                        <span className="booth-badge">
                          📍 {project.booth}
                        </span>
                      )}
                      {(project.student_name || (project.students && project.students[0]?.name)) && (
                        <span className="student-name">
                          👤 {project.student_name || project.students[0]?.name}
                        </span>
                      )}
                    </div>
                    <button className="btn-view">View Details →</button>
                  </div>
                </div>
              );
            })}
            {showRaw && (
              <div style={{marginTop: 20, background: '#fff', padding: 12, borderRadius: 8}}>
                <h3>Raw projects data</h3>
                <pre style={{maxHeight: 320, overflow: 'auto'}}>{JSON.stringify(projects, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Projects;
