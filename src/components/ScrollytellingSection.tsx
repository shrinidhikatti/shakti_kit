// import React, { useState, useEffect, useRef } from 'react';
// import { ShoppingCart } from 'lucide-react';
// import {
//   Package,
//   Flame,
//   Star,
//   Droplets,
//   Headset as Beads,
//   Heading as Thread,
//   Shield,
//   Dot,
//   Wind,
//   Circle,
//   Sparkles,
// } from 'lucide-react';

// // Array of kit items - update this to change images, names, descriptions, and other details
// const kitItems = [
//   {
//     name: 'Trinetra Deepa',
//     description: 'Light this lamp, and light up your destiny.',
//     icon: Star, // ✨
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Trinetri%20Deepa%20(1).jpg',
//     spiritualBenefit: 'Enhances intuition and spiritual sight',
//     usage: 'Light during morning meditation for 9 minutes daily',
//   },
//   {
//     name: 'Durga Yantra',
//     description: 'A handwritten yantra… your shield of divine power.',
//     icon: Circle, // 🕉
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Durga%20Yantra.jpg',
//     spiritualBenefit: 'Provides divine protection and removes obstacles',
//     usage: 'Place at the center of your altar as the focal point',
//   },
//   {
//     name: 'Navagraha Oil',
//     description: 'One drop, nine planets, endless harmony.',
//     icon: Droplets, // 🌌
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Navagraha%20Oil.jpg',
//     spiritualBenefit: 'Balances planetary doshas and enhances luck',
//     usage: 'Apply a small amount to your forehead and palms before ritual',
//   },
//   {
//     name: 'Vaijayanti Mala',
//     description: 'Chant your way to victory & divine grace.',
//     icon: Beads, // 📿
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Vaijayanti%20Mala.jpg',
//     spiritualBenefit: 'Amplifies mantra power and maintains spiritual focus',
//     usage: 'Use for daily Durga mantra chanting (108 repetitions)',
//   },
//   {
//     name: 'Hakik Bracelet (7 Chakra)',
//     description: 'Balance your chakras, balance your life.',
//     icon: Shield, // 🌈
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Hakik%20Bracelet.jpg',
//     spiritualBenefit: 'Provides emotional stability and mental clarity',
//     usage: 'Wear on left wrist throughout the 9-day journey',
//   },
//   {
//     name: 'Gomati Chakra',
//     description: 'The cosmic coin of prosperity & protection.',
//     icon: Circle, // 💫
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Gomati%20Chakra.jpg',
//     spiritualBenefit: 'Provides psychic protection and spiritual grounding',
//     usage: 'Hold in palm during meditation or place near your altar',
//   },
//   {
//     name: 'Sankalpa Thread',
//     description: 'Tie your dreams, unlock your destiny.',
//     icon: Thread, // 🔴
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Sacred%20thread.png',
//     spiritualBenefit: 'Manifests desires and strengthens willpower',
//     usage: 'Tie around right wrist while stating your intention clearly',
//   },
//   {
//     name: 'Red Velvet Cloth',
//     description: 'A sacred throne for your divine rituals.',
//     icon: Package, // 🪔
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Red%20Velvet%20Cloth.jpg',
//     spiritualBenefit: 'Creates sacred boundary and amplifies ritual energy',
//     usage: 'Spread as base cloth for your altar setup',
//   },
//   {
//     name: 'Chandan Tilak',
//     description: 'One touch to calm your mind & uplift your aura.',
//     icon: Dot, // 🌿
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Chandana.jpg',
//     spiritualBenefit: 'Calms mind and enhances spiritual concentration',
//     usage: 'Apply on forehead, throat, and heart chakra points daily',
//   },
//   {
//     name: 'Dhoopa',
//     description: 'Fragrance that cleanses negativity & awakens energy.',
//     icon: Wind, // 🔥
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Dhoopa.png',
//     spiritualBenefit: 'Purifies environment and elevates consciousness',
//     usage: "Light one stick before beginning each day's ritual",
//   },
//   {
//     name: 'Shakti Kriya Meditation',
//     description: '9 minutes. Infinite transformation.',
//     icon: Sparkles, // 🧘
//     image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Shakti%20Kit%20(1).jpg',
//     spiritualBenefit: 'Awakens inner energy and promotes spiritual growth',
//     usage: 'Practice daily for 9 minutes during the journey',
//   },
// ];

// export const ScrollytellingSection: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [rotation, setRotation] = useState(0);
//   const [currentImage, setCurrentImage] = useState(kitItems[0].image);
//   const [nextImage, setNextImage] = useState(kitItems[0].image);
//   const [isFading, setIsFading] = useState(false);

//   // Refs for right-side cards
//   const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
//   itemRefs.current = [];
//   const setItemRef = (el: HTMLDivElement | null, idx: number) => {
//     itemRefs.current[idx] = el;
//   };

//   // Ref for the scrollable right container
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;
//     const cards = itemRefs.current.filter(Boolean) as HTMLDivElement[];
//     if (!cards.length) return;

//     let rafId: number | null = null;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (!entries.length) return;
//         // Choose the entry with the highest visible ratio
//         const topEntry = entries.reduce<IntersectionObserverEntry | null>((max, e) => {
//           if (!max) return e;
//           return e.intersectionRatio > max.intersectionRatio ? e : max;
//         }, null);
//         if (!topEntry) return;
//         const idxAttr = (topEntry.target as HTMLElement).dataset.index;
//         const idx = idxAttr ? parseInt(idxAttr, 10) : 0;

//         // Avoid thrashing state; schedule in rAF
//         if (rafId) cancelAnimationFrame(rafId);
//         rafId = requestAnimationFrame(() => {
//           setActiveIndex((prev) => {
//             if (prev !== idx) {
//               // Start fade transition
//               setIsFading(true);
//               setNextImage(kitItems[idx].image);
//               setTimeout(() => {
//                 setCurrentImage(kitItems[idx].image);
//                 setIsFading(false);
//               }, 500); // Match CSS transition duration
//               return idx;
//             }
//             return prev;
//           });
//           const progress = idx / Math.max(1, kitItems.length - 1);
//           setRotation(progress * 360);
//         });
//       },
//       {
//         root: scrollContainer,
//         rootMargin: '-10% 0px -10% 0px', // Tighter margin for precise snapping
//         threshold: [0, 0.5, 1], // Focus on full visibility
//       }
//     );

//     cards.forEach((el) => observer.observe(el));

//     // Fallback: on scroll, pick the card closest to container center
//     const fallbackHandler = () => {
//       if (!scrollContainer) return;
//       const containerRect = scrollContainer.getBoundingClientRect();
//       const viewportCenter = containerRect.top + containerRect.height / 2;
//       let bestIdx = 0;
//       let bestDist = Number.POSITIVE_INFINITY;
//       cards.forEach((el, i) => {
//         const rect = el.getBoundingClientRect();
//         const cardCenter = rect.top + rect.height / 2;
//         const dist = Math.abs(cardCenter - viewportCenter);
//         if (dist < bestDist) {
//           bestDist = dist;
//           bestIdx = i;
//         }
//       });
//       setActiveIndex((prev) => {
//         if (prev !== bestIdx) {
//           // Start fade transition
//           setIsFading(true);
//           setNextImage(kitItems[bestIdx].image);
//           setTimeout(() => {
//             setCurrentImage(kitItems[bestIdx].image);
//             setIsFading(false);
//           }, 500); // Match CSS transition duration
//           return bestIdx;
//         }
//         return prev;
//       });
//       const progress = bestIdx / Math.max(1, kitItems.length - 1);
//       setRotation(progress * 360);
//     };

//     scrollContainer.addEventListener('scroll', fallbackHandler, { passive: true });

//     return () => {
//       if (rafId) cancelAnimationFrame(rafId);
//       observer.disconnect();
//       scrollContainer.removeEventListener('scroll', fallbackHandler);
//     };
//   }, []);

//   const currentItem = kitItems[activeIndex];

//   // Circle size configuration - adjust this value to change the left circle size
//   const circleSize = 'w-44 h-44 sm:w-60 sm:h-60 lg:w-[20rem] lg:h-[20rem]';

//   const handleOrderClick = () => {
//     console.log('Order button clicked from mobile sticky button');
//     // Open Razorpay link in a new tab
//     window.open('https://pages.razorpay.com/stores/Udayantra', '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <section id="kit-contents" className="relative z-10 py-8 sm:py-12">
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Section heading */}
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-8 sm:mb-12">
//           What&apos;s Inside the Shakti Kit
//         </h2>
//         <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto gap-6 sm:gap-8">
//           {/* Left: Preview card with image and text below */}
//           <div className="w-full max-w-[90%] sm:max-w-[80%] lg:w-1/2 flex flex-col items-center">
//             <div className="mb-4 sm:mb-6">
//               <div className={`relative mx-auto ${circleSize}`}>
//                 {/* Background circle with rotation */}
//                 <div
//                   className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full backdrop-blur-sm transition-transform duration-700 ease-out border-2 border-orange-400/30"
//                   style={{
//                     transform: `rotate(${rotation}deg)`,
//                     transformOrigin: 'center',
//                   }}
//                 />
//                 {/* Bright golden color animation in the background */}
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-300/20 blur-xl animate-pulse" />
//                 {/* Image container for cross-fade transition */}
//                 <div className="absolute inset-0 p-2">
//                   <img
//                     src={currentImage}
//                     alt={currentItem.name}
//                     className={`w-full h-full object-contain rounded-full transition-opacity duration-500 ease-in-out ${
//                       isFading ? 'opacity-0' : 'opacity-100'
//                     }`}
//                     loading="lazy"
//                   />
//                   <img
//                     src={nextImage}
//                     alt={currentItem.name}
//                     className={`w-full h-full object-contain rounded-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
//                       isFading ? 'opacity-100' : 'opacity-0'
//                     }`}
//                     loading="lazy"
//                   />
//                 </div>
//               </div>
//               {/* Text below the circle */}
//               <div className="text-center mt-3 sm:mt-4">
//                 <h3 className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-1 transition-all duration-500">
//                   {currentItem.name}
//                 </h3>
//                 <p className="text-gray-200 text-xs sm:text-sm md:text-base transition-all duration-500">
//                   {currentItem.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* Right: Scrollable content cards - height matches left side, one card visible */}
//           <div
//             ref={scrollRef}
//             className="w-full max-w-[90%] sm:max-w-[80%] lg:w-1/2 overflow-y-auto max-h-[240px] sm:max-h-[320px] lg:max-h-[360px] snap-y snap-mandatory scrollbar-thin scrollbar-thumb-orange-400/50 scrollbar-track-gray-800/50"
//           >
//             <div className="space-y-4 pr-4">
//               {kitItems.map((item, index) => {
//                 const Icon = item.icon;
//                 const isActive = index === activeIndex; // Exact active card drives the left preview
//                 return (
//                   <div
//                     key={index}
//                     ref={(el) => setItemRef(el, index)}
//                     data-index={index}
//                     className={`p-3 sm:p-4 rounded-xl transition-all duration-700 min-h-[100px] sm:min-h-[120px] snap-center ${
//                       isActive
//                         ? 'bg-white/10 backdrop-blur-sm scale-100 opacity-100 border border-orange-400/30 shadow-xl'
//                         : 'bg-white/5 scale-95 opacity-60 border border-white/10 filter blur-md'
//                     }`}
//                     style={{
//                       transform: isActive ? 'scale(1)' : 'scale(0.97)',
//                       transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.7s ease',
//                     }}
//                   >
//                     <div className="flex items-start space-x-2 sm:space-x-3 mb-3">
//                       <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
//                         <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-1">
//                           {item.name}
//                         </h3>
//                         <p className="text-gray-300 text-xs sm:text-sm">{item.description}</p>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="bg-white/5 rounded-lg p-2 border border-white/10">
//                         <h5 className="text-xs sm:text-sm font-semibold text-yellow-300 mb-1">Spiritual Benefit:</h5>
//                         <p className="text-gray-300 text-xs">{item.spiritualBenefit}</p>
//                       </div>
//                       <div className="bg-white/5 rounded-lg p-2 border border-white/10">
//                         <h5 className="text-xs sm:text-sm font-semibold text-yellow-300 mb-1">How to Use:</h5>
//                         <p className="text-gray-300 text-xs">{item.usage}</p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//           {/* End Right */}
//         </div>
//         {/* Section Order Button */}
//         <div className="text-center mt-6 sm:mt-8">
//           <button
//             onClick={handleOrderClick}
//             className="section-order-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden"
//           >
//             <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <span className="relative z-10 flex items-center">
//               <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
//               Order Shakti Kit
//             </span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import {
  Package,
  Star,
  Droplets,
  Headset as Beads,
  Heading as Thread,
  Shield,
  Dot,
  Wind,
  Circle,
  Sparkles,
} from 'lucide-react';

// Array of kit items - defines images, names, descriptions, and other details
const kitItems = [
  {
    name: 'Trinetra Deepa',
    description: 'Light this lamp, and light up your destiny.',
    icon: Star,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Trinetri%20Deepa%20(1).jpg',
    spiritualBenefit: 'Enhances intuition and spiritual sight',
    usage: 'Light during morning meditation for 9 minutes daily',
  },
  {
    name: 'Durga Yantra',
    description: 'A handwritten yantra… your shield of divine power.',
    icon: Circle,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Durga%20Yantra.jpg',
    spiritualBenefit: 'Provides divine protection and removes obstacles',
    usage: 'Place at the center of your altar as the focal point',
  },
  {
    name: 'Navagraha Oil',
    description: 'One drop, nine planets, endless harmony.',
    icon: Droplets,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Navagraha%20Oil.jpg',
    spiritualBenefit: 'Balances planetary doshas and enhances luck',
    usage: 'Apply a small amount to your forehead and palms before ritual',
  },
  {
    name: 'Vaijayanti Mala',
    description: 'Chant your way to victory & divine grace.',
    icon: Beads,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Vaijayanti%20Mala.jpg',
    spiritualBenefit: 'Amplifies mantra power and maintains spiritual focus',
    usage: 'Use for daily Durga mantra chanting (108 repetitions)',
  },
  {
    name: 'Hakik Bracelet (7 Chakra)',
    description: 'Balance your chakras, balance your life.',
    icon: Shield,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Hakik%20Bracelet.jpg',
    spiritualBenefit: 'Provides emotional stability and mental clarity',
    usage: 'Wear on left wrist throughout the 9-day journey',
  },
  {
    name: 'Gomati Chakra',
    description: 'The cosmic coin of prosperity & protection.',
    icon: Circle,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Gomati%20Chakra.jpg',
    spiritualBenefit: 'Provides psychic protection and spiritual grounding',
    usage: 'Hold in palm during meditation or place near your altar',
  },
  {
    name: 'Sankalpa Thread',
    description: 'Tie your dreams, unlock your destiny.',
    icon: Thread,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Sacred%20thread.png',
    spiritualBenefit: 'Manifests desires and strengthens willpower',
    usage: 'Tie around right wrist while stating your intention clearly',
  },
  {
    name: 'Red Velvet Cloth',
    description: 'A sacred throne for your divine rituals.',
    icon: Package,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Red%20Velvet%20Cloth.jpg',
    spiritualBenefit: 'Creates sacred boundary and amplifies ritual energy',
    usage: 'Spread as base cloth for your altar setup',
  },
  {
    name: 'Chandan Tilak',
    description: 'One touch to calm your mind & uplift your aura.',
    icon: Dot,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Chandana.jpg',
    spiritualBenefit: 'Calms mind and enhances spiritual concentration',
    usage: 'Apply on forehead, throat, and heart chakra points daily',
  },
  {
    name: 'Dhoopa',
    description: 'Fragrance that cleanses negativity & awakens energy.',
    icon: Wind,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Dhoopa.png',
    spiritualBenefit: 'Purifies environment and elevates consciousness',
    usage: "Light one stick before beginning each day's ritual",
  },
  {
    name: 'Shakti Kriya Meditation',
    description: '9 minutes. Infinite transformation.',
    icon: Sparkles,
    image: 'https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Shakti%20Kit%20(1).jpg',
    spiritualBenefit: 'Awakens inner energy and promotes spiritual growth',
    usage: 'Practice daily for 9 minutes during the journey',
  },
];

export const ScrollytellingSection: React.FC = () => {
  // Circle size configuration - adjust this value to change the image circle size
  const circleSize = 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48';

  // Handle order button click to open Razorpay link
  const handleOrderClick = () => {
    console.log('Order button clicked from ScrollytellingSection');
    window.open('https://rzp.io/rzp/shaktikit', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kit-contents" className="relative z-10 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section heading */}
        {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-8 sm:mb-12">
          What&apos;s Inside the Shakti Kit
        </h2> */}

        {/* Grid of kit items - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto justify-items-center">
          {kitItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 w-full max-w-[280px] transition-all duration-500 hover:bg-white/10 hover:scale-105"
                style={{
                  transformOrigin: 'center',
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex flex-col items-center">
                  {/* Image container */}
                  <div className={`relative ${circleSize}`}>
                    {/* Background circle */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full backdrop-blur-sm border-2 border-orange-400/30" />
                    {/* Golden animation background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-300/20 blur-xl animate-pulse" />
                    {/* Item image */}
                    <div className="absolute inset-0 p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {/* Text content */}
                  <div className="text-center mt-3 sm:mt-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">{item.description}</p>
                    <div className="space-y-2">
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <h5 className="text-xs sm:text-sm font-semibold text-yellow-300 mb-1">Spiritual Benefit:</h5>
                        <p className="text-gray-300 text-xs">{item.spiritualBenefit}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <h5 className="text-xs sm:text-sm font-semibold text-yellow-300 mb-1">How to Use:</h5>
                        <p className="text-gray-300 text-xs">{item.usage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Order Button */}
        <div className="text-center mt-6 sm:mt-8">
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
    </section>
  );
};