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

  // ✅ Get logged-in user
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || "guest";

  // ✅ Add to Wishlist
  const handleAddToWishlist = async (product) => {
    try {
      const wishlistProduct = {
        productId: product._id,
        name: product.name,
        price: Number(String(product.price).replace(/[₹,]/g, "")),
        image: product.image
      };

      await axios.post(`https://craftednest.onrender.com/api/wishlist/add`, {
        userId,
        product: wishlistProduct,
      });

      toast.success("Added to wishlist!");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      toast.error("Error adding to wishlist.");
    }
  };

  // ✅ Add to Cart
  const handleAddToCart = async (product) => {
    try {
      const cleanProduct = {
        id: product._id,
        _id: product._id,
        name: product.name,
        image: product.image,
        price: Number(String(product.price).replace(/[₹,]/g, "")),
      };

      await axios.post("https://craftednest.onrender.com/api/cart/add", {
        userId,
        product: cleanProduct,
      });

      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Failed to add to cart.");
    }
  };

  // ✅ Fetch all products
  useEffect(() => {
    setLoading(true);
    fetch('https://craftednest.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const cats = Array.from(new Set(data.map(p => p.category).filter(Boolean)));
        setCategories(['All', ...cats]);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Filter logic
  const filteredProducts = products.filter((product) => {
    const price = Number(String(product.price).replace(/[₹,]/g, ""));
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section className="min-h-screen py-12 sm:py-16 bg-white font-poppins">
      {/* Header: Search + Filters */}
      <header className="w-full bg-white text-gray-900 p-2 sm:p-4 z-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 max-w-7xl mx-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-gray-100 text-gray-900 px-3 py-1.5 text-xs rounded-lg hover:bg-gray-200 border border-gray-300"
          >
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
          <div className="relative w-full max-w-xs sm:max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full p-1.5 sm:p-2 pl-8 pr-8 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs sm:text-base"
            />
            {searchTerm && (
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => setSearchTerm('')}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Section: Filters + Products */}
      <div className="pt-12 sm:pt-20 flex flex-col lg:flex-row gap-4 sm:gap-6 px-2 sm:px-4">
        {/* Sidebar Filters */}
        <aside className={`lg:w-64 flex-shrink-0 ${isFilterOpen ? 'fixed inset-0 z-50' : 'hidden lg:block'}`}>
          <div className="bg-gray-50 shadow-md p-4 border border-gray-200 lg:sticky lg:top-24 w-3/4 max-w-xs h-full overflow-y-auto lg:h-auto lg:w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h4>
              {[
                { label: '₹0 - ₹2000', min: 0, max: 2000 },
                { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
                { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
                { label: '₹10000+', min: 10000, max: Infinity },
              ].map((range) => (
                <label key={range.label} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange[0] === range.min && selectedPriceRange[1] === range.max}
                    onChange={() => setSelectedPriceRange([range.min, range.max])}
                    className="h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedPriceRange([0, Infinity]);
              }}
              className="w-full mt-4 bg-gray-300 font-semibold text-black px-4 py-2 rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center py-10">
              <FontAwesomeIcon icon={faSpinner} spin className="text-blue-600 text-2xl" />
              <p className="text-gray-700 mt-2">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-700 mb-8">No products found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id || product.name}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                >
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">⭐ {product.rating} ({product.reviews} reviews)</p>
                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                      >
                        <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-200"
                      >
                        <FontAwesomeIcon icon={faHeart} /> Wishlist
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
