import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'; // Update this to your backend URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Assume this returns user data or a token
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Log in a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // Assume this returns user data or a token
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
