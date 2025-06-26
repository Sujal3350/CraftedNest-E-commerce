import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 'guest';

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await axios.get(`/api/wishlist/${userId}`);
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
    // Update wishlistIds in localStorage for Product page to sync
    localStorage.setItem('wishlistIds', JSON.stringify(wishlist.map(item => String(item.productId))));
  }, [wishlist]);

  const handleAddToCart = async (product) => {
    try {
      await axios.post('/api/cart/add', {
        userId,
        product: {
          _id: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
      // Remove from wishlist after adding to cart
      await axios.post('/api/wishlist/remove', { userId, productId: product.productId });
      setWishlist(wishlist.filter(item => item.productId !== product.productId));
      toast.success('Item is added to the cart');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.post('/api/wishlist/remove', { userId, productId });
      setWishlist(wishlist.filter(item => item.productId !== productId));
      // Update wishlistIds in localStorage
      const updated = wishlist.filter(item => item.productId !== productId).map(item => String(item.productId));
      localStorage.setItem('wishlistIds', JSON.stringify(updated));
      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div key={item.productId} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-40 h-40 object-cover mb-4 rounded" />
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <div className="font-bold text-orange-700 mb-2">₹{item.price}</div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => handleAddToCart(item)} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Add to cart</button>
                <button onClick={() => handleRemove(item.productId)} className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
