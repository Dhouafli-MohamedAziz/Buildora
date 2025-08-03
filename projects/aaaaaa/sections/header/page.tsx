'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Menu', href: '#menu' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">Restaurant</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-amber-500 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Button */}
          <div className="flex items-center space-x-4">
            <a 
              href="#reservation" 
              className="hidden md:flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              <Phone size={16} />
              <span>Réserver</span>
            </a>

            <button 
              className="md:hidden p-2 text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#reservation" 
                className="flex items-center justify-center space-x-2 bg-amber-500 text-white px-4 py-3 rounded-full mt-2"
              >
                <Phone size={16} />
                <span>Réserver une table</span>
              </a>
              <div className="flex items-center space-x-2 px-4 py-2 text-gray-600">
                <MapPin size={16} />
                <span>123 Rue Gourmande, Paris</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

export default function Header() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Your header content here */}
      </div>
    </section>
  );
}