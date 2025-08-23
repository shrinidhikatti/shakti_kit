import React, { useRef, useEffect, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 transform translate-y-0 rotateY-0'
          : 'opacity-0 transform translate-y-8 rotateY-15'
      } ${className}`}
      style={{
        transform: isVisible 
          ? 'perspective(1000px) rotateY(0deg) translateY(0px)' 
          : 'perspective(1000px) rotateY(-15deg) translateY(32px)',
      }}
    >
      {children}
    </div>
  );
};