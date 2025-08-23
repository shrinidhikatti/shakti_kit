import React from 'react';
import { Star, Award, BookOpen } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

export const GuideSection: React.FC = () => {
   const handleOrderClick = () => {
  console.log('Order button clicked from mobile sticky button');

  // Open Razorpay link in a new tab
  window.open('https://rzp.io/rzp/CglMnpjr', '_blank', 'noopener,noreferrer');
};

  return (
    <AnimatedSection id="guide" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-4">
              Your Spiritual Guide
            </h3>
            <h4 className="text-2xl font-bold text-white mb-4">Shri V. M. Joshi</h4>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-white font-semibold">40+ Years Experience</p>
              <p className="text-gray-300 text-sm">Vedic Rituals Expert</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <Star className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-white font-semibold">10,000+ Lives</p>
              <p className="text-gray-300 text-sm">Transformed</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <BookOpen className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Ancient Wisdom</p>
              <p className="text-gray-300 text-sm">Modern Application</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-300 text-center leading-relaxed">
            "Every soul deserves to experience their true spiritual power. The Shakti Kit is my life's 
            work condensed into a simple, accessible format that anyone can use to transform their reality 
            through the divine feminine energy of Maa Durga."
          </p>

          {/* Section Order Button - Duplicate this structure for new sections */}
          <div className="text-center mt-8">
            <button onClick={handleOrderClick} className="section-order-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Shakti Kit
              </span>
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};