import React from 'react';
import { ShoppingCart } from 'lucide-react';

/* Mobile Sticky Order Button Component */
/* Fixed at bottom center with a red-to-black gradient background */
/* On click, redirects to Razorpay payment page */

export const MobileStickyOrder: React.FC = () => {
  const handleOrderClick = () => {
  console.log('Order button clicked from mobile sticky button');

  // Open Razorpay link in a new tab
  window.open('https://pages.razorpay.com/stores/Udayantra', '_blank', 'noopener,noreferrer');
};


  return (
    <div
      className="fixed bottom-0 left-0 w-full md:hidden z-50 flex justify-center items-center shadow-lg"
      style={{
        background: 'linear-gradient(to right, #8B0000, #1C1C1C)', // Red-to-black gradient
        padding: '0.5rem 1rem', // Smaller height for compact design
      }}
    >
      <button
        onClick={handleOrderClick}
        className="w-full max-w-[220px] bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl relative overflow-hidden group"
        style={{
          transform: 'perspective(1000px) rotateX(0deg)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform =
            'perspective(1000px) rotateX(5deg) translateY(2px)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform =
            'perspective(1000px) rotateX(0deg) translateY(0px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            'perspective(1000px) rotateX(0deg) translateY(0px)';
        }}
      >
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        <span className="relative z-10 flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 mr-1" />
          Order Shakti Kit
        </span>
      </button>
    </div>
  );
};
