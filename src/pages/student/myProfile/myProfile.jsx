import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { studentsAPI } from '../../../api/students';
import Layout from '../../../Components/Layout.jsx';
import './myProfile.css';

function MyProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    year: '',
    bio: '',
    skills: [],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await studentsAPI.getStudentById(user.userId);
      setProfile(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        major: data.major || '',
        year: data.year || '',
        bio: data.bio || '',
        skills: data.skills || [],
      });
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentsAPI.updateStudent(user.userId, formData);
      await fetchProfile();
      setEditMode(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  if (error && !profile) {
    return (
      <Layout>
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button 
            className="btn-edit"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? '✕ Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              {profile?.photo_url ? (
                <img src={profile.photo_url} alt={profile.name} />
              ) : (
                <div className="avatar-placeholder">
                  {profile?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>

            {!editMode ? (
              <div className="profile-info">
                <div className="info-group">
                  <label>Name</label>
                  <p>{profile?.name || 'N/A'}</p>
                </div>

                <div className="info-group">
                  <label>Email</label>
                  <p>{profile?.email || 'N/A'}</p>
                </div>

                <div className="info-group">
                  <label>University ID</label>
                  <p>{profile?.university_id || 'N/A'}</p>
                </div>

                <div className="info-row">
                  <div className="info-group">
                    <label>Major</label>
                    <p>{profile?.major || 'N/A'}</p>
                  </div>

                  <div className="info-group">
                    <label>Year</label>
                    <p>{profile?.year || 'N/A'}</p>
                  </div>
                </div>

                <div className="info-group">
                  <label>Bio</label>
                  <p className="bio-text">{profile?.bio || 'No bio added yet.'}</p>
                </div>

                <div className="info-group">
                  <label>Skills</label>
                  <div className="skills-list">
                    {profile?.skills && profile.skills.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))
                    ) : (
                      <p className="no-data">No skills added yet</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Major</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="form-group">
                  <label>Skills (comma separated)</label>
                  <input
                    type="text"
                    value={formData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    placeholder="React, Node.js, Python, etc."
                  />
                </div>

                <button type="submit" className="btn-save">
                  💾 Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyProfile;
