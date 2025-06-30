import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import member from '../../assets/member.png';
import { 
  faCheckCircle, 
  faLeaf, 
  faTruck, 
  faHeart, 
  faPlus, 
  faMinus, 
  faSearch, 
  faEnvelope, 
  faPhone,
  faStar,
  faHandsHelping,
  faAward,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import decor from '../../assets/decor.avif';
import storage from '../../assets/storage.avif';
import cookware from '../../assets/cookware.avif';
// import teamImage from '../../assets/team.jpg';
// import craftImage from '../../assets/craftsmanship.jpg';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <button
        className="w-full text-left p-5 sm:p-6 flex justify-between items-center text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg">{question}</span>
        <FontAwesomeIcon 
          icon={isOpen ? faMinus : faPlus} 
          className="text-orange-500 dark:text-orange-400 text-sm" 
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-gray-600 dark:text-gray-300">
          {answer}
        </div>
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
      question: 'How do I get started with CraftedNest?',
      answer: "Browse our collections online or visit one of our stores. Our team is always ready to help you find the perfect pieces for your home. Sign up for an account to save your favorites and track orders easily."
    },
    {
      question: 'What makes CraftedNest products special?',
      answer: 'We combine traditional craftsmanship with modern design, using sustainable materials and ethical production methods. Each piece is carefully selected or designed to bring both beauty and functionality to your home.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with packaging. Some large furniture items may have different policies - please check product details or contact us for specifics.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently we ship within India only. We\'re working to expand our international shipping options in the future. Sign up for our newsletter to stay updated on new shipping destinations.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a confirmation email with tracking information. You can also check your order status by logging into your account on our website.'
    },
  ]);

  useEffect(() => {
    setIsVisible(true);
    import('../../data/faqData.json')
      .then((module) => setFaqData(module.default))
      .catch((error) => console.error('Error importing FAQ data:', error));
  }, []);

  const allFaqs = [...hardcodedFaqs, ...faqData];
  const filteredFaqs = allFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-poppins">
      {/* Hero Section */}
      <section className="relative h-[70vh] max-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
              filter: 'blur(4px)',
              transform: 'scale(1.05)',
            }}
            alt="CraftedNest team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Crafted<span className="text-orange-400">Nest</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
            We blend timeless craftsmanship with contemporary design to create home essentials that tell your story
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              Our Collections
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              Meet The Team
            </button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src={member} 
              alt="Craftsmanship" 
              className="rounded-xl shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                Founded in 2015 in the heart of Gujarat, CraftedNest began as a small workshop dedicated to preserving traditional Indian craftsmanship. What started with just three artisans creating hand-carved wooden furniture has grown into a beloved brand serving thousands of homes across India.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                Today, we partner with over 200 local artisans and small workshops across the country, blending their time-honored techniques with contemporary design sensibilities. Each piece in our collection tells a story - of the hands that made it, the materials that shaped it, and the home it will become part of.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full flex items-center gap-2">
                  <FontAwesomeIcon icon={faAward} className="text-orange-500" />
                  <span className="text-sm font-medium">50+ Design Awards</span>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full flex items-center gap-2">
                  <FontAwesomeIcon icon={faHandsHelping} className="text-orange-500" />
                  <span className="text-sm font-medium">200+ Artisans</span>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full flex items-center gap-2">
                  <FontAwesomeIcon icon={faStar} className="text-orange-500" />
                  <span className="text-sm font-medium">20K+ Happy Homes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-6 sm:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Thoughtfully designed home essentials that combine beauty, functionality and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                image: cookware, 
                title: 'Kitchen Essentials', 
                description: 'Premium cookware that makes every meal special',
                features: ['Non-toxic materials', 'Ergonomic designs', 'Easy maintenance']
              },
              { 
                image: decor, 
                title: 'Home Decor', 
                description: 'Elegant pieces that reflect your personal style',
                features: ['Handcrafted details', 'Versatile designs', 'Timeless appeal']
              },
              { 
                image: storage, 
                title: 'Smart Storage', 
                description: 'Solutions to organize and elevate your space',
                features: ['Space-saving designs', 'Durable materials', 'Multi-functional']
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 h-96"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="mb-4 opacity-90">{item.description}</p>
                  <ul className="space-y-1 text-sm opacity-90">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-orange-400 mr-2 text-xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6 sm:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: faCheckCircle, 
                title: 'Quality Craftsmanship', 
                description: 'We obsess over every detail to deliver products that stand the test of time',
                color: 'text-blue-500'
              },
              { 
                icon: faLeaf, 
                title: 'Sustainable Practices', 
                description: 'Eco-friendly materials and responsible manufacturing processes',
                color: 'text-green-500'
              },
              { 
                icon: faShieldAlt, 
                title: 'Ethical Sourcing', 
                description: 'Fair wages and safe working conditions for all our partners',
                color: 'text-purple-500'
              },
              { 
                icon: faHeart, 
                title: 'Customer Love', 
                description: 'Your satisfaction is our ultimate measure of success',
                color: 'text-pink-500'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center h-full flex flex-col"
              >
                <div className={`${value.color} text-4xl mb-6`}>
                  <FontAwesomeIcon icon={value.icon} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-auto">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 sm:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CraftedNest?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              The CraftedNest difference goes beyond our products
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      title: 'Expert Design Consultation', 
                      description: 'Our design specialists help you create cohesive, beautiful spaces',
                      icon: faStar
                    },
                    { 
                      title: 'Hassle-Free Delivery', 
                      description: 'White-glove delivery and assembly for large items',
                      icon: faTruck
                    },
                    { 
                      title: 'Extended Warranties', 
                      description: 'Peace of mind with our industry-leading warranties',
                      icon: faShieldAlt
                    },
                    { 
                      title: 'Customization Options', 
                      description: 'Many pieces can be customized to your exact needs',
                      icon: faCheckCircle
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xs hover:shadow-sm transition-shadow duration-300 flex items-start"
                    >
                      <div className={`text-orange-500 mr-4 mt-1 text-xl`}>
                        <FontAwesomeIcon icon={item.icon} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/10 p-8 rounded-xl shadow-sm border border-orange-100 dark:border-orange-900/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Promise</h3>
              <ul className="space-y-4">
                {[
                  "100% satisfaction guarantee",
                  "Ethically made products",
                  "Price match guarantee",
                  "Lifetime customer support"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className="text-orange-500 mr-3 mt-1 flex-shrink-0" 
                    />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 sm:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Can't find what you're looking for? Contact our team anytime.
            </p>
          </div>

          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
          </div>

          <div className="space-y-4 mb-12">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-300">No matching questions found. Try a different search term.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faEnvelope} className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Have questions or need assistance? Our team typically responds within 24 hours.
              </p>
              <a 
                href="mailto:support@craftednest.com" 
                className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300"
              >
                Email Us
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faPhone} className="text-orange-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Available Monday to Saturday, 9AM to 6PM IST for immediate assistance.
              </p>
              <a 
                href="tel:+911234567890" 
                className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300"
              >
                +91 123 456 7890
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;