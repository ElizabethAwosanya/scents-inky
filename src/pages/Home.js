import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';

const API_URL = process.env.REACT_APP_API_URL; 
const UPLOADS_URL = process.env.REACT_APP_UPLOADS_URL;

export default function Home() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-indigo-950 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Discover Your Signature Scent
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Explore our curated collection of exquisite perfumes and find the perfect fragrance that speaks to you.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Perfumes Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center sm:text-5xl mb-12">Featured Perfumes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <img
                      src={product.image ? `${UPLOADS_URL}/${product.image}` : '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <p className="text-lg font-semibold">Price: £{Number(product.price).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                  </CardContent>
                  <CardFooter>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t text-gray-700">
  <p className="text-xs">© 2024 Scents Inky. All rights reserved.</p>
  <nav className="sm:ml-auto flex gap-4 sm:gap-6">
    <button className="text-xs hover:underline text-left" onClick={() => alert('Terms of Service')}>
      Terms of Service
    </button>
    <button className="text-xs hover:underline text-left" onClick={() => alert('Privacy Policy')}>
      Privacy
    </button>
  </nav>
</footer>

    </div>
  );
}
