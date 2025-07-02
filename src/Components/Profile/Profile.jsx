import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faHeart, faCartShopping, faSignOutAlt, faChevronRight, faCamera
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
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const userFromStorage = JSON.parse(localStorage.getItem('user'));
  const userId = userFromStorage?.id || 'guest';
  const username = userData?.username || userFromStorage?.username || userFromStorage?.email?.split('@')[0] || 'Guest';
  const gmailId = userData?.email || userFromStorage?.email || 'Not logged in';

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId !== 'guest') {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            localStorage.setItem("user", JSON.stringify({
              id: userId,
              email: userDoc.data().email,
              username: userDoc.data().username
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user details");
        }
      }
    };

    const fetchCounts = async () => {
      try {
        setIsLoading(true);
        const [cartResponse, wishlistResponse] = await Promise.all([
          axios.get(`https://craftednest.onrender.com/api/cart/${userId}`),
          axios.get(`https://craftednest.onrender.com/api/wishlist/${userId}`)
        ]);
        setCartItemsCount(cartResponse.data.items?.length || 0);
        setWishlistCount(wishlistResponse.data?.length || 0);
      } catch (error) {
        console.error('Error fetching counts:', error);
        toast.error('Failed to update cart or wishlist counts');
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
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const profileItems = [
    {
      icon: faUser,
      title: "Username",
      value: username,
      color: "text-blue-700"
    },
    {
      icon: faEnvelope,
      title: "Email",
      value: gmailId,
      color: "text-gray-600",
    },
    {
      icon: faHeart,
      title: "Wishlist Items",
      value: wishlistCount,
      color: "text-red-500",
      action: {
        text: "View Wishlist",
        path: "/wishlist",
        color: "bg-pink-100 hover:bg-pink-200 text-pink-700"
      }
    },
    {
      icon: faCartShopping,
      title: "Cart Items",
      value: cartItemsCount,
      color: "text-green-700",
      action: {
        text: "View Cart",
        path: "/cart",
        color: "bg-green-100 hover:bg-green-200 text-green-700"
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"
    >
      <div className="max-w-md mx-auto">

        {/* Profile Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8 relative"
        >
          <div className="relative">
            <img
              src={profilePic || "/default-avatar.png"}
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-lg"
              alt="Profile"
            />
            <label htmlFor="profile-upload">
              <div className="absolute bottom-0 right-0 bg-orange-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-orange-700 transition">
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-3">{username}</h1>
          <p className="text-gray-500 dark:text-gray-400">{gmailId}</p>
        </motion.div>

        {/* Profile Info Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          {profileItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${item.color.replace('text', 'bg')} bg-opacity-20`}>
                    <FontAwesomeIcon icon={item.icon} className={`text-lg ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">{item.title}</h3>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {isLoading && item.value !== username && item.value !== gmailId ? (
                        <span className="inline-block h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                </div>
                {item.action && (
                  <Link
                    to={item.action.path}
                    className={`${item.action.color} px-3 py-1 rounded-full text-sm font-medium flex items-center`}
                  >
                    {item.action.text}
                    <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
            <FontAwesomeIcon icon={faChevronRight} className="ml-auto" />
          </button>
        </motion.div>

        {/* Activity Summary */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 bg-orange-500 dark:bg-orange-700 rounded-xl p-5 text-white shadow-lg"
        >
          <h3 className="font-medium mb-3">Your Activity</h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">{wishlistCount}</p>
              <p className="text-sm opacity-80">Wishlisted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{cartItemsCount}</p>
              <p className="text-sm opacity-80">In Cart</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{cartItemsCount + wishlistCount}</p>
              <p className="text-sm opacity-80">Total</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;
