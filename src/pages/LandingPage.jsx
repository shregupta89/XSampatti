import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { ThemeProvider } from '@/components/theme-provider';
import FeaturesSection from '@/components/ladingPageComponents/Features';
import Hero from '@/components/ladingPageComponents/Hero';
import PricingAndTestimonials from '@/components/ladingPageComponents/PricingAndTestimonials';
import DownloadStatsAndFooter from '@/components/ladingPageComponents/StatisticsAndFooter';

// Import previously created components
const ExpenseTrackerLanding = () => {
  const navigate=useNavigate();
  return (
    <div>

    
   
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-darkorange rounded-full flex items-center justify-center text-white font-bold mr-2">
                X
              </div>
              <span className="text-xl font-semibold">Sampatti</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About us</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#feedback" className="text-gray-600 hover:text-gray-900">Feedback</a>
            </div>
            
            <button onClick={()=>navigate('/signup')}className="px-4 py-2 text-darkorange border border-darkorange rounded-lg hover:bg-coral-50">
             Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16"> {/* Add padding to account for fixed navbar */}
        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero/>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturesSection />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingAndTestimonials/>
          </div>
        </section>

        {/* Download Stats Section */}
        <section className="bg-darkorange">
          <DownloadStatsAndFooter/>
        </section>
      </main>
      </div>
   
  );
};

export default ExpenseTrackerLanding;