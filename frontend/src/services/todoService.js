import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Create axios instance with auth header
const authAxios = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getTodos = async (token) => {
  const response = await authAxios(token).get('/todos/');
  return response.data;
};

export const getTodoById = async (token, id) => {
  const response = await authAxios(token).get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (token, todoData) => {
  const response = await authAxios(token).post('/todos/', todoData);
  return response.data;
};

export const updateTodo = async (token, id, todoData) => {
  const response = await authAxios(token).put(`/todos/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (token, id) => {
  const response = await authAxios(token).delete(`/todos/${id}`);
  return response.data;
}; 