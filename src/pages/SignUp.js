import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const { login } = useAuth(); // Use context to set logged-in state after sign-up
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    try {
      const userData = await registerUser(formData);
      login(); // Set user as logged in
      navigate('/'); // Redirect to home after successful sign-up
    } catch (err) {
      setError(err.message || 'Failed to register');
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
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
          Sign Up
        </Button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <a href="/login" className="text-blue-500">Log In</a>
      </p>
    </div>
  );
};

export default SignUp;
