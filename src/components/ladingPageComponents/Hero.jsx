import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate=useNavigate();
  return (
    <div className="h-full bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6  flex flex-col md:flex-row items-center justify-between">
        {/* Left Column */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-7xl font-extrabold leading-tight mb-6">
            Track your Expenses to Save Money
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            Helps you to organize your income and expenses
          </p>
          <div className="flex items-center space-x-4">
            <button onClick={()=>navigate('/login')} className="px-6 py-3 bg-darkorange hover:bg-darkerorange text-white rounded-lg flex items-center ">
              Login
              
            </button>
            <span className="text-gray-400">— Web, iOS and Android</span>
          </div>
        </div>

        {/* Right Column - Illustration */}
        <div className="md:w-1/2">
          <div className="relative">
            {/* Person with Device */}
            <div className="relative z-10">
              <img src="/hero.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;