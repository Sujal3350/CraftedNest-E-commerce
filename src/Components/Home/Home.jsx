import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import kitchen from '../../assets/kitchen.webp';
import chair from '../../assets/Cane Lounge Chair.jpg';
import sofa from '../../assets/decor.avif';
import shelf from '../../assets/shelf.jpg';
import axios from 'axios';
import homebg from '../../assets/home bg.avif';
import { toast } from 'react-toastify';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [roomStyle, setRoomStyle] = useState('Modern');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

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

      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Failed to add to cart.");
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError('Email is required.');
    } else if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
      setIsModalOpen(false);
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };




  const products = [
    {
      id: 1,
      name: 'Sheesham Wood Sofa Set',
      description: 'Elegant traditional sofa set made from premium Sheesham wood with hand-carved details',
      price: '₹25,999',
      originalPrice: '₹32,499',
      rating: 4.7,
      reviews: 112,
      image: sofa,
    },
    {
      id: 2,
      name: 'Cane Lounge Chair',
      description: 'Handcrafted rattan cane chair with a modern twist – eco-friendly and perfect for living spaces',
      price: '₹5,299',
      originalPrice: '₹6,499',
      rating: 4.8,
      reviews: 78,
      image: chair,
    },
    {
      id: 3,
      name: 'Smart Kitchen Chimney ',
      description: '90cm wall-mounted chimney with motion sensor, auto-clean technology & strong suction for Indian cooking.',
      price: '₹8,999',
      originalPrice: '₹11,499',
      rating: 4.6,
      reviews: 175,
      image: kitchen,
    },
    {
      id: 4,
      name: 'Handcrafted Wooden Wall Shelf',
      description: 'Elegant sheesham wood wall shelf with 3 tiers – perfect for décor, plants, or essentials in any room.',
      price: '₹1,499',
      originalPrice: '₹1,899',
      rating: 4.6,
      reviews: 92,
      image: shelf,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-poppins">
      {/* Hero Section */}
      <section className={`relative h-screen overflow-hidden ${isVisible ? 'animate-fade-in' : ''}`}>
        <img
          src={homebg}
          alt="Hero Background"
          className="absolute inset-0 object-cover  w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Transform Your Space with CraftedNest</h1>
          <p className="text-lg sm:text-xl mt-4 max-w-xl">Explore crafted furniture that redefines home comfort.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Subscribe Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section
        className={`py-12 sm:py-16 ${isVisible ? 'animate-slide-up' : ''}`}
        style={{ animationDelay: '0.2s', background: 'linear-gradient(to bottom, #F7F7F7, white)' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-gray-900 text-center font-poppins">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="p-4 flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-md object-cover w-full h-48 max-w-full"
                />
              </div>
              {/* Content */}
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold font-poppins text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 font-poppins mt-1 mb-3">{product.description}</p>
                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                  )}
                </div>
                {/* Cart & Wishlist */}
                <div className="flex items-center justify-between px-0 pb-4 pt-0">
                  <button onClick={() => handleAddToCart(product)} className="flex items-center gap-2 bg-gray-100 text-black font-bold px-4 py-2 border border-gray-300 rounded font-poppins transition">
                    Add to Cart
                  </button>
                  <button className="text-red-500 h-10 w-10 flex items-center">
                    <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.5rem' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe for Updates</h3>
            <p className="text-gray-700 mb-4">Get 20% off your first purchase + AI chatbot tips!</p>
            <input
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              onClick={handleSubscribe}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Subscribe
            </button>
            <button
              onClick={() => {
                setError('');
                setIsModalOpen(false);
              }}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;