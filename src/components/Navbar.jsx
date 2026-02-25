import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import profile from "../assets/images/profile.png";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", setProgress);
    return () => unsubscribe();
  }, [smoothProgress]);

  const handleLogin = () => {
    console.log("Login clicked");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 max-w-[90rem] mx-auto">
      {/* Left side - Profile image */}
      <motion.button 
        className="bg-white/40 text-black font-semibold text-sm pl-1 pr-5 py-1 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={profile}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover"
        />
        Agnel John
      </motion.button>

      {/* Right side - Login button with clean black progress border */}
      <motion.button
        className="relative flex items-center gap-3 px-4 py-2 rounded-full group bg-white/40 backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
        style={{
          background: `linear-gradient(white, white) padding-box,
                      conic-gradient(from 0deg, #000000 ${progress * 360}deg, #e5e7eb ${progress * 360}deg) border-box`,
          border: "2px solid transparent",
          borderRadius: "999px",
        }}
      >
        <span className="text-black font-semibold text-sm relative z-10">Login</span>

        <div className="w-8 h-8 rounded-full bg-white hidden md:flex items-center justify-center group-hover:bg-gray-50 transition-all relative z-10 shadow-sm">
          <UserPlus size={14} className="text-gray-700 group-hover:text-black transition-colors" />
        </div>
      </motion.button>
    </nav>
  );
}