import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../Services/api';
import { FaShoppingBag, FaCalendarAlt, FaRupeeSign, FaMapMarkerAlt, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 'guest';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/user/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <FaBoxOpen className="mr-1" />;
      case 'shipped':
        return <FaTruck className="mr-1" />;
      case 'delivered':
        return <FaCheckCircle className="mr-1" />;
      default:
        return <FaShoppingBag className="mr-1" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading orders: {error}
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FaShoppingBag className="text-gray-400 text-3xl" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Orders Found</h3>
        <p className="text-gray-600 max-w-md mb-6">
          You haven't placed any orders yet. Start shopping to see your orders here.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
          <FaShoppingBag className="mr-2 text-blue-600" />
          My Orders
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FaCalendarAlt className="mr-1.5" />
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaRupeeSign className="mr-2" />
                    <span className="text-sm">Total Amount</span>
                  </div>
                  <div className="text-lg font-bold">₹{order.total.toLocaleString('en-IN')}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaBoxOpen className="mr-2" />
                    <span className="text-sm">Items</span>
                  </div>
                  <div className="text-lg font-bold">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="text-sm">Delivery</span>
                  </div>
                  <div className="text-sm font-medium line-clamp-1">
                    {order.address || 'Address not specified'}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-start">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="ml-4 flex-1">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>₹{item.price.toLocaleString('en-IN')} each</span>
                        </div>
                        <div className="mt-1 text-sm font-medium">
                          Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-5 sm:px-6 py-3 flex justify-end space-x-3 border-t">
              <button
                onClick={() => navigate(`/order/${order._id}`)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                View Details
              </button>
              {order.status.toLowerCase() === 'delivered' && (
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
                  Rate Products
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Order;