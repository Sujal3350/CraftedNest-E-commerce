import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get(`https://craftednest.onrender.com/api/cart/${userId}`);
        setCartItems(res.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
    fetchCart();
  }, []);

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

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl text-center font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 border-b pb-4 flex-wrap sm:flex-nowrap"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded flex-shrink-0"
                />

                {/* Product Details */}
                <div className="flex-1 min-w-[180px]">
                  <h3 className="text-base font-semibold leading-tight">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>

                  {/* Quantity Buttons */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => handleRemoveQuantity(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => handleAddQuantity(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Total for Item */}
                <div className="text-right font-semibold text-sm sm:text-base min-w-[80px]">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold">Total: ₹{calculateTotal()}</h3>
            <button
              onClick={handleCheckout}
              className="w-full md:w-auto px-6 py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-colors duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
