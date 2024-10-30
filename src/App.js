// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductsList from './pages/Products/ProductsList';
import ProductDetails from './pages/Products/ProductDetails';
import ProductEdit from './pages/Products/ProductEdit';


const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/:id/edit" element={<ProductEdit />} />
    </Routes>
  </Router>
);

export default App;
