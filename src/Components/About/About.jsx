import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLeaf, faTruck, faHeart, faPlus, faMinus, faSearch, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import decor from '../../assets/decor.avif';
import storage from '../../assets/storage.avif';
import cookware from '../../assets/cookware.avif';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <button
        className="w-full text-left p-4 sm:p-6 flex justify-between items-center text-gray-900 font-semibold hover:bg-gray-50 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} className="text-orange-700" />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="p-4 sm:p-6 text-sm sm:text-base text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [faqData, setFaqData] = useState([]);
  const [hardcodedFaqs] = useState([
    {
      question: 'How do I get started?',
      answer:
        "When you sign up, you'll start with the Free plan. It's ideal for new teams and allows unlimited team members, but only 1 active editable project at a time. For more advanced features, check out our Basic, Premium, or Enterprise plans.",
    },
    {
      question: 'What is included in the Free Plan?',
      answer:
        'The Free Plan includes unlimited team members, 1 active editable project, and basic features. For more advanced tools, consider upgrading to a paid plan.',
    },
    {
      question: 'How do I cancel my membership?',
      answer:
        'To cancel your membership, go to your account settings and select "Cancel Subscription." Follow the prompts to confirm. You’ll receive a confirmation email.',
    },
    {
      question: 'How do I transfer my membership to a different account?',
      answer:
        'To transfer your membership, contact our support team via email or phone. Provide the new account details, and we’ll assist you with the process.',
    },
    {
      question: 'What is the refund policy?',
      answer:
        'We offer a 7-day refund policy from the date of purchase. Contact us within this period with your order details for a full refund.',
    },
  ]);

  useEffect(() => {
    setIsVisible(true); // Trigger animations when component mounts
    import('../../data/faqData.json')
      .then((module) => setFaqData(module.default))
      .catch((error) => console.error('Error importing FAQ data:', error));
  }, []);

  // Combine hardcoded and JSON data, then filter based on search term
  const allFaqs = [...hardcodedFaqs, ...faqData];
  const filteredFaqs = allFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5); // Limit to 5 items

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-poppins flex flex-col items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl w-full">
        {/* Hero Section */}
        <section className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl shadow-2xl mb-8 sm:mb-12 overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
              filter: 'blur(4px)',
              transform: 'scale(1.05)',
            }}
          ></div>
          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
          <div className="relative text-center text-white px-4 sm:px-6 z-10 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              Crafted<span className="italic font-serif text-orange-300">Nest</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-6 leading-relaxed opacity-90">
              At CraftedNest, we believe every home deserves style, comfort, and smart solutions. From elegant kitchenware to cozy living essentials, we bring quality to your doorstep.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className={`mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 relative">
            Our Story
          </h2>
          <div className="relative bg-gradient-to-r from-orange-50 to-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border-l-4 border-orange-700">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              What started as a small home essentials shop in Gujarat, inspired by our love for traditional craftsmanship, has grown into a pan-India brand serving over 20,000 happy customers. We partner with local artisans to bring handcrafted, modern designs to your home, blending tradition with innovation.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className={`mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cookware */}
            <div className={`h-60 relative bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center overflow-hidden ${isVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0s' }}>
              <div
                className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
                style={{ backgroundImage: `url(${cookware})`, filter: 'blur(2px)', transform: 'scale(1.05)' }}
              ></div>
              <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Cookware
                </h3>
                <p className="text-sm sm:text-base font-bold text-white/90 max-w-xs drop-shadow-md">
                  Durable, stylish pots and pans for every kitchen.
                </p>
              </div>
            </div>

            {/* Decor */}
            <div className={`h-60 relative bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center overflow-hidden ${isVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.2s' }}>
              <div
                className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
                style={{ backgroundImage: `url(${decor})`, filter: 'blur(2px)', transform: 'scale(1.05)' }}
              ></div>
              <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Decor
                </h3>
                <p className="text-sm font-bold sm:text-base text-white/90 max-w-xs drop-shadow-md">
                  Elegant pieces to elevate your living space.
                </p>
              </div>
            </div>

            {/* Storage */}
            <div className={`h-60 relative bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center overflow-hidden ${isVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.4s' }}>
              <div
                className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
                style={{ backgroundImage: `url(${storage})`, filter: 'blur(2px)', transform: 'scale(1.05)' }}
              ></div>
              <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                  Storage
                </h3>
                <p className="text-sm sm:text-base text-white/90 max-w-xs drop-shadow-md font-bold">
                  Smart solutions for a clutter-free home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className={`mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 relative">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: faCheckCircle, title: 'Quality First', desc: 'Premium products built to last.' },
              { icon: faLeaf, title: 'Sustainability', desc: 'Eco-friendly materials and practices.' },
              { icon: faTruck, title: 'Fast Delivery', desc: 'Safe and timely doorstep delivery.' },
              { icon: faHeart, title: 'Customer Satisfaction', desc: 'Your happiness is our priority.' },
            ].map((value, index) => (
              <div
                key={index}
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:bg-orange-50 hover:shadow-lg transition-all duration-300 ${isVisible ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <FontAwesomeIcon icon={value.icon} className="text-orange-700 text-4xl sm:text-5xl mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={`mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 relative">
            Why Choose Us?
          </h2>
          <div className="bg-gradient-to-r from-white to-orange-50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border-r-4 border-orange-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { us: 'Premium quality at affordable rates', others: 'Overpriced or low quality' },
                { us: 'Handpicked modern designs', others: 'Outdated styles' },
                { us: '24x7 support', others: 'Slow or no response' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${isVisible ? 'animate-slide-up' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="text-orange-700 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{item.us}</p>
                    <p className="text-xs sm:text-sm text-gray-500 italic">{item.others}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className={`mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            Frequently Asked Questions
          </h2>
          <div className="w-full max-w-2xl mx-auto">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search for a question"
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <p className="text-gray-600 text-center">No results found.</p>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className={`bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition duration-300 ${isVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0s' }}>
                <FontAwesomeIcon icon={faEnvelope} className="text-orange-700 text-2xl mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                <p className="text-sm text-gray-600">
                  Have questions or need assistance? Reach out to us via email. We're here to help!
                </p>
              </div>
              <div className={`bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition duration-300 ${isVisible ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.2s' }}>
                <FontAwesomeIcon icon={faPhone} className="text-orange-700 text-2xl mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                <p className="text-sm text-gray-600">
                  Need help or have inquiries? Call us anytime. We're here for you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  );
}

export default About;