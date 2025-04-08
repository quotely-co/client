import { useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";
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
        <nav className="mt-6 flex flex-col gap-6 md:flex-row md:justify-center">
          <button onClick={() => handleNavigate('/about')}>About</button>
          <button onClick={() => handleNavigate('/features')}>Features</button>
          <button onClick={() => handleNavigate('/customers')}>Customers</button>
          <button onClick={() => handleNavigate('/pricing')}>Pricing</button>
          <button onClick={() => handleNavigate('/support')}>Support</button>
          <button onClick={() => handleNavigate('/contact')}>Contact Us</button>
          <button onClick={() => handleNavigate('/terms-of-service')}>Terms and Policy</button>
          <button onClick={() => handleNavigate('/privacy-policy')}>privacy-policy</button>
          <button onClick={() => handleNavigate('/refund-policy')}>refund-policy</button>
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
          &copy; {new Date().getFullYear()} Quotely, Inc. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
