"use client";
import acmeLogo from "../assets/logo-acme.png";
import quantumLogo from "../assets/logo-quantum.png";
import echoLogo from "../assets/logo-echo.png";
import celestialLogo from "../assets/logo-celestial.png";
import pulseLogo from "../assets/logo-pulse.png";
import apexLogo from "../assets/logo-apex.png";
import { motion } from "framer-motion";

 const LogoTicker = () => {
  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex flex-none gap-14 pr-14"
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <img src={acmeLogo} className="logo-ticker-image" alt="Acme" />
            <img
              src={quantumLogo}
              className="logo-ticker-image"
              alt="Quantum"
            />
            <img src={echoLogo} className="logo-ticker-image" alt="Echo" />
            <img
              src={celestialLogo}
              className="logo-ticker-image"
              alt="Celestial"
            />
            <img src={pulseLogo} className="logo-ticker-image" alt="Pulse" />
            <img src={apexLogo} className="logo-ticker-image" alt="Apex" />

            {/* !!! Second set of logos for animation */}
            <img src={acmeLogo} className="logo-ticker-image" alt="Acme" />
            <img
              src={quantumLogo}
              className="logo-ticker-image"
              alt="Quantum"
            />
            <img src={echoLogo} className="logo-ticker-image" alt="Echo" />
            <img
              src={celestialLogo}
              className="logo-ticker-image"
              alt="Celestial"
            />
            <img src={pulseLogo} className="logo-ticker-image" alt="Pulse" />
            <img src={apexLogo} className="logo-ticker-image" alt="Apex" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker