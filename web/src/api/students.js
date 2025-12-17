import apiClient from '../lib/apiClient';

// Students API calls
export const studentsAPI = {
  getAllStudents: async () => {
    const response = await apiClient.get('/students');
    return response.data.data; // Extract data from {success: true, data: [...]}
  },

  getStudentById: async (userId) => {
    const response = await apiClient.get(`/students/profile/${userId}`);
    return response.data.data || response.data;
  },

  updateStudent: async (userId, studentData) => {
    const response = await apiClient.put(`/students/profile/${userId}`, studentData);
    return response.data.data || response.data;
  },

  createStudent: async (studentData) => {
    const response = await apiClient.post('/students', studentData);
    return response.data;
  },

  deleteStudent: async (id) => {
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  },

  uploadFiles: async (studentId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    
    const response = await apiClient.post(`/students/${studentId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
