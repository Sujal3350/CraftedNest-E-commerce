import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className='bg-[#F7F7F7] w-full border-t border-gray-300 shadow-inner' style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {/* Brand Section */}
          <div className='flex flex-col items-center sm:items-start gap-3 text-center sm:text-left'>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight drop-shadow-md">
              Crafted<span className="italic font-serif text-gray-800 drop-shadow-2xl">Nest</span>
            </span>
            <p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
              Your one-stop shop for the latest trends in fashion, electronics, and more.
            </p>
          </div>

          {/* Links Section */}
          <div className='flex flex-col items-center sm:items-start'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4'>Quick Links</h3>
            <ul className='flex flex-col items-center sm:items-start gap-1 sm:gap-2 text-xs sm:text-sm'>
              <li><a href="#" className='text-gray-600 hover:text-orange-700 font-medium'>About Us</a></li>
              <li><a href="#" className='text-gray-600 hover:text-orange-700 font-medium'>FAQs</a></li>
              <li><a href="#" className='text-gray-600 hover:text-orange-700 font-medium'>Returns & Refunds</a></li>
              <li><a href="#" className='text-gray-600 hover:text-orange-700 font-medium'>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact & Social Section */}
          <div className='flex flex-col items-center sm:items-start'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4'>Get in Touch</h3>
            <p className='text-gray-600 text-xs sm:text-sm mb-1'>Email: support@shoptrend.com</p>
            <p className='text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4'>Phone: +1 (800) 123-4567</p>
            <ul className='flex gap-3 sm:gap-4'>
              <li><a href="#" className='text-gray-600 hover:text-orange-700'><FontAwesomeIcon icon={faFacebook} className='text-lg sm:text-xl' /></a></li>
              <li><a href="#" className='text-gray-600 hover:text-orange-700'><FontAwesomeIcon icon={faXTwitter} className='text-lg sm:text-xl' /></a></li>
              <li><a href="#" className='text-gray-600 hover:text-orange-700'><FontAwesomeIcon icon={faInstagram} className='text-lg sm:text-xl' /></a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200 text-center'>
          <p className='text-gray-600 text-xs sm:text-sm'>
            © {new Date().getFullYear()} ShopTrend. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;