
import React from 'react';
import { Shield, Zap, DollarSign, Heart, Flower, Star, Home, Moon } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

// Array of benefits - update this to change the text or icons
const benefits = [
  { icon: Shield, text: 'Removes Negative Blocks & Negativity' },
  { icon: Zap, text: 'Awakens Inner Power, Energy & Confidence' },
  { icon: DollarSign, text: 'Attracts Prosperity & Opportunities' },
  { icon: Heart, text: 'Brings Peace, Harmony, Clarity & Calmness' },
  { icon: Flower, text: 'Balances 5 Elements & Chakras' },
  { icon: Star, text: 'Boosts Spiritual Immunity' },
  { icon: Moon, text: 'Improves Relationships & Sleep Quality' },
  { icon: Home, text: 'Creates a Sacred Aura at Home' },
];

export const BenefitsSection: React.FC = () => {
   const handleOrderClick = () => {
  console.log('Order button clicked from mobile sticky button');

  // Open Razorpay link in a new tab
  window.open('https://pages.razorpay.com/stores/Udayantra', '_blank', 'noopener,noreferrer');
};



  return (
    <AnimatedSection id="benefits" className="py-12 sm:py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-6 sm:mb-8">
            How This Kit Will Transform Your Life
          </h2>
        </div>

        {/* Responsive grid for cards - centered, fixed size, and content-fitted */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 flex flex-col items-center w-full sm:w-[280px] max-w-[90%] transition-all duration-500 hover:bg-white/10 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  {/* Icon container */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  {/* Text - fits content without extra gaps */}
                  <p className="text-gray-200 text-base sm:text-lg font-medium leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Order Button - Duplicate this structure for new sections */}
        <div className="text-center mt-12">
          <button  onClick={handleOrderClick} className="section-order-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Shakti Kit
            </span>
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};