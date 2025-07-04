import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faHeart, faShoppingBag, faSignOutAlt, 
  faChevronRight, faCamera, faMapMarkerAlt, faPhone, faCreditCard,
  faBoxOpen, faStar, faQuestionCircle, faCog, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';

function Profile() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [apiError, setApiError] = useState(false);

  const navigate = useNavigate();
  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const userId = userFromStorage?.id || 'guest';
  const username = userData?.username || userFromStorage?.username || userFromStorage?.email?.split('@')[0] || 'Guest';
  const email = userData?.email || userFromStorage?.email || 'Not logged in';
  const phone = userData?.phone || '+91 XXXXX XXXXX';
  const address = userData?.address || 'Add your delivery address';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId !== 'guest') {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              name: data.name || "N/A",
              phone: data.phone || "",
              address: data.address || "",
              imageUrl: data.imageUrl || ""
            });
          } else {
            // Fallback to localStorage data if Firestore doc doesn't exist
            setUserData(userFromStorage || {
              name: "N/A",
              phone: "",
              address: "",
              imageUrl: ""
            });
          }
        } else {
          setUserData({
            name: "Guest",
            phone: "",
            address: "",
            imageUrl: ""
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({
          name: "Error loading data",
          phone: "",
          address: "",
          imageUrl: ""
        });
      }
    };

    const fetchCounts = async () => {
      try {
        setIsLoading(true);
        setApiError(false);
        
        // Reset counts to 0 before fetching
        setCartItemsCount(0);
        setWishlistCount(0);
        setOrdersCount(0);

        const API_BASE = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:3000/api' 
          : 'https://your-production-api.com/api';

        const [cartResponse, wishlistResponse, ordersResponse] = await Promise.all([
          axios.get(`${API_BASE}/cart/${userId}`).catch(() => ({ data: { items: [] }})),
          axios.get(`${API_BASE}/wishlist/${userId}`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/orders/user/${userId}`).catch(() => ({ data: [] }))
        ]);

        // Validate and set counts
        setCartItemsCount(validateCount(cartResponse.data.items?.length));
        setWishlistCount(validateCount(wishlistResponse.data?.length));
        setOrdersCount(validateCount(ordersResponse.data?.length));

      } catch (error) {
        console.error('Error fetching counts:', error);
        setApiError(true);
        toast.error('Failed to load your data');
      } finally {
        setIsLoading(false);
      }
    };

    // Helper function to validate counts
    const validateCount = (count) => {
      const num = Number(count);
      return isNaN(num) || num < 0 ? 0 : num;
    };

    fetchUserData();
    fetchCounts();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const profileItems = [
    {
      icon: faUser,
      title: "Username",
      value: username,
      color: "text-blue-500",
    },
    {
      icon: faEnvelope,
      title: "Email",
      value: email,
      color: "text-red-500",
    },
    {
      icon: faPhone,
      title: "Mobile",
      value: phone,
      color: "text-green-400",
    },
    {
      icon: faMapMarkerAlt,
      title: "Address",
      value: address,
      color: "text-purple-500",
    }
  ];

  const menuItems = [
    {
      icon: faShoppingBag,
      title: "My Orders",
      count: ordersCount,
      color: "bg-blue-100 text-blue-600",
      link: "/orders"
    },
    {
      icon: faHeart,
      title: "Wishlist",
      count: wishlistCount,
      color: "bg-pink-100 text-pink-600",
      link: "/wishlist"
    },
    {
      icon: faQuestionCircle,
      title: "Help Center",
      color: "bg-gray-100 text-gray-600",
      link: "/contact"
    },
    {
      icon: faShieldAlt,
      title: "Privacy Policy",
      color: "bg-gray-100 text-gray-600",
      link: "/privatepolicy"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="relative mb-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-3xl text-gray-500" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow cursor-pointer">
              <FontAwesomeIcon icon={faCamera} className="text-blue-600" />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </label>
          </div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-blue-100">{email}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-medium ${activeTab === 'orders' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Orders ({ordersCount})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 font-medium ${activeTab === 'wishlist' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Wishlist ({wishlistCount})
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Error State */}
        {apiError && !isLoading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Could not load your data. Please try refreshing the page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {!isLoading && !apiError && activeTab === 'profile' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Profile Info */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Personal Information</h2>
              <div className="space-y-4">
                {profileItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${item.color.replace('text', 'bg')} bg-opacity-20`}>
                        <FontAwesomeIcon icon={item.icon} className={`text-lg ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500 dark:text-gray-400 text-sm">{item.title}</h3>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Account Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{wishlistCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Wishlisted</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{ordersCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Orders</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{cartItemsCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">In Cart</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Coupons</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/orders')}
                    className="w-full flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faShoppingBag} className="text-blue-500" />
                      </div>
                      <span className="font-medium">View All Orders</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => navigate('/wishlist')}
                    className="w-full flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faHeart} className="text-pink-500" />
                      </div>
                      <span className="font-medium">View Wishlist</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition text-red-500"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </div>
                      <span className="font-medium">Logout</span>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {!isLoading && !apiError && activeTab === 'orders' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">My Orders ({ordersCount})</h2>
            </div>
            
            {ordersCount === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faShoppingBag} className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  You haven't placed any orders yet. Start shopping to see your orders here.
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Sample Order Card */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order #CN12345678</p>
                      <p className="font-medium text-gray-900 dark:text-white">Placed on 15 May 2023</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                      Delivered
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <img src="/product-sample.jpg" alt="Product" className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Sheesham Wood Sofa Set</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qty: 1</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹25,999</p>
                      <button className="text-orange-500 text-sm hover:text-orange-600">Buy Again</button>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      Track Order
                    </button>
                    <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition">
                      Rate & Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Wishlist Tab */}
        {!isLoading && !apiError && activeTab === 'wishlist' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">My Wishlist ({wishlistCount})</h2>
            </div>
            
            {wishlistCount === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faHeart} className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  Save your favorite items here to view them later or purchase them.
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Sample Wishlist Item */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition">
                  <div className="relative">
                    <img src="/product-sample.jpg" alt="Product" className="w-full h-40 object-cover rounded" />
                    <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                      <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">Sheesham Wood Sofa Set</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400 text-xs">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfAlt} />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(112)</span>
                    </div>
                    <div className="mt-2">
                      <p className="font-bold text-gray-900 dark:text-white">₹25,999</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-through">₹32,499</p>
                    </div>
                    <button className="w-full mt-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Menu Items */}
        {!isLoading && !apiError && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <FontAwesomeIcon icon={item.icon} className="text-lg" />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">{item.title}</h3>
                {item.count !== undefined && (
                  <span className="text-xs bg-orange-500 text-white rounded-full px-2 py-0.5 inline-block mt-1">
                    {item.count}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Profile;