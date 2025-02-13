import React, { useState } from 'react';
import Logo from "../assets/logosaas.png";
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';  // Importing Lucide icons

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu after navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle the menu visibility for mobile
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm shadow-md">
      <div className="py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <img src={Logo} alt="logo" height={40} width={40} />
            {/* Mobile menu icon */}
            <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}  {/* Using Lucide icons */}
            </button>
            {/* Navigation links */}
            <nav
              className={`${
                isMenuOpen ? 'flex flex-col' : 'hidden'
              } md:flex items-center gap-6 text-black/60 md:flex-row`}
            >
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/app/about')}>About</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/app/features')}>Features</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/app/customers')}>Customers</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/app/updates')}>Updates</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/auth/factory/register')}>For Factories</button>
              {/* Navigating to /register on click */}
              <button 
                className="btn btn-primary mt-4 md:mt-0" 
                onClick={() => handleNavigation('/auth/register')}  // Updated to navigate to register page
              >
                Get for free
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;