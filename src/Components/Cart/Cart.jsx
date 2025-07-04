import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('user'))?.id || 'guest';
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        setIsLoading(true);
        const res = await axios.get(`https://craftednest.onrender.com/api/cart/${userId}`);
        setCartItems(res.data.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Failed to load cart');
      } finally {
        setIsLoading(false);
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
      // Place order via backend using user's saved address
      const user = JSON.parse(localStorage.getItem('user'));
      const address = user?.address;
      if (!address || !address.trim()) {
        toast.error('No address found in your profile. Please update your address in your profile before placing an order.');
        setShowPaymentModal(false);
        return;
      }
      const res = await axios.post('/api/orders/place', { userId, address });
      setCartItems([]);
      setShowPaymentModal(false);
      toast.success('Order placed successfully! Redirecting to orders...');
      setTimeout(() => {
        navigate('/orders', { replace: true });
      }, 2500);
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2"
        >
          <FiShoppingBag className="text-orange-600 dark:text-orange-400" />
          Your Shopping Cart
        </motion.h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FiShoppingBag className="text-3xl text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet</p>
            <button
              onClick={() => navigate('/product')}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-300"
            >
              Browse Products
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{item.name}</h3>
                          <p className="text-orange-600 dark:text-orange-400 font-medium">₹{item.price.toFixed(2)}</p>

                          <div className="flex  items-center w-fit sm:gap-4 gap-2 mt-3">
                            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg  items-center ">
                              <button
                                onClick={() => handleRemoveQuantity(item)}
                                className=" px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-l-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                                disabled={item.quantity === 0}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-gray-900 dark:text-white w-10 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleAddQuantity(item)}
                                className="px-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-r-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="w-full   text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition-colors duration-200 p-2"
                              aria-label="Remove item"
                            >
                              <RiDeleteBin6Line className="text-xl" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right font-semibold text-gray-900 dark:text-white">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="text-gray-900 dark:text-white">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="text-gray-900 dark:text-white">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="text-gray-900 dark:text-white">₹0.00</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-orange-600 dark:text-orange-400">₹{calculateTotal()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal
            total={calculateTotal()}
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </AnimatePresence>
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-md w-full"
      >
        {isSuccess ? (
          <div className="text-center py-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative w-24 h-24 mx-auto mb-6"
            >
              <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-2 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Your order has been placed successfully.</p>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="h-full bg-green-500"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Amount</span>
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">₹{total}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16))}
                    maxLength="19"
                    className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiry.replace(/(\d{2})/, '$1/').slice(0, 5)}
                    onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength="5"
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      maxLength="3"
                      className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="123"
                      required
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 mt-6 ${
                  isProcessing
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800 shadow-md hover:shadow-lg'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ₹${total}`
                )}
              </button>
              
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span>Payments are secure and encrypted</span>
                </div>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Cart;