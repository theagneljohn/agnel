import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import noise from "../assets/images/noise.png";

const tabs = [
  {
    label: "Course Creators",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
        <path d="M15 10l4.553-2.277A1 1 0 0121 8.764v6.472a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
    title: "Course Creators",
    description:
      "For creators who have knowledge but struggle with positioning, consistent enrollments, and converting attention into revenue. Learn how to structure offers, build trust, and become the obvious choice in your niche.",
  },
  {
    label: "EdTech Founders",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
        <path
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    title: "EdTech Founders",
    description:
      "For founders already selling courses but facing inconsistent growth, low conversion rates, or scaling challenges. Build systems, remove objections, increase enrollments, and create predictable revenue.",
  },
  {
    label: "Education Institutes",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    title: "Education Institutes",
    description:
      "For academies and training centers looking to strengthen positioning, improve admissions, and dominate their local or online market. Turn your institute into a category leader with strong systems and strategic growth.",
  },
];

// Smooth carousel animations
const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 400 : -400,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// Content animations
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const iconVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function WhoIsThisFor() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);
  const animationTimeout = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % tabs.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused]);

  // Pause auto-play when user interacts
  useEffect(() => {
    if (isAnimating) {
      setIsPaused(true);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    } else {
      // Resume auto-play after animation completes
      const timeout = setTimeout(() => {
        setIsPaused(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  const handleTabClick = (i) => {
    if (i === activeIndex || isAnimating) return;

    setIsAnimating(true);
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);

    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => setIsAnimating(false), 700);
  };

  return (
   <section className="bg-[#D9D9D9] md:p-2">
     <div
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background with noise */}
      <div
        className="absolute inset-0 bg-black md:rounded-4xl"
        style={{
          backgroundImage: `url(${noise})`,
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-8 xl:gap-12 items-center">
          {/* LEFT: title + tabs */}
          <motion.div
            className="flex flex-col justify-center mb-12 lg:mb-0 lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={contentVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight mb-5 tracking-tighter"
            >
              Who Is This For?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-sm md:text-2xl leading-relaxed tracking-wide mb-8 sm:mb-12 md:mb-14 max-w-md tracking-tighter"
            >
              The Only Choice Framework that turns your expertise into{" "}
              <br className="hidden lg:block" /> a predictable, scalable
              education business.
            </motion.p>

            {/* Tabs */}
            <motion.div
              variants={itemVariants}
              className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              <div className="flex gap-4 sm:gap-6 md:gap-7 border-b-[1px] border-gray-800 min-w-max sm:min-w-0">
                {tabs.map((tab, i) => (
                  <motion.button
                    key={i}
                    className={`relative pb-2 md:px-1 text-xs md:text-base font-medium whitespace-nowrap transition-colors duration-500
                      ${activeIndex === i ? "text-[#FDD967]" : "text-gray-500 hover:text-gray-300"}`}
                    onClick={() => handleTabClick(i)}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.label}
                    <motion.span
                      className="absolute -bottom-[0.8px] left-0 right-0 h-[1px] rounded-full bg-[#FDD967] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: carousel card with controls */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-full bg-white/90 rounded-3xl p-4 md:p-5"
                  style={{
                    willChange: "transform, opacity",
                    transformOrigin: "center center",
                  }}
                >
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full h-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10
                      shadow-[0_2px_0_0_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]
                      border border-white/10 flex flex-col gap-4 sm:gap-5 md:gap-6"
                  >
                    {/* Icon */}
                    <motion.div
                      variants={iconVariants}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px] rounded-lg sm:rounded-xl md:rounded-2xl
                        bg-gradient-to-br from-gray-900 to-black flex items-center justify-center
                        shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex-shrink-0"
                    >
                      {tabs[activeIndex].icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      variants={itemVariants}
                      className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 tracking-tight leading-tight"
                    >
                      {tabs[activeIndex].title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      variants={itemVariants}
                      className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed tracking-wide"
                    >
                      {tabs[activeIndex].description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
   </section>
  );
}
