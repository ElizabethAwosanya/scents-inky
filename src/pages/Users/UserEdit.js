import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../../api/users';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      setFormData(data);
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, formData);
    navigate(`/users/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input name="username" value={formData.username} onChange={handleChange} required />
      <label>Email:</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserEdit;
