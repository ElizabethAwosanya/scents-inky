// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth(); // Use context to set logged-in state after login
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login API request here
    login(); // Assume successful login for now
    navigate('/'); // Redirect to home after successful login
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Log In
        </Button>
      </form>
      <p className="text-center mt-4">
        Don’t have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
