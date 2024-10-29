import React, { useEffect, useState } from 'react';
import { getOrder } from '../../api/orders';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrder(id);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order #{order.id}</h1>
      <p>Total Price: ${order.total_price}</p>
      <p>Status: {order.status}</p>
    </div>
  );
};

export default OrderDetails;
