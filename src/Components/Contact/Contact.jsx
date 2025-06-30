
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    // Add replyto field for Web3Forms
    formData.append('replyto', form.email.value);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data); // Debug: see full response

      if (data.success) {
        setResult('Thank you! Your message has been sent.');
        form.reset();
      } else {
        setResult(data.message || 'Oops! Something went wrong.');
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-700 font-poppins flex flex-col items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mt-4">Contact Us</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2">We'd love to hear from you! Reach out with any questions or inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information and Map */}
          <div className="flex flex-col gap-6">
            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <li>
                  <span className="font-medium">Phone:</span>{' '}
                  <a href="tel:+919879283930" className="text-orange-700 dark:text-orange-400">
                    +91 98792-83930
                  </a>
                </li>
                <li>
                  <span className="font-medium">Email:</span>{' '}
                  <a href="https://mailto:sujalpatel3350@gmail.com" className="text-orange-700 dark:text-orange-400">
                    sujalpatel3350@gmail.com
                  </a>
                </li>
                <li>
                  <span className="font-medium">Address:</span>{' '}
                  <a
                    href="https://www.google.com/maps/place/DRB+Commerce+College/@21.152034,72.7963094,902m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be04dff37092877:0x39a0fba9ce2971c5!8m2!3d21.152029!4d72.7988897!16s%2Fg%2F1tdbpb7b?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-700 dark:text-orange-400"
                  >
                    DRB Commerce College, Surat, Gujarat 395001, India
                  </a>
                </li>
              </ul>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">Our Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d902.0!2d72.7963094!3d21.152034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dff37092877%3A0x39a0fba9ce2971c5!2sDRB%20Commerce%20College!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="CraftedNest Location - DRB Commerce College"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">Send Us a Message</h3>
            <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input type="hidden" name="access_key" value="d4dd43df-f860-42b1-a511-6d20b1de8e37"/>
              <div>
                <label htmlFor="name" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-500 dark:border-gray-400 focus:outline-none text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-500 dark:border-gray-400 focus:outline-none text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-500 dark:border-gray-400 focus:outline-none text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-500 dark:border-gray-400 focus:outline-none text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-black dark:bg-gray-700 text-white py-2 sm:py-3 rounded-full font-semibold hover:bg-white dark:hover:bg-gray-600 hover:text-black dark:hover:text-white border border-black dark:border-gray-700 transition duration-300 text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
            <p
              className={`mt-4 text-sm sm:text-base text-center ${
                result.includes('Error') || result.includes('wrong')
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-green-600 dark:text-green-400'
              }`}
            >
              {result}
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">Connect With Us</h3>
          <ul className="flex gap-4 sm:gap-6">
            <li>
              <a
                href="https://www.facebook.com/share/1Aq818uHw9/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-700 dark:hover:text-orange-400"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-xl sm:text-2xl" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/sujal_1088"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-700 dark:hover:text-orange-400"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-xl sm:text-2xl" />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/9879283930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-700 dark:hover:text-orange-400"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl sm:text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
