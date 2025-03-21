import React, { useState, useEffect } from 'react';
import Logo from "../assets/logosaas.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('nav') && !e.target.closest('button')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'About', path: '/app/about' },
    { name: 'Features', path: '/app/features' },
    { name: 'Customers', path: '/app/customers' },
    { name: 'Updates', path: '/app/updates' },
    { name: 'For Factories', path: '/auth/factory/register', highlight: true },
  ];

  return (
    <header className={`sticky top-0 z-20 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white/50 backdrop-blur-sm'
    }`}>
      <div className="py-4 md:py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with hover effect */}
            <div 
              className="flex items-center cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleNavigation('/')}
            >
              <img 
                src={Logo} 
                alt="SaaS Logo" 
                height={45} 
                width={45} 
                className="object-contain"
              />
            </div>

            {/* Mobile menu toggle button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={toggleMenu} 
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Navigation for desktop */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path 
                      ? 'text-primary font-semibold' 
                      : item.highlight 
                        ? 'text-primary' 
                        : 'text-black/70 hover:text-black'
                  }`} 
                  onClick={() => handleNavigation(item.path)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </button>
              ))}
              
              {/* CTA Button */}
              <button 
                className="px-5 py-2 ml-2 bg-primary text-white rounded-lg font-medium 
                  transition-all hover:bg-primary/90 hover:shadow-md active:scale-95" 
                onClick={() => handleNavigation('/register')}
              >
                Get for free
              </button>
            </nav>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
              <nav className="flex flex-col py-2">
                {navItems.map((item) => (
                  <button 
                    key={item.name}
                    className={`px-4 py-3 text-left text-lg transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-gray-100 text-primary font-medium' 
                        : item.highlight 
                          ? 'text-primary' 
                          : 'text-black/70'
                    } hover:bg-gray-50`} 
                    onClick={() => handleNavigation(item.path)}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="px-4 py-3">
                  <button 
                    className="w-full py-2.5 bg-primary text-white rounded-lg font-medium 
                      transition-all hover:bg-primary/90 active:scale-95" 
                    onClick={() => handleNavigation('/register')}
                  >
                    Get for free
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;