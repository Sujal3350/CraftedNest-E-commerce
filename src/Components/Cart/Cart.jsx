import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = "guest";

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCartItems(res.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/cart/${userId}`, {
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
      const res = await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      setCartItems(res.data.items);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Placeholder for checkout logic
    alert('Proceeding to checkout...');
    // In a real app, this would redirect to a checkout page or payment gateway
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 items-center border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleRemoveQuantity(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => handleAddQuantity(item)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">
              Total: ₹{calculateTotal()}
            </h3>
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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