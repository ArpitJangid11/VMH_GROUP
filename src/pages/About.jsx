import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T2O</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              We Started In 2015 & Currently Have More Than{' '}
              <span className="text-red-500">3 Million Members Worldwide</span>
            </h1>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Turn2Opinion is a world wide Consumer and Business Community of Frequent Research.
                Turn2Opinion welcomes you as our new panel members to take participate and share your
                opinion and perspective to wide-ranging market research survey campaigns.
              </p>
              
              <p>
                It is a platform which helps you to generate more and more revenues in high incentive
                rewards. You get the studies that are best fit for you. The more participation you do in the
                surveys, You will be able to earn more and more money.
              </p>
            </div>
          </div>
          
          {/* Right Visual Elements */}
          <div className="relative">
            <div className="flex flex-col items-center space-y-8">
              {/* Top emoji with magnifying glass */}
              <div className="relative">
                <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl">
                  😲
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                  🔍
                </div>
              </div>
              
              {/* Stack of cards */}
              <div className="relative">
                <div className="w-32 h-8 bg-amber-600 rounded transform rotate-6"></div>
                <div className="w-32 h-8 bg-amber-700 rounded transform -rotate-3 -mt-2"></div>
                <div className="w-32 h-8 bg-amber-800 rounded -mt-2"></div>
              </div>
              
              {/* Bottom happy emoji with stars */}
              <div className="relative">
                <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-6xl">
                  😊
                </div>
                <div className="absolute -top-4 -right-4 flex space-x-1">
                  <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-lg">⭐</div>
                  <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-lg">⭐</div>
                  <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-lg">⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="bg-gradient-to-r from-orange-200 to-yellow-200 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-full p-12 shadow-lg inline-block mb-8">
              <div className="max-w-2xl">
                <p className="text-gray-800 text-lg leading-relaxed mb-6">
                  "If you like taking surveys this has to be the site for you. There's always plenty
                  of surveys and the money soon mounts up. You can cash out with as little as a
                  $2 via paypal which is far better than sites that make you hang on until you've hit
                  $20+."
                </p>
                <p className="text-orange-500 font-semibold italic">
                  - Geetika (India)
                </p>
              </div>
            </div>
            
            {/* Background decorative icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-12 h-12 bg-orange-300 rounded-full opacity-30 flex items-center justify-center">
                👍
              </div>
              <div className="absolute bottom-32 right-32 w-12 h-12 bg-yellow-300 rounded-full opacity-30 flex items-center justify-center">
                ⏰
              </div>
              <div className="absolute top-40 right-20 w-12 h-12 bg-red-300 rounded-full opacity-30 flex items-center justify-center">
                😊
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-6 mb-8 lg:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-4xl">
                👍
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Let's Get Started</h2>
                <p className="text-gray-600">
                  Be our community member and get rewarded with points and credit your paypal account after
                  your loyal inputs.
                </p>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              JOIN NOW
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-orange-100 to-yellow-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">Turn2</span>
                <span className="text-2xl font-bold text-orange-500">Opinion</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Turn2Opinion is a world wide Consumer and Business
                Community of Frequent Research. Turn2Opinion
                welcomes you as our new panel members to take
                participate and share your opinion and perspective to
                wide-ranging market research survey campaigns.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">GDPR Compliance</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>Third Floor, B-96, Pushpanjali Enclave, Pitampura,</p>
                <p>Delhi 110034 India</p>
                <p className="mt-3">📞 +91 8130015743</p>
                <p>✉️ support@frequentresearch.com</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-300 mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Frequent Research Fieldwork Solutions Pvt. Ltd. (dba Turn2Opinion). All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
