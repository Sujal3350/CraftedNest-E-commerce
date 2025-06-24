import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faSearch, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, Infinity],
    minRating: 0,
  });

  // Categories based on product.json data
  const categories = [
    'Kitchen Appliances',
    'Furniture',
    'Storage & Organization',
    'Home Appliances',
    'Other',
  ];

  // Price ranges
  const priceRanges = [
    { label: '₹0 - ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
    { label: '₹25,000+', min: 25000, max: Infinity },
  ];

  // Ratings
  const ratings = [4, 3, 2, 1];

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

      await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        product: cleanProduct,
      });

      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Failed to add to cart.");
    }
  };

  // Fetch products from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({
      ...prev,
      minRating: rating,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, Infinity],
      minRating: 0,
    });
  };

  // Clear search term
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Determine if search term matches a category
  const isCategorySearch = categories.some(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter products based on search term, related items, and filters
  const filteredProducts = products.reduce(
    (acc, product) => {
      const price = Number(product.price);
      const matchesSearch = product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategoryFilter =
        filters.categories.length === 0 ||
        filters.categories.some(category =>
          product.category && product.category.toLowerCase() === category.toLowerCase()
        );
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.minRating;

      // Check for related items based on category (if search term matches a category)
      const matchesRelated =
        isCategorySearch &&
        categories.some(category =>
          searchTerm.toLowerCase().includes(category.toLowerCase()) &&
          product.category && product.category.toLowerCase() === category.toLowerCase()
        );

      if (matchesSearch && matchesCategoryFilter && matchesPrice && matchesRating) {
        acc.directMatches.push(product);
      } else if (matchesRelated && matchesCategoryFilter && matchesPrice && matchesRating) {
        acc.relatedMatches.push(product);
      }
      return acc;
    },
    { directMatches: [], relatedMatches: [] }
  );

  // Combine direct and related matches, ensuring direct matches appear first
  const allFilteredProducts = [
    ...filteredProducts.directMatches,
    ...filteredProducts.relatedMatches.filter(
      product => !filteredProducts.directMatches.includes(product)
    ),
  ];

  return (
    <section
      className="py-12 sm:py-16 animate-slide-up"
      style={{
        animationDelay: '0.2s',
        background: 'linear-gradient(to bottom, #F7F7F7, white)',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div className="px-4  sm:px-8 flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-orange-700 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">{category}</span>
                </label>
              ))}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h4>
              {priceRanges.map((range) => (
                <label key={range.label} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                    }
                    onChange={() => handlePriceRangeChange(range.min, range.max)}
                    className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{range.label}</span>
                </label>
              ))}
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Minimum Rating</h4>
              {ratings.map((rating) => (
                <label key={rating} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{rating}+ Stars</span>
                </label>
              ))}
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === 0}
                  onChange={() => handleRatingChange(0)}
                  className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300"
                />
                <span className="text-sm text-gray-600">Any</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Filter Button - Mobile */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-orange-700 text-white px-4 py-2 rounded-lg"
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </button>
            {/* Search Bar - Mobile */}
            <div className="relative w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full p-2 pl-10 border border-black rounded-lg focus:outline-none text-sm"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              {searchTerm && (
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                />
              )}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex justify-center mb-8">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full p-2 pl-10 border border-black rounded-lg focus:outline-none text-sm sm:text-base font-poppins"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              {searchTerm && (
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                />
              )}
            </div>
          </div>

          {/* Search Results Message */}
          {searchTerm && filteredProducts.directMatches.length === 0 && filteredProducts.relatedMatches.length > 0 && (
            <div className="text-center text-gray-600 mb-8">
              No exact matches for "{searchTerm}", showing related items
            </div>
          )}
          {searchTerm && filteredProducts.directMatches.length === 0 && filteredProducts.relatedMatches.length === 0 && (
            <div className="text-center text-gray-600 mb-8">Product not found</div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allFilteredProducts.map((product) => (
              <div
                key={product._id || product.name}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100 group"
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
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3 line-clamp-2">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
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
        </div>
      </div>

      {/* Filter Drawer - Mobile */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="bg-white w-3/4 max-w-xs h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">{category}</span>
                </label>
              ))}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h4>
              {priceRanges.map((range) => (
                <label key={range.label} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                    }
                    onChange={() => handlePriceRangeChange(range.min, range.max)}
                    className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{range.label}</span>
                </label>
              ))}
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Minimum Rating</h4>
              {ratings.map((rating) => (
                <label key={rating} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{rating}+ Stars</span>
                </label>
              ))}
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === 0}
                  onChange={() => handleRatingChange(0)}
                  className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300"
                />
                <span className="text-sm text-gray-600">Any</span>
              </label>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full mt-6 bg-orange-700 text-white px-4 py-2 rounded-lg"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="w-full mt-2 text-orange-700 hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Product;