import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faChevronDown, faEnvelope, faDatabase, faUserLock, faCookie, faGlobe } from '@fortawesome/free-solid-svg-icons';

function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState(null);
  const [isSupportHovered, setIsSupportHovered] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'data-collection',
      title: "Data We Collect",
      icon: faDatabase,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">We collect information to provide better services to all our users. This includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300"><strong>Personal Information:</strong> Name, email, phone number when you create an account</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Transaction Data:</strong> Purchase history, payment information</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Device Information:</strong> IP address, browser type, operating system</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Usage Data:</strong> Pages visited, time spent on site, click patterns</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Note:</strong> We never store your full payment card details. All payments are processed through secure third-party providers.</p>
          </div>
        </>
      )
    },
    {
      id: 'data-use',
      title: "How We Use Your Data",
      icon: faUserLock,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Your information helps us provide and improve our services:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300">Process orders and deliver products</li>
            <li className="text-gray-700 dark:text-gray-300">Personalize your shopping experience</li>
            <li className="text-gray-700 dark:text-gray-300">Improve our website and services</li>
            <li className="text-gray-700 dark:text-gray-300">Communicate with you about orders, products, and promotions</li>
            <li className="text-gray-700 dark:text-gray-300">Prevent fraud and enhance security</li>
          </ul>
        </>
      )
    },
    {
      id: 'data-sharing',
      title: "Data Sharing",
      icon: faGlobe,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">We may share your information in these limited circumstances:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300"><strong>Service Providers:</strong> Shipping carriers, payment processors</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
          </ul>
          <div className="mt-4 p-3 bg-green-50 dark:bg-gray-700 rounded-lg border-l-4 border-green-500">
            <p className="text-sm text-gray-700 dark:text-gray-300"><strong>We do not sell</strong> your personal information to third parties for marketing purposes.</p>
          </div>
        </>
      )
    },
    {
      id: 'cookies',
      title: "Cookies & Tracking",
      icon: faCookie,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300">Remember your preferences and login information</li>
            <li className="text-gray-700 dark:text-gray-300">Analyze site traffic and usage patterns</li>
            <li className="text-gray-700 dark:text-gray-300">Deliver targeted advertising (with your consent)</li>
          </ul>
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">You can control cookies through your browser settings.</p>
          </div>
        </>
      )
    },
    {
      id: 'rights',
      title: "Your Rights",
      icon: faShieldAlt,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">You have certain rights regarding your personal data:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300"><strong>Access:</strong> Request a copy of your personal data</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Correction:</strong> Update inaccurate information</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Deletion:</strong> Request deletion of your data</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            <li className="text-gray-700 dark:text-gray-300"><strong>Restriction:</strong> Limit how we use your data</li>
          </ul>
          <div className="mt-4 p-3 bg-purple-50 dark:bg-gray-700 rounded-lg border-l-4 border-purple-500">
            <p className="text-sm text-gray-700 dark:text-gray-300">To exercise these rights, please contact our Data Protection Officer at <span className="font-medium">privacy@craftednest.com</span></p>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-900 font-poppins text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#F7F7F7] dark:from-gray-900 to-[#f0f0f0] dark:to-gray-950">
        <div className="text-center px-4 sm:px-6">
          <div className="inline-block p-5 mb-4 rounded-full bg-orange-100 dark:bg-orange-700">
            <FontAwesomeIcon icon={faShieldAlt} className="text-4xl sm:text-5xl text-orange-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
              GDPR Compliant
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-md">
              Last Updated: June 2023
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Policy Accordions */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                CraftedNest ("we", "us", or "our") operates the CraftedNest website and e-commerce platform. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
            
            {sections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-5 flex justify-between items-center text-left font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-700 text-orange-500 dark:text-orange-400">
                      <FontAwesomeIcon icon={section.icon} className="text-lg" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg">{section.title}</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-300 text-gray-400 ${openSection === section.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === section.id && (
                  <div className="px-5 pb-5 pt-0 text-gray-600 dark:text-gray-300 animate-slide-down">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mt-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Policy Updates</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </div>
          </div>

          {/* Help Card */}
          <div className="md:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Privacy Questions?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Contact our Data Protection Officer for any questions about your personal data or this policy.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-700 text-orange-500 dark:text-orange-400 mt-1">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">privacy@craftednest.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-700 text-orange-500 dark:text-orange-400 mt-1">
                      <FontAwesomeIcon icon={faShieldAlt} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Data Protection Officer</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Sujal Patel</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quick Links</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm">
                          Data Access Request Form
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm">
                          Cookie Preferences
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm">
                          Unsubscribe from Marketing
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900 rounded-xl p-6 border border-orange-100 dark:border-orange-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Your Privacy Choices</h3>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-1 w-2 h-2 rounded-full bg-orange-500"></span>
                    <span>Adjust cookie settings in your browser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-1 w-2 h-2 rounded-full bg-orange-500"></span>
                    <span>Opt-out of marketing emails via unsubscribe link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block mt-1 w-2 h-2 rounded-full bg-orange-500"></span>
                    <span>Contact us to delete your account data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Widget */}
      <div className="fixed bottom-6 right-6 z-10">
        <div className="relative">
          <button
            onMouseEnter={() => setIsSupportHovered(true)}
            onMouseLeave={() => setIsSupportHovered(false)}
            onClick={() => alert('Contact Privacy Team: privacy@craftednest.com | +91-9879283930')}
            className="bg-orange-500 dark:bg-orange-700 text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-orange-600 dark:hover:bg-orange-800 transition duration-300 shadow-xl"
          >
            <FontAwesomeIcon icon={faShieldAlt} className="text-xl" />
          </button>
          {isSupportHovered && (
            <div className="absolute right-16 bottom-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-48 animate-fade-in">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Privacy concerns?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Contact our DPO</p>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateX(10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-down {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default PrivacyPolicy;