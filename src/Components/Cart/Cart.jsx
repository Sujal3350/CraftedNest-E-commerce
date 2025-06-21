import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = "guest";

  useEffect(() => {
    async function fetchCart() {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartItems(res.data.items);
    }
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.productId} className="flex gap-4 items-center border-b py-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
            <div>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Cart;
