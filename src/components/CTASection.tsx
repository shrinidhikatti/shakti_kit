// import React from 'react';
// import { ShoppingCart, Sparkles } from 'lucide-react';
// import { AnimatedSection } from './AnimatedSection';

// export const CTASection: React.FC = () => {
//   // Handle Order Button click
//   const handleOrderClick = () => {
//   console.log('Order button clicked from mobile sticky button');

//   // Open Razorpay link in a new tab
//   window.open('https://pages.razorpay.com/stores/Udayantra', '_blank', 'noopener,noreferrer');
// };

//   return (
//     <AnimatedSection id="cta" className="py-20 relative z-10">
//       <div className="container mx-auto px-6">
//         <div className="text-center max-w-4xl mx-auto">
//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
//               Take the First Step
//             </span>{' '}
//             Today
//           </h2>
          
//           <p className="text-xl md:text-2xl text-gray-300 mb-6">
//             Your transformation is just 9 days away.
//           </p>
          
//           <p className="text-xl md:text-2xl text-gray-300 mb-8">
//             Bring home the Shakti Kit and begin your journey towards prosperity, peace, 
//             protection, and power.
//           </p>
          
//           <div className="mb-8">
//             <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-bold animate-pulse">
//               <Sparkles className="inline w-6 h-6 mr-2" />
//               Order Now – Limited Energized Kits Available This Navratri
//               <Sparkles className="inline w-6 h-6 ml-2" />
//             </p>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button 
//               onClick={handleOrderClick}  // Redirects to payment page
//               className="section-order-button cta-section-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden"
//               style={{
//                 transform: 'perspective(1000px) rotateX(0deg)',
//                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//               }}
//               onMouseDown={(e) => {
//                 e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) translateY(2px)';
//               }}
//               onMouseUp={(e) => {
//                 e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
//               }}
//             >
//               {/* Hover overlay effect */}
//               <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <span className="relative z-10 flex items-center">
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 Order Shakti Kit
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </AnimatedSection>
//   );
// };

import React, { useState } from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { PaymentModal } from './PaymentModal';
import "./ProblemSection.css";

export const CTASection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Order Button click
  const handleOrderClick = () => {
    console.log('Order button clicked from CTA section');
    setIsModalOpen(true);
  };

  // Unmute video when section is visible
  // useEffect(() => {
  //   const iframe = iframeRef.current;
  //   if (!iframe) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           // When video section is visible → try to unmute
  //           iframe.contentWindow?.postMessage(
  //             '{"event":"command","func":"unMute","args":""}',
  //             '*'
  //           );
  //         }
  //       });
  //     },
  //     { threshold: 0.5 } // 50% visible
  //   );

  //   observer.observe(iframe);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <AnimatedSection id="cta" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Take the First Step
            </span>{' '}
            Today
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Your transformation is just 9 days away.
          </p>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Bring home the Shakti Kit and begin your journey towards prosperity, peace, 
            protection, and power.
          </p>
          
          {/* Video section */}
          {/* <div className="video-container mb-12">
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/cPDb9zJGI5E?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div> */}
          
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-bold animate-pulse">
              <Sparkles className="inline w-6 h-6 mr-2" />
              Order Now – Limited Energized Kits Available This Navratri
              <Sparkles className="inline w-6 h-6 ml-2" />
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleOrderClick}  // Redirects to payment page
              className="section-order-button cta-section-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden"
              style={{
                transform: 'perspective(1000px) rotateX(0deg)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) translateY(2px)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px)';
              }}
            >
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Shakti Kit
              </span>
            </button>
          </div>

          {/* Footer line with hyperlink */}
          <p className="text-xs sm:text-sm text-gray-300 text-center mt-16">
            Design & Developed by{' '}
            <a
              href="https://www.udayantra.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 hover:underline"
            >
              Uday Kiran Palepu
            </a>
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AnimatedSection>
  );
};