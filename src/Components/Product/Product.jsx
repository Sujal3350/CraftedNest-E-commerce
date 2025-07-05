import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faCartShopping, 
  faSearch, 
  faTimes, 
  faFilter, 
  faSpinner,
  faStar,
  faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../Services/api'; // Adjust the import path as necessary

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlistIds')) || [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  // Sync with localStorage when it changes
  useEffect(() => {
    const syncWishlist = () => {
      try {
        setWishlistIds(JSON.parse(localStorage.getItem('wishlistIds')) || []);
      } catch {
        setWishlistIds([]);
      }
    };
    window.addEventListener('storage', syncWishlist);
    return () => window.removeEventListener('storage', syncWishlist);
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || "guest";

    try {
      const cleanProduct = {
        id: product._id,
        _id: product._id,
        name: product.name,
        image: product.image,
        price: Number(String(product.price).replace(/[₹,]/g, "")),
      };

      await axios.post(`${API_BASE_URL}/api/cart/add`, {
        userId,
        product: cleanProduct,
      });

      toast.success("Added to cart successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Failed to add to cart.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Wishlist handler
  const handleWishlist = async (product) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || "guest";
    const productId = String(product._id);
    
    if (wishlistIds.includes(productId)) {
      // Remove from wishlist if already present
      try {
        await axios.post(`${API_BASE_URL}/api/wishlist/remove`, {
          userId,
          productId,
        });
        setWishlistIds(prev => prev.filter(id => id !== productId));
        localStorage.setItem('wishlistIds', JSON.stringify(wishlistIds.filter(id => id !== productId)));
        toast.success("Removed from wishlist!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        toast.error("Failed to remove from wishlist", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      // Add to wishlist
      try {
        await axios.post(`${API_BASE_URL}/api/wishlist/add`, {
          userId,
          product: {
            _id: product._id,
            name: product.name,
            price: Number(String(product.price).replace(/[₹,]/g, "")),
            image: product.image,
          },
        });
        setWishlistIds(prev => [...prev, productId]);
        localStorage.setItem('wishlistIds', JSON.stringify([...wishlistIds, productId]));
        toast.success("Added to wishlist!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        toast.error("Failed to add to wishlist", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  // Fetch products from backend API
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const cats = Array.from(new Set(data.map(p => p.category).filter(Boolean)));
        setCategories(['All', ...cats]);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch wishlist for current user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id || "guest";
    axios.get(`${API_BASE_URL}/api/wishlist/${userId}`)
      .then(res => {
        setWishlistIds(res.data.map(item => String(item.productId)));
      })
      .catch(() => setWishlistIds([]));
  }, []);

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
    const price = Number(String(product.price).replace(/[₹,]/g, ""));
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Clear search term
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Render star ratings
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
    <section className="min-h-screen bg-white dark:bg-gray-900 font-poppins">
      {/* Sticky Search Header */}
      <header className="sticky top-0 z-20 w-full bg-white dark:bg-gray-900 shadow-sm py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <h1 className="hidden sm:block text-xl font-bold text-gray-900 dark:text-white"></h1>
          
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 border border-gray-300 dark:border-gray-700"
          >
            <FontAwesomeIcon icon={faFilter} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </header>

      {/* Overlay for mobile filter drawer */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/60 z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar - Desktop / Mobile Drawer */}
        <aside
          className={`${isFilterOpen ? 'fixed inset-y-0 left-0 z-40 w-72' : 'hidden'} lg:block lg:w-64 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]`}
        >
          <div
            className={`h-full bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-700`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Categories</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${selectedCategory === cat ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">Price Range</h4>
              <div className="space-y-2">
                {[
                  { label: 'Under ₹2000', min: 0, max: 2000 },
                  { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
                  { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
                  { label: 'Over ₹10000', min: 10000, max: Infinity },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange([range.min, range.max])}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPriceRange([0, Infinity]);
              }}
              className="w-full mt-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-md transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium">{filteredProducts.length}</span> products
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPriceRange([0, Infinity]);
                setSearchTerm('');
              }}
              className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-500"
            >
              Reset all
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FontAwesomeIcon 
                icon={faSpinner} 
                spin 
                size="2x" 
                className="text-orange-500 mb-4" 
              />
              <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPriceRange([0, Infinity]);
                  setSearchTerm('');
                }}
                className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id || product.name}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlist(product)}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md ${wishlistIds.includes(String(product._id)) ? 'text-red-500' : 'text-gray-400 '}`}
                    aria-label={wishlistIds.includes(String(product._id)) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <FontAwesomeIcon icon={faHeart} className={`${wishlistIds.includes(String(product._id)) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <div 
                    className="h-48 sm:h-56 bg-gray-100 dark:bg-gray-700 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${product.slug || product._id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 
                      className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1 cursor-pointer"
                      onClick={() => navigate(`/product/${product.slug || product._id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderRatingStars(product.rating || 0)}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews || 0})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price?.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center p-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-full transition-colors duration-200"
                        aria-label="Add to Cart"
                      >
                        <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default Product;