import axios from 'axios';

// Use relative path when using proxy
const API_URL = 'https://investment-v9as.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timed out. The analysis is taking longer than expected.'));
    }
    return Promise.reject(error);
  }
);

export const analyzeCompany = async (companyName) => {
  try {
    console.log(`📤 Sending request to: ${API_URL}/research/analyze`);
    const response = await api.post('/research/analyze', { companyName });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Analysis failed');
    }
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.data);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      console.error('No response from server');
      throw new Error('No response from server. Please check your connection and make sure the backend is running.');
    } else {
      console.error('Request error:', error.message);
      throw new Error(error.message || 'Failed to analyze company');
    }
  }
};

export default {
  analyzeCompany,
};