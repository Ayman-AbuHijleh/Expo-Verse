import apiClient from '../lib/apiClient';

// Projects API calls
export const projectsAPI = {
  getAllProjects: async () => {
    const response = await apiClient.get('/projects');
    return response.data.data; // Extract data from {success: true, data: [...]}
  },

  getProjectById: async (userId) => {
    const response = await apiClient.get(`/projects/myproject/${userId}`);
    return response.data.data || response.data;
  },

  createProject: async (projectData) => {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  },

  updateProject: async (id, projectData) => {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },
};
