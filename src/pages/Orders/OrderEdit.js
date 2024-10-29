import React, { useState, useEffect } from 'react';
import { getOrder, updateOrder } from '../../api/orders';
import { useParams, useNavigate } from 'react-router-dom';

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: '' });

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrder(id);
      setFormData({ status: data.status });
    };
    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateOrder(id, formData);
    navigate(`/orders/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Status:</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default OrderEdit;
