import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = "guest"; // Change this to actual userId if user login is implemented

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCart();
  }, []);

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container p-4">
      <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>

      {isLoading ? (
        <p>Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.productId} className="flex items-center mb-4 p-2 border rounded shadow">
              <img src={item.image} alt={item.name} width={60} className="mr-4" />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-600">₹{item.price} * {item.quantity}</p>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="text-right font-bold text-lg">
            Total: ₹{getTotal()}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
