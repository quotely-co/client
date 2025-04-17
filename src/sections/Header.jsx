import { useState, useEffect, useRef } from 'react';
import Logo from "../assets/Logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

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
      if (
        isMenuOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(e.target) &&
        menuButtonRef.current && 
        !menuButtonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu on escape key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

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
    { name: 'For Factories', path: '/factory/onboarding' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 z-20 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/50 backdrop-blur-sm'
      }`}
    >
      <div className="py-3 md:py-4">
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
              ref={menuButtonRef}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:bg-gray-200 transition-colors"
              onClick={toggleMenu} 
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>

            {/* Navigation for desktop */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  className={`text-lg font-medium transition-colors relative ${
                    isActive(item.path) 
                      ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary' 
                      : 'text-black/70 hover:text-black'
                  }`} 
                  onClick={() => handleNavigation(item.path)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.name}
                </button>
              ))}
              
              {/* CTA Button */}
              <button 
                className="px-5 py-2 ml-2 bg-primary text-white rounded-lg font-medium 
                  transition-all hover:bg-primary/90 hover:shadow-md active:scale-95 focus:ring-2 focus:ring-primary/50 focus:outline-none" 
                onClick={() => handleNavigation('/register')}
              >
                Get for free
              </button>
            </nav>
          </div>

          {/* Mobile Navigation Menu */}
          <div 
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 origin-top ${
              isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'
            }`}
          >
            <nav className="flex flex-col py-2">
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  className={`px-4 py-3 text-left text-lg transition-colors flex items-center ${
                    isActive(item.path) 
                      ? 'bg-gray-100 text-primary font-medium' 
                      : 'text-black/70 hover:bg-gray-50'
                  }`} 
                  onClick={() => handleNavigation(item.path)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="ml-2 w-1 h-4 bg-primary rounded-full" />
                  )}
                </button>
              ))}
              
              <div className="px-4 py-3">
                <button 
                  className="w-full py-2.5 bg-primary text-white rounded-lg font-medium 
                    transition-all hover:bg-primary/90 active:scale-95 focus:ring-2 focus:ring-primary/50 focus:outline-none" 
                  onClick={() => handleNavigation('/register')}
                >
                  Get for free
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;