import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Real-time support section */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            
            <h2 className="text-4xl font-bold mt-2 mb-4">
            Auto-Payment & Collection Suggestions
            </h2>
            <p className="text-gray-600 mb-6">
            Based on your past transactions, the system can suggest auto-pay options for recurring expenses like subscriptions. It can also remind you to follow up on pending payments from others, with a smart delay reminder if they haven’t paid yet.            </p>
            <button className="text-darkorange flex items-center hover:text-coral-600">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <div className="relative">
              <img 
                src="/feature1.png" 
                alt="Real-time support illustration" 
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Save cost section */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
          
            <h2 className="text-4xl font-bold mt-2 mb-4">
            Smart Budgeting Goals 
            </h2>
            <p className="text-gray-600 mb-6">
             The system can  analyze your spending trends and suggest personalized saving tips. It can notify you when you are about to exceed your monthly spending limit in specific categories (e.g., dining, shopping).            </p>
            <button className="text-darkorange flex items-center hover:text-coral-600">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Save cost illustration" 
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use anytime section */}
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
           
            <h2 className="text-4xl font-bold mt-2 mb-4">
             Budgeting Insights
            </h2>
            <p className="text-gray-600 mb-6">
            View your weekly/monthly expenses as pie charts and bar graphs to identify spending patterns and optimize savings.            </p>
            <button className="text-darkorange flex items-center hover:text-coral-600">
              Learn more <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="md:w-1/2 flex justify-end">
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Use anytime illustration" 
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;