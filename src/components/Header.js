// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${searchQuery.trim()}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and Navigation Links */}
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold mr-8">Scents Inky</Link>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <Link to="/products" className="text-gray-700 hover:text-black">Products</Link>
          </nav>
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Search perfumes..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch} // Triggers search on 'Enter' key press
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Toggle Menu</span>
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden">
            <nav className="flex flex-col space-y-4 p-4">
              <Link to="/products" className="text-gray-700 hover:text-black">Products</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
