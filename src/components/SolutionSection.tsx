import React, { useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import "./ProblemSection.css"

const journeyDays = [
  { day: 1, title: 'Shodhana (Purification)', focus: 'Cleansing of aura and release of tamas' },
  { day: 2, title: 'Stambhana (Centering the Mind)', focus: 'Breath anchoring and mental stillness' },
  { day: 3, title: 'Prerana (Divine Inspiration)', focus: 'Awakening inner strength and grace' },
  { day: 4, title: 'Udgama (Energy Rising)', focus: 'Spine-based energy rise (Shakti udaya)' },
  { day: 5, title: 'Vishuddhi (Emotional Purification)', focus: 'Heart & throat chakra healing' },
  { day: 6, title: 'Dhairya (Inner Courage)', focus: 'Activating solar plexus and confidence' },
  { day: 7, title: 'Maunagati (Silence in Motion)', focus: 'Entering deep inner silence through still breath' },
  { day: 8, title: 'Samarpana (Total Surrender)', focus: 'Letting go & full devotion' },
  { day: 9, title: 'Jagriti (Awakening)', focus: 'Crown chakra opening, divine bliss' },
];

export const SolutionSection: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When video section is visible → try to unmute
            iframe.contentWindow?.postMessage(
              '{"event":"command","func":"unMute","args":""}',
              '*'
            );
          }
        });
      },
      { threshold: 0.5 } // 50% visible
    );

    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  const handleOrderClick = () => {
    window.open('https://rzp.io/rzp/shaktikit', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatedSection id="solution" className="py-12 sm:py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 sm:mb-8">
            The Solution: A{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              9-Day Guided Spiritual Journey
            </span>
          </h2>

          <div className="video-container mb-12">
            <iframe
              src="https://www.youtube.com/embed/hyQGKr2SOj0?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>


          <p className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-3xl sm:max-w-4xl mx-auto mb-4">
            We created the Shakti Kit for those who seek transformation through the ancient power 
            of Vedic rituals and spiritual alignment.
          </p>
          <p className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-3xl sm:max-w-4xl mx-auto">
            This isn't just a product… It's a journey designed to cleanse negativity, awaken your 
            inner strength, and align you with the energies of prosperity, health, and peace.
          </p>
        </div>

        <div className="text-center mb-12">
          <button
            onClick={handleOrderClick}
            className="section-order-button group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Shakti Kit
            </span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {journeyDays.map((day, index) => (
            <div
              key={day.day}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 flex flex-col items-center w-full sm:w-[280px] max-w-[90%] transition-all duration-500 hover:bg-white/10 hover:scale-105 cursor-pointer"
              style={{ transformOrigin: 'center', animationDelay: `${index * 100}ms` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'perspective(1000px) rotateY(10deg) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'perspective(1000px) rotateY(0deg) scale(1)';
              }}
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-lg sm:text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {day.day}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-2">
                  {day.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold">Focus:</span> {day.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
