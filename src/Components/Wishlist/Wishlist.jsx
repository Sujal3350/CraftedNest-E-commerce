import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiHeart, FiShoppingCart, FiTrash2, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingItems, setProcessingItems] = useState({});

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 'guest';

  useEffect(() => {
    async function fetchWishlist() {
      try {
        setLoading(true);
        const res = await axios.get(`https://craftednest.onrender.com/api/wishlist/${userId}`);
        setWishlist(res.data);
      } catch (err) {
        toast.error('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('wishlistIds', JSON.stringify(wishlist.map(item => String(item.productId))));
  }, [wishlist]);

  const handleAddToCart = async (product) => {
    try {
      setProcessingItems(prev => ({ ...prev, [product.productId]: 'cart' }));
      
      await axios.post('https://craftednest.onrender.com/api/cart/add', {
        userId,
        product: {
          _id: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
      
      await axios.post('https://craftednest.onrender.com/api/wishlist/remove', { 
        userId, 
        productId: product.productId 
      });
      
      setWishlist(wishlist.filter(item => item.productId !== product.productId));
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error('Failed to add to cart');
    } finally {
      setProcessingItems(prev => {
        const newState = { ...prev };
        delete newState[product.productId];
        return newState;
      });
    }
  };

  const handleRemove = async (productId, productName) => {
    try {
      setProcessingItems(prev => ({ ...prev, [productId]: 'remove' }));
      
      await axios.post('https://craftednest.onrender.com/api/wishlist/remove', { 
        userId, 
        productId 
      });
      
      setWishlist(wishlist.filter(item => item.productId !== productId));
      const updated = wishlist.filter(item => item.productId !== productId).map(item => String(item.productId));
      localStorage.setItem('wishlistIds', JSON.stringify(updated));
      
      toast.success(`${productName || 'Item'} removed from wishlist`);
    } catch (err) {
      toast.error('Failed to remove');
    } finally {
      setProcessingItems(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-3xl text-indigo-600 dark:text-indigo-400 mb-4" />
          <p className="text-gray-700 dark:text-gray-300">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
            <FiHeart className="text-red-500 mr-3" />
            My Wishlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlist.length === 0 
              ? "Your saved items will appear here" 
              : `You have ${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} in your wishlist`}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FiHeart className="text-3xl text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start saving your favorite items</p>
            <a
              href="/product"
              className="inline-block px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-300"
            >
              Browse Products
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => handleRemove(item.productId, item.name)}
                      disabled={processingItems[item.productId]}
                      className={`absolute top-3 right-3 p-2 rounded-full ${processingItems[item.productId] === 'remove' 
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400' 
                        : 'bg-white dark:bg-gray-700 text-red-500 hover:bg-red-50 dark:hover:bg-gray-600'}`}
                      aria-label="Remove from wishlist"
                    >
                      {processingItems[item.productId] === 'remove' ? (
                        <FiLoader className="animate-spin" />
                      ) : (
                        <FiTrash2 />
                      )}
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 truncate">
                      {item.name}
                    </h3>
                    <div className="text-orange-600 dark:text-orange-400 font-bold mb-4">
                      ₹{item.price.toLocaleString()}
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={processingItems[item.productId]}
                      className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
                        processingItems[item.productId] === 'cart'
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800 text-white'
                      }`}
                    >
                      {processingItems[item.productId] === 'cart' ? (
                        <>
                          <FiLoader className="animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <FiShoppingCart />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Wishlist;