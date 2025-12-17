import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../../../api/projects';
import Layout from '../../../Components/Layout.jsx';
import './otherProjects.css';

function OtherProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.student_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="other-projects-container">
        <div className="page-header">
          <div>
            <h1>Other Projects</h1>
            <p className="page-subtitle">Explore projects from fellow students</p>
          </div>
        </div>

        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="error-container">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No Projects Found</h3>
            <p>{searchTerm ? 'Try adjusting your search' : 'No projects available yet'}</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.project_id} className="project-card">
                {project.project_photos && project.project_photos.length > 0 && (
                  <div className="project-image">
                    <img src={project.project_photos[0]} alt={project.title} />
                  </div>
                )}
                
                <div className="project-content">
                  <div className="project-card-header">
                    <h3>{project.title || 'Untitled Project'}</h3>
                    {project.status && (
                      <span className={`status-badge status-${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                    )}
                  </div>

                  <p className="project-description">
                    {project.description || 'No description available.'}
                  </p>

                  <div className="project-footer">
                    <div className="project-meta">
                      {project.booth && (
                        <span className="booth-badge">
                          📍 Booth {project.booth}
                        </span>
                      )}
                      {project.student_name && (
                        <span className="student-name">
                          👤 {project.student_name}
                        </span>
                      )}
                    </div>

                    {(project.github_link || project.video_url) && (
                      <div className="project-links">
                        {project.github_link && (
                          <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="link-btn">
                            ⚡
                          </a>
                        )}
                        {project.video_url && (
                          <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="link-btn">
                            🎥
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default OtherProjects;
