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
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import axios from 'axios';
import OrderTab from '../Order/Order';
import { API_BASE_URL } from '../../Services/api'; // Adjust the import path as necessary

function Profile() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  const navigate = useNavigate();
  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const userId = userFromStorage?.id || 'guest';
  const username = userData?.username || userFromStorage?.username || userFromStorage?.email?.split('@')[0] || 'Guest';
  const email = userData?.email || userFromStorage?.email || 'Not logged in';
  const phone = userData?.phone || '+91 XXXXX XXXXX';
  const address = userData?.address || userFromStorage?.address || 'Add your delivery address';

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId !== 'guest') {
        try {
          const userRef = ref(db, 'users/' + userId);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserData(snapshot.val());
            localStorage.setItem("user", JSON.stringify({
              id: userId,
              email: snapshot.val().email,
              username: snapshot.val().username,
              phone: snapshot.val().phone,
              address: snapshot.val().address || ''
            }));
          } else {
            // Fallback: use localStorage user if Realtime DB user doesn't exist
            setUserData(userFromStorage);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(userFromStorage); // fallback
          toast.error("Failed to fetch user details");
        }
      } else {
        setUserData(userFromStorage);
      }
    };

    const fetchCounts = async () => {
      try {
        setIsLoading(true);
        const [cartResponse, wishlistResponse, ordersResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/cart/${userId}`),
          axios.get(`${API_BASE_URL}/api/wishlist/${userId}`),
          axios.get(`${API_BASE_URL}/api/orders/user/${userId}`)
        ]);
        setCartItemsCount(cartResponse.data.items?.length || 0);
        setWishlistCount(wishlistResponse.data?.length || 0);
        setOrdersCount(ordersResponse.data?.length || 0);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setCartItemsCount(0);
        setWishlistCount(0);
        setOrdersCount(0);
        toast.error('Failed to update counts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    fetchCounts();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.setItem('loggedIn', 'false');
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
      <div className="bg-gray-200 text-white dark:border-gray-700 p-6 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={profilePic || "/default-avatar.png"}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 dark:border-white shadow-xl"
              alt="Profile"
            />
            <label htmlFor="profile-upload" className="cursor-pointer">
              <div className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full shadow-lg">
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
          <h1 className="text-2xl text-gray-700 dark:text-white font-bold">{username}</h1>
          <p className="text-sm text-gray-700 dark:text-white opacity-90">{email}</p>
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
            Orders
          </button>
          <button
            onClick={() => navigate('/cart')}
            className={`px-4 py-2 font-medium ${activeTab === 'wishlist' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Cart
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
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
                        <p className="font-semibold text-sm text-gray-800 dark:text-white">
                          {isLoading ? (
                            <span className="inline-block h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
                          ) : (
                            item.value
                          )}
                        </p>
                      </div>
                    </div>
                    <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                      {item.action}
                    </button>
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
        {activeTab === 'orders' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <OrderTab userId={userId} />
          </motion.div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">My Wishlist ({wishlistCount})</h2>
              <button className="text-orange-500 hover:text-orange-600">View All</button>
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
      </div>
    </motion.div>
  );
}

export default Profile;