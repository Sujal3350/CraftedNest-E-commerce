import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import kitchen from '../../assets/kitchen.webp';
import chair from '../../assets/Cane Lounge Chair.jpg';
import sofa from '../../assets/decor.avif';
import shelf from '../../assets/shelf.jpg';
import homebg from '../../assets/home bg.avif';
import bed from '../../assets/bed.webp';
import diningTable from '../../assets/diningTable.webp';
import coffetable from '../../assets/coffetable.avif';

import { useNavigate } from 'react-router-dom';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      slug: 'sheesham-wood-sofa',
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
      slug: 'cane-lounge-chair',
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
      slug: 'smart-kitchen-chimney',
      name: 'Smart Kitchen Chimney',
      description: '90cm wall-mounted chimney with motion sensor, auto-clean technology & strong suction for Indian cooking.',
      price: '₹8,999',
      originalPrice: '₹11,499',
      rating: 4.6,
      reviews: 175,
      image: kitchen,
    },
    {
      id: 4,
      slug: 'wooden-wall-shelf',
      name: 'Handcrafted Wooden Wall Shelf',
      description: 'Elegant sheesham wood wall shelf with 3 tiers – perfect for décor, plants, or essentials in any room.',
      price: '₹1,499',
      originalPrice: '₹1,899',
      rating: 4.6,
      reviews: 92,
      image: shelf,
    },
    {
      id: 5,
      slug: 'modern-sofa-set',
      name: 'Modern Sofa Set',
      description: 'Stylish and comfortable sofa set with plush cushions and a contemporary design.',
      price: '₹30,000',
      originalPrice: '₹35,000',
      rating: 4.9,
      reviews: 150,
      image: sofa,
    },
    {
      id: 6,
      slug: 'designer-coffee-table',
      name: 'Designer Coffee Table',
      description: 'Elegant coffee table with a glass top and wooden base, perfect for modern living rooms.',
      price: '₹12,000',
      originalPrice: '₹15,000',
      rating: 4.8,
      reviews: 85,
      image: coffetable,
    },
    {
      id: 7,
      slug: 'luxury-bed',
      name: 'Luxury Bed',
      description: 'King-size luxury bed with a plush headboard and premium mattress for ultimate comfort.',
      price: '₹45,000',
      originalPrice: '₹50,000',
      rating: 4.9,
      reviews: 120,
      image: bed,
    },
    {
      id: 8,
      slug: 'modern-dining-table',
      name: 'Modern Dining Table',
      description: 'Spacious dining table with a sleek design, perfect for family gatherings.',
      price: '₹25,000',
      originalPrice: '₹30,000',
      rating: 4.7,
      reviews: 95,
      image: diningTable,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-900 font-poppins dark:text-white relative overflow-x-hidden">

      {/* Hero Section */}
      <section className={`relative h-screen overflow-hidden ${isVisible ? 'animate-fade-in' : ''}`}>
        <img src={homebg} alt="Hero Background" className="absolute inset-0 object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Transform Your Space with CraftedNest</h1>
          <p className="text-lg sm:text-xl mt-4 max-w-xl">Explore crafted furniture that redefines home comfort.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-orange-500 dark:bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition duration-300"
          >
            Subscribe Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </section>

      {/* Product Grid Section with Arrow Scroll */}
      <section className={`py-12 sm:py-16 relative ${isVisible ? 'animate-slide-up' : ''}`} style={{ background: 'linear-gradient(to bottom, #F7F7F7, white)' }}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-gray-900 dark:text-white text-center font-poppins">
          Featured Collections
        </h2>

        {/* Left Arrow */}
        <button
          className="absolute left-2 top-[65%] z-20 bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-3 rounded-full shadow hover:bg-orange-500 hover:text-white transition"
          onClick={() => document.getElementById('product-scroll').scrollBy({ left: -300, behavior: 'smooth' })}
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button
          className="absolute right-2 top-[65%] z-20 bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-3 rounded-full shadow hover:bg-orange-500 hover:text-white transition"
          onClick={() => document.getElementById('product-scroll').scrollBy({ left: 300, behavior: 'smooth' })}
        >
          &#8594;
        </button>

        {/* Scrollable Product Grid */}
        <div id="product-scroll" className="flex gap-6 overflow-x-auto px-6 scroll-smooth no-scrollbar">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] max-w-[280px] bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group relative"
            >
              <div className="p-4 flex justify-center items-center relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-md object-cover w-full h-48 max-w-full"
                />
                <button
                  onClick={() => navigate(`/product`)}
                  className="absolute bottom-4 opacity-0 group-hover:opacity-100 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 bg-orange-500 dark:bg-orange-600 text-white text-sm px-4 py-2 rounded shadow-lg hover:bg-orange-600 dark:hover:bg-orange-700"
                >
                  Shop Now
                </button>
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-semibold font-poppins text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-poppins mt-1 mb-3">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscribe for Updates</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Get 20% off your first purchase + AI chatbot tips!</p>
            <input
              className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 border-gray-300 dark:border-gray-600"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 dark:text-red-400 text-sm mb-2">{error}</p>}
            <button
              onClick={handleSubscribe}
              className="w-full bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-600 dark:hover:bg-orange-700"
            >
              Subscribe
            </button>
            <button
              onClick={() => {
                setError('');
                setIsModalOpen(false);
              }}
              className="mt-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
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
