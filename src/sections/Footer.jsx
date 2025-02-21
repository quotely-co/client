import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logosaas.png";
import SocialX from "../assets/social-x.svg";  // Make sure these paths are correct
import SocialYoutube from "../assets/social-youtube.svg";
import SocialInsta from "../assets/social-insta.svg";
import SocialLinkedIn from "../assets/social-linkedin.svg";
import SocialPinterest from "../assets/social-pin.svg";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-black py-10 text-center text-sm text-[#BCBCBC]">
      <div className="container">
        <div className="before:content-[' '] relative inline-flex before:absolute before:bottom-0 before:top-2 before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD98,#C2F0B1,#2FD8FE)] before:blur">
          {/* Use next/image for optimization if needed */}
          <img src={Logo} alt="Sass Logo" height={40} className="relative" />
        </div>
        <nav className="mt-6 flex flex-col gap-6 md:flex-row md:justify-center">
          <button onClick={() => handleNavigate('/about')}>About</button>
          <button onClick={() => handleNavigate('/features')}>Features</button>
          <button onClick={() => handleNavigate('/customers')}>Customers</button>
          <button onClick={() => handleNavigate('/pricing')}>Pricing</button>
          <button onClick={() => handleNavigate('/support')}>Support</button>
          <button onClick={() => handleNavigate('/contact')}>Contact Us</button>
        </nav>
        {/* Social icons */}
        <div className="mt-6 flex justify-center gap-6">
          <img src={SocialX} alt="Social X" className="h-6 w-6" />
          <img src={SocialYoutube} alt="YouTube" className="h-6 w-6" />
          <img src={SocialInsta} alt="Instagram" className="h-6 w-6" />
          <img src={SocialLinkedIn} alt="LinkedIn" className="h-6 w-6" />
          <img src={SocialPinterest} alt="Pinterest" className="h-6 w-6" />
        </div>
        <p className="mt-6">
          &copy; {new Date().getFullYear()} White Label, Inc. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
