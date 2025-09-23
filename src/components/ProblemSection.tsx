import React from 'react';
import { CloudRain, DollarSign, Heart, Brain, Target, Zap } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

// Array of problems - update this to change the text or icons
const problems = [
  { icon: Target, text: "Opportunities slipping away just when they're within reach" },
  { icon: Brain, text: 'Constant stress, anxiety, or lack of focus' },
  { icon: Heart, text: 'Frequent misunderstandings with loved ones' },
  { icon: DollarSign, text: 'Financial struggles despite hard work' },
  { icon: Zap, text: 'Lack of spiritual connection' },
];

export const ProblemSection: React.FC = () => {
  const handleOrderClick = () => {
    console.log('Order button clicked from mobile sticky button');

    // Open Razorpay link in a new tab
    window.open('https://pages.razorpay.com/stores/shakti-kit', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatedSection 
      id="problem" 
      className="pt-3 pb-8 sm:pt-4 sm:pb-12 md:pt-6 md:pb-16 lg:pt-20 lg:pb-20 relative z-10"
      // 👆 Reduced top padding for xs/sm/md (50–40% smaller), 
      // kept full space for lg screens
    >
      <div className="container mx-auto px-4 sm:px-4">
        {/* Section heading and description */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
            When life feels heavy, and nothing seems to work,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              there is a reason… and there is a way.
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-2xl text-gray-300 max-w-3xl sm:max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12">
            Every day, countless people wake up feeling stuck... It's not that you lack effort… 
            it's that unseen energies around you are blocking your path.
          </p>
        </div>

        {/* Subheading */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
            Real Life Problems
          </h3>
        </div>

        {/* Responsive grid for cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex items-center w-full sm:w-[320px] max-w-[90%] transition-all duration-300 hover:bg-white/10 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                  {/* Icon container */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  {/* Text */}
                  <p className="text-gray-200 text-sm sm:text-lg leading-relaxed flex-grow">
                    {problem.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Order Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <button 
            onClick={handleOrderClick} 
            className="section-order-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Order Shakti Kit
            </span>
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};
