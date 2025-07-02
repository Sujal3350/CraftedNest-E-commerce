import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('');

    const form = e.target;
    const formData = new FormData(form);
    formData.append('replyto', form.email.value);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult('Thank you! Your message has been sent successfully.');
        form.reset();
      } else {
        setResult(data.message || 'Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-[#F0F0F0] dark:from-gray-900 dark:to-gray-800 font-poppins flex flex-col items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-4">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with any questions or inquiries and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information and Map */}
          <div className="flex flex-col gap-6 animate-slide-up">
            {/* Contact Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sm" />
                </span>
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400 mt-1 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Phone</h3>
                    <a 
                      href="tel:+919879283930" 
                      className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      +91 98792 83930
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400 mt-1 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Email</h3>
                    <a 
                      href="mailto:sujalpatel3350@gmail.com" 
                      className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      sujalpatel3350@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-gray-700 text-orange-600 dark:text-orange-400 mt-1 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Address</h3>
                    <a
                      href="https://www.google.com/maps/place/DRB+Commerce+College/@21.152034,72.7963094,902m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3be04dff37092877:0x39a0fba9ce2971c5!8m2!3d21.152029!4d72.7988897!16s%2Fg%2F1tdbpb7b?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      DRB Commerce College, Surat, Gujarat 395001, India
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-500" />
                Our Location
              </h3>
              <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
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
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 animate-slide-up">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Us a Message
            </h3>
            <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <input type="hidden" name="access_key" value="d4dd43df-f860-42b1-a511-6d20b1de8e37"/>
              
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your inquiry..."
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all duration-200"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-orange-400 dark:bg-orange-500 cursor-not-allowed' 
                    : 'bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 shadow-md hover:shadow-lg'
                } flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
            
            {result && (
              <div className={`mt-4 p-3 rounded-lg text-center ${
                result.includes('Thank') 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              } transition-all duration-300`}>
                {result}
              </div>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center animate-fade-in">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Connect With Us On Social Media</h3>
          <ul className="flex gap-5 sm:gap-6">
            <li>
              <a
                href="https://www.facebook.com/share/1Aq818uHw9/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                  <FontAwesomeIcon icon={faFacebook} className="text-xl sm:text-2xl" />
                </div>
                <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/sujal_1088"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                  <FontAwesomeIcon icon={faInstagram} className="text-xl sm:text-2xl" />
                </div>
                <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/9879283930"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xl sm:text-2xl" />
                </div>
                <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;