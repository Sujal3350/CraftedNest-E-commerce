import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistVisible, setIsWishlistVisible] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  // Fetch Cart & Wishlist
  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://craftednest.onrender.com/api/cart/${userId}`);
      setCartItems(res.data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`https://craftednest.onrender.com/api/wishlist/${userId}`);
      setWishlistItems(res.data.items);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  // Quantity & Remove functions (Cart)
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(`https://craftednest.onrender.com/api/cart/${userId}`, {
        productId,
        quantity,
      });
      setCartItems(res.data.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleAddQuantity = (item) => updateQuantity(item.productId, item.quantity + 1);
  const handleRemoveQuantity = (item) => {
    item.quantity > 1 ? updateQuantity(item.productId, item.quantity - 1) : removeItem(item.productId);
  };

  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`https://craftednest.onrender.com/api/cart/${userId}/${productId}`);
      setCartItems(res.data.items);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  const toggleWishlist = () => {
    setIsWishlistVisible(!isWishlistVisible);
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-200"
          onClick={() => setIsWishlistVisible(false)}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-200"
          onClick={toggleWishlist}
        >
          <FontAwesomeIcon icon={faHeart} /> Wishlist
        </button>
      </div>

      {/* CART SECTION */}
      {!isWishlistVisible ? (
        <>
          <h2 className="text-xl sm:text-2xl text-center font-bold mb-6">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-4 border-b pb-4 flex-wrap sm:flex-nowrap">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1 min-w-[180px]">
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => handleRemoveQuantity(item)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" disabled={item.quantity === 0}>-</button>
                        <span className="px-2">{item.quantity}</span>
                        <button onClick={() => handleAddQuantity(item)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                        <button onClick={() => removeItem(item.productId)} className="ml-2 text-red-500 hover:text-red-700 text-sm">Remove</button>
                      </div>
                    </div>
                    <div className="text-right font-semibold text-sm sm:text-base min-w-[80px]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="text-xl font-bold">Total: ₹{calculateTotal()}</h3>
                <button onClick={handleCheckout} className="w-full md:w-auto px-6 py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-colors duration-300">Proceed to Checkout</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* WISHLIST SECTION */}
          <h2 className="text-xl sm:text-2xl text-center font-bold mb-6">Your Wishlist</h2>
          {wishlistItems.length === 0 ? (
            <p className="text-gray-600 text-center">Your wishlist is empty</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.productId} className="border rounded p-4">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2 rounded" />
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">₹{item.price.toFixed(2)}</p>
                  <button className="text-red-500 text-sm hover:underline">Remove</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
