import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

export const getOrder = async (id) => {
  const response = await axios.get(`${API_URL}/orders/${id}`);
  return response.data;
};

export const createOrder = async (data) => {
  const response = await axios.post(`${API_URL}/orders`, data);
  return response.data;
};

export const updateOrder = async (id, data) => {
  const response = await axios.put(`${API_URL}/orders/${id}`, data);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API_URL}/orders/${id}`);
  return response.data;
};
