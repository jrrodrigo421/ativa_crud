import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://ativa-backend.fly.dev/api/v1';

export const login = async ({ username, password }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await axios.post(`${API_URL}/login/access-token`, formData);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/`, userData);
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}; 