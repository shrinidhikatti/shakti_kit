import React, { useState, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

// Array of reviews - defines review text, rating, and reviewer name
const reviews = [
  {
    text: 'At first, I didn’t expect much, but honestly this kit surprised me. I feel calmer during the day.',
    rating: '⭐⭐⭐⭐⭐',
    name: 'Ankita Sharma',
  },
  {
    text: 'The guided meditation is my favorite part. After work, it really helps me switch off.',
    rating: '⭐⭐⭐⭐☆',
    name: 'Rahul Deshmukh',
  },
  {
    text: 'Simple to use, but very powerful. Lighting the lamp has become part of my daily routine now.',
    rating: '⭐⭐⭐⭐⭐',
    name: 'Sneha Iyer',
  },
  {
    text: 'I usually get anxious easily, but since using this kit I feel a lot more balanced.',
    rating: '⭐⭐⭐⭐☆',
    name: 'Kiran Mehta',
  },
  {
    text: 'Everything inside feels well thought out. Mala, bracelet, and meditation tracks all go together nicely.',
    rating: '⭐⭐⭐⭐⭐',
    name: 'Priya Nair',
  },
];

export const ReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle click to pause carousel for 2 seconds
  const handleCardClick = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 2000); // Resume after 2 seconds
  };

  // Handle order button click to open Razorpay link
  const handleOrderClick = () => {
    console.log('Order button clicked from ReviewsSection');
    window.open('https://rzp.io/rzp/shaktikit', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatedSection id="reviews" className="relative z-10 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <h2 className="text-[33px] sm:text-[39.6px] md:text-[52.8px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-8 sm:mb-12">
          What Our Users Say
        </h2>

        {/* Carousel container */}
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            className={`flex transition-transform duration-[85710ms] ease-linear ${
              isPaused ? 'animate-none' : 'animate-[carousel_85.71s_linear_infinite]'
            }`}
            style={{
              display: 'flex',
              width: `${reviews.length * 400}%`, // Quadruple width for seamless looping
            }}
          >
            {reviews.concat(reviews, reviews, reviews).map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3"
                style={{ minWidth: '187.5px', maxWidth: '375px' }} // 25% larger than original 150px
                onClick={handleCardClick}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 h-full flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-pointer border-none">
                  <div className="text-center">
                    <p className="text-gray-300 text-[13.2px] sm:text-[15.4px] mb-2">{review.text}</p>
                    <p className="text-yellow-300 text-[13.2px] sm:text-[15.4px] mb-2">{review.rating}</p>
                    <h3 className="text-[17.6px] sm:text-[19.8px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                      {review.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Order Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={handleOrderClick}
            className="section-order-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[17.6px] sm:text-[19.8px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Order Shakti Kit
            </span>
          </button>
        </div>
      </div>

      {/* CSS for carousel animation */}
      <style jsx>{`
        /* Adjust the duration (in milliseconds) to control carousel speed: increase to slow down, decrease to speed up */
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-15%);
          }
        }
      `}</style>
    </AnimatedSection>
  );
};