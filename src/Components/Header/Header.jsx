import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faCartShopping, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiGeminiFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 'guest';

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCounts = async () => {
    try {
      const cartResponse = await axios.get(`https://craftednest.onrender.com/api/cart/${userId}`);
      const cartItems = cartResponse.data.items || [];
      setCartItemsCount(cartItems.length);

      const wishlistResponse = await axios.get(`https://craftednest.onrender.com/api/wishlist/${userId}`);
      const wishlistItems = wishlistResponse.data || [];
      setWishlistCount(wishlistItems.length);
    } catch (error) {
      console.error('Error fetching counts:', error);
      toast.error('Failed to update cart or wishlist counts');
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(fetchCounts, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
    toast.info(`Switched to ${theme === "light" ? "dark" : "light"} mode`);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
      } else {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', 'false');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.setItem('loggedIn', 'false');
      toast.success("Logged out successfully!");
      navigate('/');
      fetchCounts();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const navItems = [
    { path: '/home', name: 'Home' },
    { path: '/product', name: 'Products' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' }
  ];

  return (
    <header className={`bg-[#F7F7F7] dark:bg-gray-900 dark:text-white sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-gray-300 dark:border-gray-700 shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      
      {/* Brand */}
      <motion.div 
        className='flex items-center'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavLink to="/" className="flex items-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight drop-shadow-md hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300">
            Crafted<span className="italic font-serif text-gray-800 dark:text-white drop-shadow-2xl">Nest</span>
          </span>
        </NavLink>
      </motion.div>

      {/* Mobile Menu Toggle */}
      <button 
        className='lg:hidden text-gray-800 dark:text-white text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden fixed top-16 left-0 w-full bg-[#F7F7F7] dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center p-4 shadow-lg z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className='flex flex-col gap-4 font-medium items-center mb-4 w-full'>
              {navItems.map((item, index) => (
                <motion.li 
                  key={index}
                  className="w-full text-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `${isActive ? "text-orange-700 font-semibold" : ""} 
                      hover:text-orange-700 block py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                className="w-full text-center relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <button
                  className="w-full py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <FontAwesomeIcon icon={faUser} className="text-lg" />
                  Profile
                </button>
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <NavLink
                        to="/cart"
                        className={({ isActive }) => 
                          `${isActive ? "text-orange-700 font-semibold" : "text-gray-800 dark:text-white"} 
                           py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between`
                        }
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        Cart
                        {cartItemsCount > 0 && (
                          <span className="bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemsCount}
                          </span>
                        )}
                      </NavLink>
                      <NavLink
                        to="/wishlist"
                        className={({ isActive }) => 
                          `${isActive ? "text-orange-700 font-semibold" : "text-gray-800 dark:text-white"} 
                           py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between`
                        }
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        Wishlist
                        {wishlistCount > 0 && (
                          <span className="bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {wishlistCount}
                          </span>
                        )}
                      </NavLink>
                      
                      {loggedIn && (
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left py-2 px-4 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
                        >
                          Logout
                          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            </ul>

            <div className="flex justify-center gap-4 items-center">
              <NavLink 
                to="/chat" 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:text-orange-700 transition-colors duration-200"
              >
                <RiGeminiFill className="text-lg" />
              </NavLink>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition duration-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
              {!loggedIn && (
                <NavLink 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:text-orange-700 transition-colors duration-200"
                  aria-label="Login"
                >
                  <FontAwesomeIcon icon={faUser} className="text-lg" />
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <ul className='flex gap-6 font-medium'>
          {navItems.map((item, index) => (
            <motion.li 
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `${isActive ? "text-orange-700 font-semibold" : "text-gray-800 dark:text-white"} 
                  hover:text-orange-700 transition-colors duration-200 relative group`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`}></span>
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Desktop Icons */}
      <div className="hidden lg:flex items-center gap-5">
        <NavLink 
          to="/chat" 
          className={({ isActive }) => 
            `${isActive ? "text-orange-700" : "text-gray-800 dark:text-white"} 
            hover:text-orange-700 transition-colors duration-200`
          }
        >
          <RiGeminiFill className="text-lg" />
        </NavLink>
        
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </motion.button>
        
        <div className="relative">
          <motion.button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="text-gray-800 dark:text-white hover:text-orange-700 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Profile"
          >
            <FontAwesomeIcon icon={faUser} className="text-lg" />
          </motion.button>
          <AnimatePresence>
            {isProfileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
              >
                <NavLink
                  to="/cart"
                  className={({ isActive }) => 
                    `${isActive ? "text-orange-700 font-semibold" : "text-gray-800 dark:text-white"} 
                     py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between`
                  }
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) => 
                    `${isActive ? "text-orange-700 font-semibold" : "text-gray-800 dark:text-white"} 
                     py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between`
                  }
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>
                
                {loggedIn && (
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left py-2 px-4 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
                  >
                    Logout
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Header;