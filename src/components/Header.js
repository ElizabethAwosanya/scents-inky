import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <ul>
      <li><Link to="/products">Products</Link></li>
      <li><Link to="/orders">Orders</Link></li>
      <li><Link to="/users">Users</Link></li>
    </ul>
  </nav>
);

export default Header;