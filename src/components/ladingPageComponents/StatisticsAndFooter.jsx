import React, { useState } from 'react';
import { ArrowDown, Facebook, Twitter, Linkedin } from 'lucide-react';

const DownloadStatsAndFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
  };

  return (
    <>
      {/* Download Stats Section */}
      <section className="bg-darkorange text-white py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            20M+ downloaded from 32 different countires
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Try demo for 7 days with full features.
          </p>
          <button className="bg-white text-darkorange px-8 py-3 rounded-lg flex items-center mx-auto hover:bg-gray-100 transition-colors">
            Try free demo
            <ArrowDown className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Background illustrations would go here */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-white to-transparent" />
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo Column */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-darkorange rounded-full flex items-center justify-center text-white font-bold mr-2">
                  X
                </div>
                <span className="text-xl font-semibold">pense</span>
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">LINKS</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">About us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Blog</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">LEGAL</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Terms of use</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Terms of conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Privacy policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-darkorange">Cookie policy</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">NEWSLETTER</h3>
              <p className="text-gray-600 mb-4">
                Over 25000 people have subscribed
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkorange"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-darkorange text-white px-6 py-2 rounded-lg hover:bg-darkerorange transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  We don't sell your email and spam
                </p>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-darkorange">Privacy & Terms</a>
              <a href="#" className="text-gray-600 hover:text-darkorange">Contact Us</a>
            </div>
            <div className="text-gray-600">
              Copyright © 2022 xpence
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-darkorange">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-darkorange">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-darkorange">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default DownloadStatsAndFooter;