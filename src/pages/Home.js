// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/Card';

const perfumes = [
  { id: 1, name: "Floral Bliss", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Ocean Breeze", price: 79.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Midnight Musk", price: 99.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Citrus Splash", price: 69.99, image: "/placeholder.svg?height=200&width=200" },
];

export default function Home() {
  const { isLoggedIn } = useAuth(); // Use authentication state from context

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Discover Your Signature Scent
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Explore our curated collection of exquisite perfumes and find the perfect fragrance that speaks to you.
              </p>
              <div className="space-x-4 mt-4">
                <Button className="bg-white text-black hover:bg-gray-200">Shop Now</Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center sm:text-5xl mb-12">Featured Perfumes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {perfumes.map((perfume) => (
                <Card key={perfume.id}>
                  <CardHeader>
                    <img src={perfume.image} alt={perfume.name} className="w-full h-48 object-cover" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{perfume.name}</CardTitle>
                    <p className="text-2xl font-bold">${perfume.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Order Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Fragrance Journey</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                Create an account to save your favorite scents, track your orders, and receive personalized recommendations.
              </p>
              <div className="w-full max-w-sm space-y-2 mt-4">
                <Button className="w-full" asChild>
                  <Link to="/signup">Create Your Account</Link>
                </Button>
                {/* Conditionally render View Orders if logged in */}
                {isLoggedIn && (
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/orders">View Your Orders</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t text-gray-500">
        <p className="text-xs">© 2024 Scents Inky. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
