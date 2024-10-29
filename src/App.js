import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductsList from './pages/Products/ProductsList';
import ProductDetails from './pages/Products/ProductDetails';
import ProductEdit from './pages/Products/ProductEdit';
import OrdersList from './pages/Orders/OrdersList';
import OrderDetails from './pages/Orders/OrderDetails';
import OrderEdit from './pages/Orders/OrderEdit';
import UsersList from './pages/Users/UsersList';
import UserDetails from './pages/Users/UserDetails';
import UserEdit from './pages/Users/UserEdit';

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Product Routes */}
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/:id/edit" element={<ProductEdit />} />

      {/* Order Routes */}
      <Route path="/orders" element={<OrdersList />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/orders/:id/edit" element={<OrderEdit />} />

      {/* User Routes */}
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/:id" element={<UserDetails />} />
      <Route path="/users/:id/edit" element={<UserEdit />} />
    </Routes>
  </Router>
);

export default App;
