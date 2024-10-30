import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getProduct } from '../../api/products';  // Removed unused updateProduct import
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL; 
const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
  });
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setFormData(data);
      setCurrentImage(data.image_url); // Assuming the API returns `image_url` as the URL of the current image
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('quantity', formData.quantity); 
    if (formData.image) {
        form.append('image', formData.image);
    }

    try {
        await axios.post(`${API_URL}/products/${id}`, form);  
        navigate(`/products/${id}`);
    } catch (error) {
        console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Image:</label>
          {currentImage ? (
            <img src={currentImage} alt="Current product" className="w-32 h-32 object-cover mb-4" />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
          <label className="block text-sm font-medium text-gray-700 mt-2">Replace Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
