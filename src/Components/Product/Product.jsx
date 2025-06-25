import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faSearch, faTimes, faFilter, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, Infinity]);
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const cats = Array.from(new Set(data.map(p => p.category).filter(Boolean)));
        setCategories(['All', ...cats]);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
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

  return (
    <section className="min-h-screen py-12 sm:py-16 bg-white font-poppins">
      {/* Sticky Header */}
      <header className="w-full bg-white text-gray-900 p-2 sm:p-4 z-10 ">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 max-w-7xl mx-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-gray-100 text-gray-900 px-3 py-1.5 text-xs rounded-lg hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
            aria-label="Toggle Filters"
          >
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
          <div className="relative w-full max-w-xs sm:max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full p-1.5 sm:p-2 pl-8 pr-8 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs sm:text-base font-poppins"
              aria-label="Search products"
            />
            {searchTerm && (
              <FontAwesomeIcon
                icon={faTimes}
                onClick={handleClearSearch}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-base cursor-pointer hover:text-gray-600 transition-colors duration-300"
              />
            )}
          </div>
        </div>
      </header>

      {/* Overlay for mobile filter drawer */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="pt-12 sm:pt-20 flex flex-col lg:flex-row gap-4 sm:gap-6 px-2 sm:px-4">
        {/* Filter Sidebar - Desktop / Mobile Drawer */}
        <aside
          className={`lg:w-64 flex-shrink-0 ${isFilterOpen ? 'fixed inset-0 bg-black/50 z-50 lg:bg-transparent lg:static' : 'hidden lg:block'} lg:h-auto`}
        >
          <div
            className={`bg-gray-50 shadow-md p-3 sm:p-6 border border-gray-200 lg:sticky lg:top-24 ${isFilterOpen ? 'w-3/4 max-w-xs h-full overflow-y-auto' : ''}`}
          >
            <div className="flex  justify-between items-center mb-2 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} className="text-lg sm:text-xl" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Category</h4>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="text-xs sm:text-sm  text-gray-700 font-semibold mb-1 sm:mb-2">Price Range</h4>
              {[
                { label: '₹0 - ₹2000', min: 0, max: 2000 },
                { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
                { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
                { label: '₹10000+', min: 10000, max: Infinity },
              ].map((range) => (
                <label key={range.label} className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max}
                    onChange={() => setSelectedPriceRange([range.min, range.max])}
                    className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPriceRange([0, Infinity]);
              }}
              className="w-full mt-2 sm:mt-4 bg-gray-300 font-semibold text-black px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-lg "
            >
              Clear Filters
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden w-full mt-3 sm:mt-6 bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center py-6 sm:py-12">
              <FontAwesomeIcon icon={faSpinner} spin size="lg sm:size-2x" className="text-blue-600" />
              <p className="text-gray-700 mt-1 sm:mt-2 text-xs sm:text-base">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-700 mb-4 sm:mb-8 text-xs sm:text-base">Product not found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id || product.name}
                  className="bg-gray-200 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 group"
                >
                  <div className="p-2 sm:p-4 flex justify-center items-center bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-md object-cover w-full h-32 sm:h-48 max-w-full "
                    />
                  </div>
                  <div className="px-2 sm:px-4 pb-2 sm:pb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-1 sm:mt-1 sm:mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">⭐ {product.rating} ({product.reviews} reviews)</div>
                  </div>
                  <div className="p-2 sm:p-4 pt-0 flex items-center justify-between">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-1 sm:gap-2 bg-gray-100 text-black font-semibold px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base rounded-lg  "
                      aria-label="Add to Cart"
                    >
                      <FontAwesomeIcon icon={faCartShopping} className="text-xs sm:text-sm" /> Add to Cart
                    </button>
                    <button
                      className="  bg-gray-100 text-gray- font-semibold px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base rounded-lg flex items-center "
                      aria-label="Add to Wishlist"
                    >
                      <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.25rem sm:1.5rem' }}  /> 
                    </button>
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
