import axios from 'axios';

const API_BASE = 'http://localhost:2000';

// Get auth token
const getAuthToken = () => localStorage.getItem('adminToken');

// API service for admin operations
export const adminService = {
  // User Management
  getAllUsers: async () => {
    const response = await axios.get(`${API_BASE}/admin/users`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  updateUserStatus: async (userId, status) => {
    const response = await axios.patch(`${API_BASE}/admin/users/${userId}/status`, 
      { status },
      { headers: { Authorization: `Bearer ${getAuthToken()}` } }
    );
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_BASE}/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  // Analytics
  getAnalytics: async () => {
    const response = await axios.get(`${API_BASE}/admin/analytics`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  // System Settings
  getSettings: async () => {
    const response = await axios.get(`${API_BASE}/admin/settings`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  },

  updateSettings: async (settings) => {
    const response = await axios.put(`${API_BASE}/admin/settings`, settings, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
  }
};