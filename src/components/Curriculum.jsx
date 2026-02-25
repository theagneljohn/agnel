import { useState } from "react";
import { ChevronUp, ChevronDown, Video, BookOpen, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OtpModal from "./OtpModel";

// ─── Replace with your actual course ID from GET /courses ────────────────────
const COURSE_ID = 1;

const modules = [
  {
    title: "Section 1: The Growth Laws of Education Business",
    lessons: 5,
    open: true,
    items: [
      "My Story - How I scaled",
      "Concept of Winning Gap",
      "Content is not for views",
      "Focus on the no's, not the yes's",
      "Building Systems & Departments",
    ],
  },
  {
    title: "Section 2: The Art of Relevance",
    lessons: 6,
    open: false,
    items: [
      "Power of Direct Relevance",
      "Context - Know their Trigger Moment",
      "Market Gap - What makes you unique?",
      "Objection - Ask this Powerful Question",
      "Activity - How to find Context, Market Gap & Objections",
      "Make it Recurring",
    ],
  },
  {
    title: "Section 3: One Step Closer Framework",
    lessons: 3,
    open: false,
    items: [
      "One Step Closer Framework Explained",
      "Case Study 1: How a technology training company adopted this",
      "Case Study 2: How it worked for HR Training Company",
    ],
  },
  {
    title: "Section 4: Drop the Risk",
    lessons: 2,
    open: false,
    items: [
      "Why it is important to tell them it is safe",
      "Steps to make the risk feel safe",
    ],
  },
  {
    title: "Section 5: Urgency & Its Kind",
    lessons: 3,
    open: false,
    items: [
      "What happens between when they say yes and later say no?",
      "Fake Urgency vs Real Urgency",
      "Is the University Model applicable?",
    ],
  },
  {
    title: "Section 6: Future Updates",
    lessons: 1,
    open: false,
    items: [
      "This program will evolve with market changes and student feedback. You'll always get updated strategies that match the current reality.",
    ],
  },
];

export default function Curriculum() {
  const [openIdx, setOpenIdx] = useState(0);
  const [modal, setModal] = useState(null);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  const accordionVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.2, delay: 0.05 },
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.25, delay: 0.1 },
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10, transition: { duration: 0.15 } },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.05, ease: "easeOut" },
    }),
  };

  const chevronVariants = {
    open: { rotate: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { rotate: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <section
      id="curriculum"
      className="pb-20 pt-40 px-4"
      style={{ background: "#D9D9D9", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* OTP Modal */}
      {modal && (
        <OtpModal
          packageType={modal.packageType}
          courseId={COURSE_ID}
          onClose={() => setModal(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-black font-medium text-3xl md:text-5xl mb-3 tracking-tighter">
            Inside the Complete Program
          </h2>
          <p className="text-gray-500 text-xl md:text-2xl font-normal tracking-tighter">
            Every module is designed to help you move forward with{" "}
            <br className="hidden md:block" />
            clarity and confidence.
          </p>
        </motion.div>

        <div className="md:p-6 p-4 bg-white/40 rounded-4xl">
          {/* Accordion card */}
          <motion.div
            className="bg-white rounded-3xl overflow-hidden md:p-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                className={`${i !== 0 ? "border-t border-gray-100" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                {/* Module header */}
                <motion.button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors text-left"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div animate={openIdx === i ? "open" : "closed"} variants={chevronVariants}>
                      {openIdx === i ? (
                        <ChevronUp size={20} className="text-black flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-black flex-shrink-0" />
                      )}
                    </motion.div>
                    <span className="text-black text-base md:text-2xl tracking-tighter">
                      {mod.title}
                    </span>
                  </div>
                  <motion.div
                    className="md:flex items-center gap-1.5 text-[#31354A] text-xs md:flex-shrink-0 ml-4 hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <BookOpen size={13} />
                    <span>
                      {mod.lessons} {mod.lessons === 1 ? "lesson" : "lessons"}
                    </span>
                  </motion.div>
                </motion.button>

                {/* Expanded lessons */}
                <AnimatePresence initial={false}>
                  {openIdx === i && mod.items.length > 0 && (
                    <motion.div
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden"
                    >
                      <div className="pb-4">
                        {mod.items.map((item, j) => (
                          <motion.div
                            key={j}
                            custom={j}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3 text-[#31354A] font-normal text-xs md:text-lg tracking-tight">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                {i === 5 ? (
                                  <FileText className="text-[#31354A] flex-shrink-0" size={20} />
                                ) : (
                                  <Video className="text-[#31354A] flex-shrink-0" size={20} />
                                )}
                              </motion.div>
                              <span>{item}</span>
                            </div>
                            <motion.span
                              className="text-xs px-3 py-1 rounded-full ml-4 md:flex-shrink-0 hidden md:block"
                              style={{ background: i === 5 ? "#e0f2fe" : "#fef9c3" }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: i === 5 ? "#bae6fd" : "#fef08a",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {i === 5 ? "NOTE" : "LESSON"}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enroll button */}
        <div className="flex justify-center mt-10">
          <motion.div
            style={{
              background: "linear-gradient(135deg, #fff, #d9d3d3)",
              borderRadius: 999,
              padding: 8,
              boxShadow: "0 2px 20px rgba(0,0,0,.1), inset 0 0 0 1px rgba(255,255,255,.6)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={() => setModal({ packageType: "Regular" })}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 18,
                color: "rgba(255,255,255,.6)",
                background: "linear-gradient(180deg, #2c2c2c, #111)",
                border: "none",
                borderRadius: 999,
                padding: "13px 28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                whiteSpace: "nowrap",
                boxShadow: "inset 0 -16px 48px #000, 0 24px 75px rgba(0,0,0,.18)",
                outline: "none",
              }}
              whileHover={{
                background: "linear-gradient(180deg, #3c3c3c, #222)",
                color: "rgba(255,255,255,.8)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Enroll Now
              <motion.span
                style={{ fontSize: 17 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}