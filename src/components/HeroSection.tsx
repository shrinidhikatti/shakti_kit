import React from 'react';
import { Sparkles, Star } from 'lucide-react';

// Image URL for the hero section
const heroImage = 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Shakti%20kit.png';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-6 sm:pt-4 md:pt-6 lg:pt-12"
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Floating image with expand/de-expand animation */}
        <div className="animate-float">
          <div className="relative inline-block">
            {/* Responsive image container - automatically scales */}
            <div className="mx-auto mb-0 relative max-h-[70vh] w-full flex justify-center">
              {/* Background glow with pulsing effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl animate-pulse"></div>
              
              {/* Hero image - fully responsive, no cropping */}
              <img
                src={heroImage}
                alt="Sacred Shakti Symbol"
                className="max-h-[70vh] w-auto object-contain relative z-10"
                loading="lazy"
              />

              {/* Sparkles overlay with slow spin animation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-300 animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          The{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
            Sacred
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
            Shakti Kit
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Transform Your Life in 9 Days Through Ancient Vedic Rituals
        </p>

        {/* Stars on one line, text below */}
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="flex space-x-2 text-yellow-300 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            ))}
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">
            Spiritual Transformation Guaranteed
          </span>
        </div>
      </div>
    </section>
  );
};
