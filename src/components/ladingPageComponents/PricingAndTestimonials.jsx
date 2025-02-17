import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Box, Briefcase, Monitor } from 'lucide-react';

const PricingAndTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const pricingPlans = [
    {
      icon: <Box className="w-6 h-6 text-blue-400" />,
      name: 'Starter Plan',
      price: '$9.99',
      color: 'blue',
      features: [
        'Store unlimited data',
        'Export to pdf, xls, csv',
        'Cloud server support'
      ]
    },
    {
      icon: <Briefcase className="w-6 h-6 text-darkorange" />,
      name: 'Sliver Plan',
      price: '$19.99',
      color: 'coral',
      features: [
        'Store unlimited data',
        'Export to pdf, xls, csv',
        'Cloud server support'
      ]
    },
    {
      icon: <Monitor className="w-6 h-6 text-purple-500" />,
      name: 'Diamond Plan',
      price: '$29.99',
      color: 'purple',
      features: [
        'Store unlimited data',
        'Export to pdf, xls, csv',
        'Cloud server support'
      ]
    }
  ];

  const testimonials = [
    {
      text: "Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium felis massa mauris, aliquam congue.",
      author: "Cameron Williamson",
      role: "CEO",
      avatar: "/api/placeholder/40/40"
    },
    {
      text: "Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium felis massa mauris, aliquam congue.",
      author: "Cameron Williamson",
      role: "CEO",
      avatar: "/api/placeholder/40/40"
    },
    {
      text: "Eleifend fames amet, fames enim. Ullamcorper pellentesque ac volutpat nibh aliquet et, ut netus. Vel, fringilla sit eros pretium felis massa mauris, aliquam congue.",
      author: "Cameron Williamson",
      role: "CEO",
      avatar: "/api/placeholder/40/40"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Pricing Section */}
      <section className="mb-32">
        <h2 className="text-4xl font-bold text-center mb-16">
          Choose your flexible plan.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.name}
              className="border rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">{plan.icon}</div>
              <h3 className="text-xl font-bold mb-6">{plan.name}</h3>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-8">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-gray-500">/year</span>
                <p className="text-sm text-gray-400 mt-1">up to 3 user + 1.99 per user</p>
              </div>
              <button 
                className={`flex items-center px-6 py-2 rounded-lg border
                  ${index === 1 ? 'bg-darkorange text-white' : 'text-darkorange border-darkorange hover:bg-coral-50'}`}
              >
                Get this
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-16">
          We have millions of best wishers
        </h2>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-6">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors
                ${currentSlide === index ? 'bg-darkorange' : 'bg-gray-300'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingAndTestimonials;