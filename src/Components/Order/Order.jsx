import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 'guest';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/user/${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [userId]);

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  if (!orders.length) return <div className="p-8 text-center">No orders found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order #{order._id.slice(-6)}</span>
              <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="mb-2">Status: <span className="font-medium text-blue-600">{order.status}</span></div>
            <div className="mb-2">Total: <span className="font-medium">₹{order.total}</span></div>
            <div className="mb-2">Address: <span className="text-gray-700">{order.address || 'N/A'}</span></div>
            <div>
              <span className="font-semibold">Items:</span>
              <ul className="ml-4 list-disc">
                {order.items.map(item => (
                  <li key={item.productId} className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                    <span>{item.name} x {item.quantity} (₹{item.price})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
