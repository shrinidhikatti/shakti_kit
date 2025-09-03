import React from 'react';
import { BookOpen, Sparkles, Users, Package } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const ritualFeatures = [
  { icon: BookOpen, text: 'Step-by-step guidebook included' },
  { icon: Sparkles, text: '9-minute Shakti Kriya meditation with QR code' },
  { icon: Users, text: 'Sacred altar setup for home connection' },
];

const differences = [
  { icon: Sparkles, text: 'Energy-activated & blessed' },
  { icon: Users, text: 'Designed for beginners & advanced seekers' },
  { icon: BookOpen, text: 'Combines Vedic ritual + meditation' },
  { icon: Package, text: 'Portable & reusable' },
];

export const RitualSection: React.FC = () => {
const handleOrderClick = () => {
  console.log('Order button clicked from mobile sticky button');

  // Open Razorpay link in a new tab
  window.open('https://pages.razorpay.com/stores/Udayantra', '_blank', 'noopener,noreferrer');
};

  return (
    <AnimatedSection id="ritual" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* The Ritual */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-6">
              The Ritual – Simple Yet Powerful
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              With our step-by-step guidebook and QR code for the 9-minute Shakti Kriya meditation, 
              you will perform a 9-day ritual that sets up a sacred altar at home and connects you to 
              Maa Durga's energy, leaving you spiritually recharged.
            </p>
            <div className="space-y-4">
              {ritualFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-200">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why It's Different */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-6">
              Why the Shakti Kit is Different
            </h3>
            <div className="space-y-6">
              {differences.map((difference, index) => {
                const Icon = difference.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="pt-2">
                      <span className="text-lg text-gray-200">{difference.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section Order Button - Duplicate this structure for new sections */}
        <div className="text-center mt-12">
          <button onClick={handleOrderClick} className="section-order-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden">
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