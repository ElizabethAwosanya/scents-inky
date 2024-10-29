import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await axios.post(`${API_URL}/users`, data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axios.put(`${API_URL}/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};
