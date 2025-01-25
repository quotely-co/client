import React, { useState } from 'react';
import Logo from "../assets/logosaas.png";
import { useNavigate } from 'react-router-dom';
import MenuIcon from "../assets/menu.svg";  // Assuming this is the icon for the mobile menu
import ArrowRight from "../assets/arrow-right.svg";  // Assuming this is for an arrow icon or any other icon

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle the menu visibility for mobile
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <img src={Logo} alt="logo" height={40} width={40} />
            {/* Mobile menu icon */}
            <button className="md:hidden" onClick={toggleMenu}>
              <img src={MenuIcon} alt="Menu Icon" className="h-5 w-5" />
            </button>
            {/* Navigation links */}
            <nav
              className={`${
                isMenuOpen ? 'flex flex-col' : 'hidden'
              } md:flex items-center gap-6 text-black/60 md:flex-row`}
            >
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/about')}>About</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/features')}>Features</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/customers')}>Customers</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/updates')}>Updates</button>
              <button className='text-xl tracking-tight text-black' onClick={() => handleNavigation('/auth/factory/register')}>For Factories</button>
              {/* Navigating to /register on click */}
              <button 
                className="btn btn-primary" 
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
