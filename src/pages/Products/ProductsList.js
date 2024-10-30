// src/pages/Products/ProductsList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';

const API_URL = process.env.REACT_APP_API_URL;

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '', image: null });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Functionality to add a product (same as previous code)
  const handleAddProduct = async () => { /* Existing code here */ };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Product Creation Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-12">
        {/* Product creation inputs and submit button */}
      </div>

      {/* Product Display Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent>
                <CardTitle>{product.name}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-semibold">Price: £{Number(product.price).toFixed(2)}</p>
                <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/products/${product.id}`}>
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
