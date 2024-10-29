import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../../api/orders';
import { Link } from 'react-router-dom';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    await deleteOrder(id);
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>Order #{order.id}</Link>
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
