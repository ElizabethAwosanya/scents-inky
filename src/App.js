import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductsList from './pages/Products/ProductsList';
import ProductDetails from './pages/Products/ProductDetails';
import ProductEdit from './pages/Products/ProductEdit';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/:id/edit" element={<ProductEdit />} />
      {/* Add similar routes for Orders and Users */}
    </Routes>
  </Router>
);

export default App;
