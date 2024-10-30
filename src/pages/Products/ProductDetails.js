import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/ui/Button';

const API_URL = process.env.REACT_APP_API_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError('Failed to load product details.');
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      navigate('/products');
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="w-full max-w-md mx-auto mb-4 rounded-lg" />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-lg font-semibold">Price: £{Number(product.price).toFixed(2)}</p>
      <p className="text-lg text-gray-500">Quantity: {product.quantity}</p>

      <div className="mt-6 space-x-4">
        <Button onClick={handleEdit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Edit Product
        </Button>
        <Button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Delete Product
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
