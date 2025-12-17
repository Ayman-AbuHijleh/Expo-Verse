import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { projectsAPI } from '../../../api/projects';
import Layout from '../../../Components/Layout.jsx';
import './myProject.css';

function MyProject() {
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectsAPI.getProjectById(user.userId);
        setProject(data);
      } catch (err) {
        setError('No project found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [user.userId]);

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading project...</p>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="my-project-container">
          <div className="empty-project">
            <div className="empty-icon">📝</div>
            <h2>No Project Yet</h2>
            <p>You haven't created a project. Create one from the mobile app!</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="my-project-container">
        <div className="project-header">
          <h1>My Project</h1>
          <span className={`status-badge status-${project.status?.toLowerCase() || 'pending'}`}>
            {project.status || 'Pending'}
          </span>
        </div>

        <div className="project-details-card">
          <h2 className="project-title">{project.title}</h2>
          
          <div className="project-meta">
            {project.booth && (
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span>Booth: {project.booth}</span>
              </div>
            )}
          </div>

          <div className="project-section">
            <h3>Description</h3>
            <p className="project-description">{project.description || 'No description provided.'}</p>
          </div>

          {project.project_photos && project.project_photos.length > 0 && (
            <div className="project-section">
              <h3>Project Images</h3>
              <div className="project-images">
                {project.project_photos.map((photo, index) => (
                  <div key={index} className="image-wrapper">
                    <img src={photo} alt={`Project ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.video_url && (
            <div className="project-section">
              <h3>Demo Video</h3>
              <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="video-link">
                🎥 Watch Video
              </a>
            </div>
          )}

          {project.github_link && (
            <div className="project-section">
              <h3>GitHub Repository</h3>
              <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="github-link">
                <span className="github-icon">⚡</span>
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyProject;
