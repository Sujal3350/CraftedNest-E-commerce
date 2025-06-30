import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faCartShopping, faBars, faTimes, faComment, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiGeminiFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Initialize theme from localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme on mount and on theme change
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
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
      toast.success("Logout successful!");
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className='bg-[#F7F7F7] dark:bg-gray-900 dark:text-white sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-gray-300 dark:border-gray-700 shadow-sm'>
      
      {/* Brand */}
      <div className='flex items-center'>
        <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight drop-shadow-md">
          Crafted<span className="italic font-serif text-gray-800 dark:text-white drop-shadow-2xl">Nest</span>
        </span>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className='lg:hidden text-gray-800 dark:text-white text-2xl'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#F7F7F7] dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center p-4 shadow-lg z-50">
          <ul className='flex flex-col gap-4 font-medium items-center mb-4'>
            {['/home', '/product', '/about', '/contact'].map((path, index) => (
              <li key={index}>
                <NavLink 
                  to={path} 
                  className={({ isActive }) => `${isActive ? "text-orange-700" : ""} hover:text-orange-700`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-4">
            <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faCartShopping} className="text-lg hover:text-orange-700" />
            </NavLink>
            {loggedIn ? (
              <button onClick={() => { setIsMenuOpen(false); handleLogout(); }}>
                <FontAwesomeIcon icon={faSignOutAlt} className="text-lg hover:text-orange-700" title="Logout" />
              </button>
            ) : (
              <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                <FontAwesomeIcon icon={faUser} className="text-lg hover:text-orange-700" title="Login" />
              </NavLink>
            )}
            <NavLink to="/chat" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faComment} className="text-lg hover:text-orange-700" />
            </NavLink>
            <NavLink to="/wishlist" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faHeart} className="text-lg hover:text-orange-700" />
            </NavLink>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <ul className='flex gap-6 font-medium'>
          {['/home', '/product', '/about', '/contact'].map((path, index) => (
            <li key={index}>
              <NavLink 
                to={path} 
                className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800 dark:text-white"} hover:text-orange-700`}
              >
                {path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Icons */}
      <div className="hidden lg:flex items-center gap-5">
        <NavLink to="/cart" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800 dark:text-white"} hover:text-orange-700`}>
          <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
        </NavLink>
        {loggedIn ? (
          <button onClick={handleLogout} className="text-gray-800 dark:text-white hover:text-orange-700">
            <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" title="Logout" />
          </button>
        ) : (
          <NavLink to="/user" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800 dark:text-white"} hover:text-orange-700`}>
            <FontAwesomeIcon icon={faUser} className="text-lg" title="Login" />
          </NavLink>
        )}
        <NavLink to="/chat" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800 dark:text-white"} hover:text-orange-700`}>
          <RiGeminiFill className="text-lg" />
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800 dark:text-white"} hover:text-orange-700`}>
          <FontAwesomeIcon icon={faHeart} className="text-lg" title="Wishlist" />
        </NavLink>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-110 transition duration-300"
          title="Toggle Theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </header>
  );
}

export default Header;
