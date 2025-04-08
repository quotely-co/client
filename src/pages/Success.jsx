import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide confetti after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    const host = import.meta.env.VITE_HOST_URL || "https://api.quotely.shop/"
    // Show loading toast immediately
    const loadingToast = toast.loading("Setting up your dashboard...", {
      position: "top-center",
    });

    // Activate Account
    const activateAccount = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.post(
          `${host}/api/factory/activate-account`,
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Account activation response:", response.data);
        
        
        // Update toast on success
        toast.success("Account activated successfully!", {
          id: loadingToast,
          duration: 3000,
        });
        
        // Show redirect toast
        setTimeout(() => {
          toast.loading("Redirecting to your dashboard...", {
            duration: 2000,
          });
        }, 1000);
        
      } catch (error) {
        // Show error toast
        toast.error(
          error.response?.data?.message || "Failed to activate account", 
          { id: loadingToast }
        );
        setShowConfetti(false);
        return;
      }

      // Handle redirect after successful activation
      setTimeout(() => {
        const subdomain = localStorage.getItem("subdomain");
        const token = localStorage.getItem("token");
        
        if (subdomain) {
          window.location.href = `https://${subdomain}.quotely.shop?token=${encodeURIComponent(token)}`;
        } else {
          window.location.href = "https://quotely.shop/dashboard";
        }
      }, 4000);
    };

    activateAccount();
  }, [sessionId]);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
        />
      )}
      
      <Toaster />
      
      <motion.div 
        className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Success Icon */}
        <div className="mb-4">
          <motion.div 
            className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
            variants={circleVariants}
          >
            <motion.svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
                variants={checkmarkVariants}
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Title and Description */}
        <motion.h1 
          className="text-xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Payment Successful! 🎉
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          We're setting up your dashboard and will redirect you automatically.
        </motion.p>

        {/* Pulse Animation for Loading */}
        <motion.div
          className="w-16 h-1 bg-blue-100 rounded-full mx-auto mt-4"
          animate={{
            width: ["4rem", "10rem", "4rem"],
            backgroundColor: ["#dbeafe", "#60a5fa", "#dbeafe"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Transaction ID */}
        <motion.p 
          className="text-xs text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Transaction ID: {sessionId?.substring(0, 8)}...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Success;