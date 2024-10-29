import React, { useState, useEffect } from 'react';
import { getProduct, updateProduct } from '../../api/products';
import { useParams, useNavigate } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setFormData(data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, formData);
    navigate(`/products/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} required />
      <label>Description:</label>
      <input name="description" value={formData.description} onChange={handleChange} />
      <label>Price:</label>
      <input name="price" type="number" value={formData.price} onChange={handleChange} required />
      <label>Quantity:</label>
      <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductEdit;
