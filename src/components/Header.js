import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
