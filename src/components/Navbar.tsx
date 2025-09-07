import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Navigation items - update this to change the sections and labels (ensure id matches section IDs in the DOM)
const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'problem', label: 'The Problem' },
  { id: 'kit-contents', label: 'Sacred Tools' },
  { id: 'solution', label: '9-Day Journey' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'ritual', label: 'The Ritual' },
  { id: 'guide', label: 'Your Guide' },
  { id: 'reviews', label: 'Reviews' }, // Updated to point to reviews section
  { id: 'cta', label: 'Order Now' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://raw.githubusercontent.com/uday-kiran-palepu/Website-Images/refs/heads/main/Shakti-kit%20-Compressed/Shri%20V%20M%20Joshi%20Logo%20.png"
              alt="Shakti Kit Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Shakti Kit
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-orange-400 ${
                  activeSection === item.id
                    ? 'text-orange-400 border-b-2 border-orange-400 pb-1'
                    : 'text-white hover:scale-105'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-orange-400 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-transparent backdrop-blur-md border-t border-white/10">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/10 rounded ${
                    activeSection === item.id
                      ? 'text-orange-400 bg-white/5'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};