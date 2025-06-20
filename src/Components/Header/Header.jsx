import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faBars, faTimes, faComment } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { RiGeminiFill } from "react-icons/ri";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='bg-[#F7F7F7] w-full h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-gray-300' style={{ boxShadow: 'inset 0 -1px 3px rgba(0,0,0,0.1)' }}>
      
      {/* Brand */}
      <div className='flex items-center'>
        <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight drop-shadow-md">
          Crafted<span className="italic font-serif text-gray-800 drop-shadow-2xl">Nest</span>
        </span>
      </div>

      {/* Menu Toggle Button - Mobile Only */}
      <button 
        className='lg:hidden text-gray-800 text-2xl'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Dropdown (nav + icons) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#F7F7F7] flex flex-col items-center p-4 shadow-lg z-50">
          
          {/* Nav Links */}
          <ul className='flex flex-col gap-4 text-gray-800 font-medium items-center mb-4'>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/product" 
                className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex justify-between w-full max-w-[130px]">
            <NavLink 
              to="/cart" 
              className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
            </NavLink>
            <NavLink 
              to="/user" 
              className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="text-lg" />
            </NavLink>
            <NavLink 
              to="/chat" 
              className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faComment} className="text-lg" />
            </NavLink>
          </div>
        </div>
      )}

      {/* Desktop Nav Links */}
      <nav className="hidden lg:flex items-center gap-8">
        <ul className='flex gap-6 text-gray-800 font-medium items-center'>
          <li>
            <NavLink to="/" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Desktop Icons */}
      <div className="hidden  items-center lg:flex justify-between gap-5">
        <NavLink to="/cart" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}>
          <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
        </NavLink>
        <NavLink to="/user" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}>
          <FontAwesomeIcon icon={faUser} className="text-lg" />
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => `${isActive ? "text-orange-700" : "text-gray-800"} hover:text-orange-700`}>
          <RiGeminiFill icon={RiGeminiFill} className="text-lg" />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
