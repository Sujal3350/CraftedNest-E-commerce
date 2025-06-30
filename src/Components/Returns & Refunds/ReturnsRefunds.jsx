import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faUndo, faEnvelope, faChevronDown, faShieldAlt, faExchangeAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function ReturnsRefunds() {
  const [openSection, setOpenSection] = useState(null);
  const [isSupportHovered, setIsSupportHovered] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const policies = [
    {
      id: 'returns',
      title: "Returns Policy",
      icon: faBoxOpen,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">You can return items within 30 days of delivery if they are unused and in original packaging.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300">Free returns for damaged or defective products</li>
            <li className="text-gray-700 dark:text-gray-300">Initiate a return via your account or contact support</li>
            <li className="text-gray-700 dark:text-gray-300">Refund processed within 7-10 business days</li>
            <li className="text-gray-700 dark:text-gray-300">Original and duplicate invoice must be included</li>
          </ul>
          <div className="mt-4 p-3 bg-orange-50 dark:bg-gray-700 rounded-lg border-l-4 border-orange-500">
            <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Note:</strong> Return shipping costs are the responsibility of the customer unless the return is due to our error.</p>
          </div>
        </>
      )
    },
    {
      id: 'refunds',
      title: "Refunds Policy",
      icon: faUndo,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Refunds are issued to the original payment method after verification.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300">Processing time: 7-10 business days</li>
            <li className="text-gray-700 dark:text-gray-300">Non-refundable items: Custom orders or sale items</li>
            <li className="text-gray-700 dark:text-gray-300">Contact us for refund status updates</li>
            <li className="text-gray-700 dark:text-gray-300">Partial refunds may be issued for used or damaged items</li>
          </ul>
        </>
      )
    },
    {
      id: 'exchanges',
      title: "Exchanges",
      icon: faExchangeAlt,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">We offer hassle-free exchanges for items of equal or greater value.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300">Exchange requests must be made within 14 days of delivery</li>
            <li className="text-gray-700 dark:text-gray-300">Items must be unused and in original packaging</li>
            <li className="text-gray-700 dark:text-gray-300">Customer responsible for return shipping costs</li>
            <li className="text-gray-700 dark:text-gray-300">Price differences will be charged/refunded accordingly</li>
          </ul>
        </>
      )
    },
    {
      id: 'warranty',
      title: "Warranty Information",
      icon: faShieldAlt,
      content: (
        <>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Our products come with a manufacturer's warranty against defects.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-gray-700 dark:text-gray-300">1-year limited warranty on all products</li>
            <li className="text-gray-700 dark:text-gray-300">Warranty covers manufacturing defects only</li>
            <li className="text-gray-700 dark:text-gray-300">Does not cover damage from misuse or normal wear</li>
            <li className="text-gray-700 dark:text-gray-300">Warranty claims require proof of purchase</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-gray-800 font-poppins text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#F7F7F7] dark:from-gray-800 to-[#f0f0f0] dark:to-gray-900">
        <div className="text-center px-4 sm:px-6">
          <div className="inline-block p-5 mb-4 rounded-full bg-orange-100 dark:bg-gray-700">
            <FontAwesomeIcon icon={faBoxOpen} className="text-4xl sm:text-5xl text-orange-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Returns & Refunds Policy</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Our hassle-free return process ensures your complete satisfaction with every CraftedNest purchase.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
              30-Day Returns
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-md">
              Free Returns for Defects
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Policy Accordions */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-orange-500" />
              Frequently Asked Questions
            </h2>
            
            {policies.map((policy) => (
              <div key={policy.id} className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-600 transition-all hover:shadow-md">
                <button
                  onClick={() => toggleSection(policy.id)}
                  className="w-full p-5 flex justify-between items-center text-left font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-orange-100 dark:bg-gray-600 text-orange-500 dark:text-orange-400">
                      <FontAwesomeIcon icon={policy.icon} className="text-lg" />
                    </div>
                    <span className="text-gray-900 dark:text-white text-lg">{policy.title}</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-300 text-gray-400 ${openSection === policy.id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === policy.id && (
                  <div className="px-5 pb-5 pt-0 text-gray-600 dark:text-gray-300 animate-slide-down">
                    {policy.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Help Card */}
          <div className="md:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Need Help With a Return?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our customer service team is here to help you with any questions about returns, exchanges, or refunds.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-gray-600 text-orange-500 dark:text-orange-400 mt-1">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">support@craftednest.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-gray-600 text-orange-500 dark:text-orange-400 mt-1">
                      <FontAwesomeIcon icon={faBoxOpen} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Return Address</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        123 Returns Lane<br />
                        Mumbai, MH 400001<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-600">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quick Links</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm">
                          Start a Return Online
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm">
                          Track Your Return
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-sm">
                          Refund Status
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-orange-50 dark:bg-gray-700 rounded-xl p-6 border border-orange-100 dark:border-gray-600">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Return Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>Package items securely in original packaging</li>
                  <li>Include all original tags and accessories</li>
                  <li>Attach the return label to the package</li>
                  <li>Drop off at your nearest shipping center</li>
                </ol>
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
            onClick={() => alert('Contact Support: support@craftednest.com | +91-9879283930')}
            className="bg-orange-500 dark:bg-orange-600 text-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-orange-600 dark:hover:bg-orange-700 transition duration-300 shadow-xl"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          </button>
          {isSupportHovered && (
            <div className="absolute right-16 bottom-0 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-3 w-48 animate-fade-in">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Need help with returns?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to chat with support</p>
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

export default ReturnsRefunds;