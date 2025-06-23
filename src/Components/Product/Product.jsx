import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // ✅ Ensure axios is imported

function Product() {
  const [products, setProducts] = useState([]);

  // ✅ Function to handle Add to Cart
  const handleAddToCart = async (product) => {
    // Use logged-in userId from localStorage (set during login)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || "guest";

    try {
      const cleanProduct = {
        id: product.id,
        name: product.name,
        image: product.image,
        // ✅ Ensure prices are numbers (remove ₹ and commas)
        price: Number(String(product.price).replace(/[₹,]/g, "")),
      };

      const res = await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        product: cleanProduct,
      });

      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Failed to add to cart.");
    }
  };

  // ✅ Fetch products from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section
      className="py-12 sm:py-16 animate-slide-up"
      style={{
        animationDelay: '0.2s',
        background: 'linear-gradient(to bottom, #F7F7F7, white)',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8">
        {products.map((product) => (
          <div
            key={product.id || product.name}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100 group"
          >
            {/* Image */}
            <div className="p-4 flex justify-center h-48items-center">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-md object-cover w-full h-fit max-w-full"
              />
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1 mb-3 line-clamp-2">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              {/* Rating */}
              <div className="text-sm text-gray-700 mb-2">⭐ {product.rating} ({product.reviews} reviews)</div>
            </div>

            {/* Cart & Wishlist */}
            <div className="p-4 pt-0 flex items-center justify-between">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex items-center gap-2 bg-gray-100 text-black font-bold px-4 py-2 border border-gray-300 rounded transition"
              >
                <FontAwesomeIcon icon={faCartShopping} className="text-sm" /> Add to Cart
              </button>
              <button className="text-red-500 h-10 w-10 flex items-center">
                <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.5rem' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Product;
