import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faStar, 
  faStarHalfAlt, 
  faChevronLeft, 
  faChevronRight,
  faPercent,
  faGift,
  faTruck,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';
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
      image: sofa,
      discount: 20,
    },
    {
      id: 2,
      slug: 'cane-lounge-chair',
      name: 'Cane Lounge Chair',
      description: 'Handcrafted rattan cane chair with a modern twist – eco-friendly and perfect for living spaces',
      

      image: chair,
      discount: 18,
    },
    {
      id: 3,
      slug: 'smart-kitchen-chimney',
      name: 'Smart Kitchen Chimney',
      description: '90cm wall-mounted chimney with motion sensor, auto-clean technology & strong suction for Indian cooking.',
     
      
      image: kitchen,
      discount: 22,
    },
    {
      id: 4,
      slug: 'wooden-wall-shelf',
      name: 'Wooden Wall Shelf',
      description: 'Elegant sheesham wood wall shelf with 3 tiers – perfect for décor, plants, or essentials in any room.',
      
      image: shelf,
      discount: 21,
    },
    {
      id: 5,
      slug: 'modern-sofa-set',
      name: 'Modern Sofa Set',
      description: 'Stylish and comfortable sofa set with plush cushions and a contemporary design.',
      
      image: sofa,
      discount: 14,
    },
    {
      id: 6,
      slug: 'designer-coffee-table',
      name: 'Designer Coffee Table',
      description: 'Elegant coffee table with a glass top and wooden base, perfect for modern living rooms.',
      
      image: coffetable,
      discount: 20,
    },
    {
      id: 7,
      slug: 'luxury-bed',
      name: 'Luxury Bed',
      description: 'King-size luxury bed with a plush headboard and premium mattress for ultimate comfort.',
      
      image: bed,
      discount: 10,
    },
    {
      id: 8,
      slug: 'modern-dining-table',
      name: 'Modern Dining Table',
      description: 'Spacious dining table with a sleek design, perfect for family gatherings.',
      
      image: diningTable,
      discount: 17,
    },
  ];

  

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400 text-xs" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-400 text-xs" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300 text-xs" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-900 font-poppins dark:text-white relative overflow-x-hidden">

      {/* Hero Section */}
      <section className={`relative h-screen overflow-hidden ${isVisible ? 'animate-fade-in' : ''}`}>
        <img src={homebg} alt="Hero Background" className="absolute inset-0 object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 dark:from-black/70 dark:to-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Transform Your Space with <span className="text-orange-400">CraftedNest</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mt-6 mb-8 max-w-2xl mx-auto">
              Discover handcrafted furniture that blends timeless elegance with modern comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/product')}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Shop Collection
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Get 20% Off
              </button>
            </div>
          </div>
        </div>
        
        {/* Scrolling indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={`py-12 sm:py-16 px-4 sm:px-6 relative ${isVisible ? 'animate-slide-up' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold tracking-wider">FEATURED COLLECTION</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
              Handpicked For Your Home
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our curated selection of premium furniture pieces designed to elevate your living space.
            </p>
          </div>

          <div className="relative">
            {/* Left Arrow */}
            <button
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-3 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 hidden md:block"
              onClick={() => document.getElementById('product-scroll').scrollBy({ left: -300, behavior: 'smooth' })}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>

            {/* Right Arrow */}
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 text-gray-700 dark:text-white p-3 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 hidden md:block"
              onClick={() => document.getElementById('product-scroll').scrollBy({ left: 300, behavior: 'smooth' })}
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>

            {/* Scrollable Product Grid */}
            <div 
              id="product-scroll" 
              className="flex gap-6 overflow-x-auto px-2 pb-6 scroll-smooth no-scrollbar"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[280px] max-w-[280px] bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group relative flex flex-col"
                >
                  {/* Discount badge */}
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
                    <FontAwesomeIcon icon={faPercent} className="mr-1" />
                    {product.discount}% OFF
                  </div>
                  
                  <div className="p-4 flex justify-center items-center relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-md object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => navigate(`/product`)}
                      className="absolute bottom-4 opacity-0 group-hover:opacity-100 left-1/2 transform -translate-x-1/2 transition-all duration-300 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-6 py-2 rounded-full shadow-lg font-medium"
                    >
                      Shop Now
                    </button>
                  </div>
                  
                  <div className="px-4 pb-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="mt-auto">
                     
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">{product.price}</span>
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">{product.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
       <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <FontAwesomeIcon icon={faStar} className="text-orange-500 group-hover:text-white text-xl transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each piece is crafted with attention to detail using the finest materials for lasting durability.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <FontAwesomeIcon icon={faGift} className="text-orange-500 group-hover:text-white text-xl transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">Exclusive Designs</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Unique furniture pieces that blend traditional craftsmanship with contemporary aesthetics.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <FontAwesomeIcon icon={faTruck} className="text-orange-500 group-hover:text-white text-xl transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reliable shipping with careful packaging to ensure your furniture arrives in perfect condition.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <FontAwesomeIcon icon={faLeaf} className="text-orange-500 group-hover:text-white text-xl transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">Eco-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sustainably sourced materials and environmentally conscious manufacturing processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community and get 20% off your first purchase plus exclusive design tips.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Subscribe Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </section>
      


      {/* Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => {
                setError('');
                setIsModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGift} className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Get 20% Off!</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Subscribe for exclusive deals and design inspiration
              </p>
            </div>
            
            <div className="mb-4">
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
            </div>
            
            <button
              onClick={handleSubscribe}
              className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Subscribe & Get Discount
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;