import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className='bg-gradient-to-b from-[#F9F9F9] to-[#F0F0F0] dark:from-gray-900 dark:to-gray-800 w-full border-t border-gray-200 dark:border-gray-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12'>
          {/* Brand Section */}
          <div className='flex flex-col items-center md:items-start gap-4 text-center md:text-left'>
            <div className='flex items-center gap-2'>
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
                Crafted<span className="italic font-serif text-orange-500 dark:text-orange-400">Nest</span>
              </span>
            </div>
            <p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed'>
              Your one-stop shop for the latest trends in fashion, electronics, and more.
            </p>
            <div className='mt-2 flex gap-4'>
              <a href="#" className='text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300'>
                <FontAwesomeIcon icon={faFacebook} className='text-xl' />
              </a>
              <a href="#" className='text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300'>
                <FontAwesomeIcon icon={faXTwitter} className='text-xl' />
              </a>
              <a href="#" className='text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300'>
                <FontAwesomeIcon icon={faInstagram} className='text-xl' />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-orange-500 after:rounded-full'>
              Quick Links
            </h3>
            <ul className='flex flex-col items-center md:items-start gap-3 text-sm sm:text-base'>
              <li>
                <a href="about" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  FAQs
                </a>
              </li>
              <li>
                <a href="about" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="privatepolicy" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="returnrefunds" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-orange-500 after:rounded-full'>
              Customer Service
            </h3>
            <ul className='flex flex-col items-center md:items-start gap-3 text-sm sm:text-base'>
              <li>
                <a href="#" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  Size Guide
                </a>
              </li>
              <li>
                <a href="contact" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-300 flex items-center gap-2'>
                  <span className='w-2 h-2 bg-orange-400 rounded-full'></span>
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-orange-500 after:rounded-full'>
              Contact Us
            </h3>
            <ul className='flex flex-col gap-4 text-sm sm:text-base'>
              <li className='flex items-start gap-3'>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='text-orange-500 mt-1 text-sm' />
                <span className='text-gray-600 dark:text-gray-300'>
                  DRB Commerce College,<br />
                   Surat, Gujarat 395001, India
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <FontAwesomeIcon icon={faEnvelope} className='text-orange-500 text-sm' />
                <a href="https://mailto:sujalpatel3350@gmail.com" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300'>
                  sujalpatel3350@gmail.com
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <FontAwesomeIcon icon={faPhone} className='text-orange-500 text-sm' />
                <a href="tel:+919879283930" className='text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300'>
                  +91 9879283930
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Payment Methods */}
        <div className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
            <p className='text-gray-500 dark:text-gray-400 text-sm'>
              © {new Date().getFullYear()} CraftedNest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;