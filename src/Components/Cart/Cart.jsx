import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user'))?.id || 'guest';
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get(`https://craftednest.onrender.com/api/cart/${userId}`);
        setCartItems(res.data.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Failed to load cart');
      }
    }
    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(`https://craftednest.onrender.com/api/cart/${userId}`, {
        productId,
        quantity,
      });
      setCartItems(res.data.items || []);
      toast.success('Quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleAddQuantity = (item) => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  const handleRemoveQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    } else {
      removeItem(item.productId);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`https://craftednest.onrender.com/api/cart/${userId}/${productId}`);
      setCartItems(res.data.items || []);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      // Remove each item from the cart individually
      for (const item of cartItems) {
        await axios.delete(`https://craftednest.onrender.com/api/cart/${userId}/${item.productId}`);
      }
      setCartItems([]);
      setShowPaymentModal(false);
      toast.success('Payment successful! Redirecting to products...');
      // Ensure navigation happens after state updates
      setTimeout(() => {
        navigate('/product', { replace: true });
      }, 2500);
    } catch (error) {
      console.error('Error clearing cart:', error.response?.data || error.message);
      toast.error('Failed to clear cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 mx-auto bg-white dark:bg-gray-700">
      <h2 className="text-xl sm:text-2xl text-center font-bold text-gray-900 dark:text-white mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 border-b pb-4 flex-wrap sm:flex-nowrap border-gray-200 dark:border-gray-700"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-[180px]">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => handleRemoveQuantity(item)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <span className="px-2 text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleAddQuantity(item)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-2 text-red-500 dark:text-red-400"
                    >
                      <RiDeleteBin6Line className='text-xl'/>
                    </button>
                  </div>
                </div>
                <div className="text-right font-semibold text-sm sm:text-base text-gray-900 dark:text-white min-w-[80px]">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Total: ₹{calculateTotal()}</h3>
            <button
              onClick={handleCheckout}
              className="w-full md:w-auto px-6 py-2 bg-black dark:bg-gray-800 p-4 rounded-lg shadow-md text-white hover:bg-white dark:hover:bg-gray-600 hover:text-black dark:hover:text-white border border-black dark:border-gray-700 transition-colors duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      {showPaymentModal && (
        <PaymentModal
          total={calculateTotal()}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

function PaymentModal({ total, onClose, onSuccess }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || cardNumber.length !== 16 || expiry.length !== 4 || cvv.length !== 3) {
      toast.error('Please fill all fields correctly');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full m-4">
        {isSuccess ? (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-blue-600 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300">Your order has been placed successfully.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
              <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Total: ₹{total}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  maxLength="16"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry (MMYY)</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength="4"
                    placeholder="MMYY"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    maxLength="3"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
                  isProcessing ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Pay Now'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;