import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Instagram, Linkedin, X, BookOpen, Loader2, ArrowLeft } from "lucide-react";
import profile from "../assets/images/profile.png";
import OtpModal from "./OtpModel";
import background from "../assets/images/bg-white.png"


const faqs = [
  { q: "Who is this program for?" },
  { q: "Who is this NOT for?" },
  { q: "What results can I expect?" },
  { q: "Do I get access immediately after enrolling?" },
  { q: "Is this suitable for early-stage founders?" },
  { q: "Will I get future updates?" },
  { q: "Do you provide 1-on-1 consulting?" },
];

const faqAnswers = [
  "This program is designed for edtech founders and operators who want to build structured, predictable growth instead of relying on random tactics.",
  "This is not for people looking for shortcuts, hacks, or overnight success. It's for serious builders who are ready to implement systems.",
  "You'll gain clarity on positioning and learn how to increase revenue and drive sustainable growth using proven frameworks.",
  "Yes. You'll get instant access to the full program after successful enrollment.",
  "Yes. It's especially helpful if you're building from scratch or trying to move from unstable growth to structured scale.",
  "Yes. As the framework evolves, updates will be added so you stay aligned with current growth strategies.",
  "We limit consulting to a few companies at a time. This course is our way of making the same thinking and frameworks accessible to more founders.",
];

const arrowVariants = {
  animate: {
    x: [0, 5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

function PlusIcon({ isOpen }) {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="flex-shrink-0 ml-4 w-5 h-5 flex items-center justify-center"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="9" y1="2" x2="9" y2="16" stroke="#e53e3e" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="2" y1="9" x2="16" y2="9" stroke="#e53e3e" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}


// ─── Main Component ────────────────────────────────────────────────────────────
export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);
  const [modal, setModal] = useState(null); // { packageType, courseId }

  // NOTE: Replace COURSE_ID with your actual course ID from the API
  const COURSE_ID = 1;

  function openPayment(packageType) {
    setModal({ packageType, courseId: COURSE_ID });
  }

  return (
    <div id="pricing" className="bg-[#D9D9D9] pb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* ── OTP Modal ── */}
      {modal && (
        <OtpModal
          packageType={modal.packageType}
          courseId={modal.courseId}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Pricing Section ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-black font-medium text-3xl md:text-5xl mb-3 tracking-tighter">
              Choose Your Access
            </h2>
            <p className="text-gray-500 text-xl md:text-2xl font-normal tracking-tighter">
              Choose how you'd like to get started full access,{" "}
              <br className="hidden md:block" /> installments, or prebook.
            </p>
          </div>

          {/* Pricing card */}
          <div className="mt-10 md:mt-20 p-4 md:p-6 bg-white/40 rounded-4xl">
            <div className="bg-white rounded-3xl p-1 shadow-xl overflow-hidden shadow-[0_8px_50px_rgba(0,0,0,0.1)] border border-black/6">
              <div className="flex flex-col lg:flex-row">
                {/* ── Full Access ── */}
                <div className="flex-1 p-7">
                  <p className="text-black mb-4 font-light text-2xl">One-time payment</p>
                  <p className="font-extrabold font-['Inter'] text-black text-4xl md:text-7xl mb-1 italic tracking-tighter">
                    ₹2,999/-
                  </p>
                  <p className="text-gray-400 text-xs md:text-base font-light mt-2 mb-5">
                    You can also pay in 2 easy{" "}
                    <span className="font-normal text-black">installments of ₹1,499.</span>
                  </p>

                  <div className="flex gap-1 md:gap-3 mb-6 flex-col sm:flex-row">
                    {/* Get Full Access */}
                    <div className="w-full sm:w-auto transform transition-transform duration-400 hover:scale-105 bg-gradient-to-br from-white to-[#d9d3d3] rounded-full p-2 shadow-[0_2px_20px_rgba(0,0,0,0.1)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]">
                      <button
                        onClick={() => openPayment("Regular")}
                        className="w-full font-sans font-normal text-sm text-white/60 bg-gradient-to-b from-[#2c2c2c] to-[#111] border-none rounded-full md:py-3 py-2 px-7 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap shadow-[inset_0_-16px_48px_#000,0_24px_75px_rgba(0,0,0,0.18)] outline-none font-['Inter']"
                      >
                        Get Full access{" "}
                        <motion.span className="text-[17px] inline-block" variants={arrowVariants} animate="animate">
                          →
                        </motion.span>
                      </button>
                    </div>

                    {/* Pay Installment (also Regular package) */}
                    <div className="w-full sm:w-auto transform transition-transform duration-400 hover:scale-105 bg-gradient-to-br from-white to-[#d9d3d3] rounded-full p-2 shadow-[0_2px_20px_rgba(0,0,0,0.1)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]">
                      <button
                        onClick={() => openPayment("Demo")}
                        className="w-full font-sans font-medium text-sm bg-white border-[1.5px] border-black rounded-full py-2 md:py-3 px-7 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap outline-none font-['Inter']"
                      >
                        Pay Installment{" "}
                        <motion.span className="text-[17px] inline-block" variants={arrowVariants} animate="animate">
                          →
                        </motion.span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs md:text-3xl text-black mb-3 font-['Inter'] tracking-tighter">
                    What's included
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Full Course Access",
                      "Only Choice Book – Door Delivery",
                      "Community Access",
                      "Future Course Updates",
                      "Schedule 1:1 Call with Agnel John (45 min)",
                      "Full Course Access",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 md:text-xl">
                        <Check size={15} className="text-black flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-100 hidden sm:block" />
                <div className="h-px bg-gray-100 sm:hidden mx-4" />

                {/* ── Pre-Enrollment ── */}
                <div className="flex-1 p-7">
                  <p className="text-black mb-4 font-light text-2xl">Pre-Enrollment Access</p>
                  <p className="font-extrabold font-['Inter'] text-black text-4xl md:text-7xl mb-1 italic tracking-tighter">
                    ₹499
                  </p>
                  <p className="text-gray-400 text-xs md:text-base font-light mt-2 mb-5">
                    Try before you commit. 7 Days Refund Policy
                  </p>

                  <div className="flex gap-3 mb-6 flex-col sm:flex-row">
                    <div className="w-full sm:w-auto transform transition-transform duration-400 hover:scale-105 bg-gradient-to-br from-white to-[#d9d3d3] rounded-full p-2 shadow-[0_2px_20px_rgba(0,0,0,0.1)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]">
                      <button
                        onClick={() => openPayment("Demo")}
                        className="w-full font-sans font-normal text-sm text-white/60 bg-gradient-to-b from-[#2c2c2c] to-[#111] border-none rounded-full md:py-3 py-2 px-7 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap shadow-[inset_0_-16px_48px_#000,0_24px_75px_rgba(0,0,0,0.18)] outline-none font-['Inter']"
                      >
                        PreBook & Explore{" "}
                        <motion.span className="text-[17px] inline-block" variants={arrowVariants} animate="animate">
                          →
                        </motion.span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs md:text-3xl text-black mb-3 font-['Inter'] tracking-tighter">
                    What you get
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Module 1 (4 Lessons) Access",
                      "Get 1st Chapter of Only Choice Book",
                      "Upgrade anytime",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 md:text-xl">
                        <Check size={15} className="text-black flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-black font-medium text-3xl md:text-5xl mb-3 tracking-tight">
              Your Questions, Answered
            </h2>
            <p className="text-gray-500 text-xl md:text-2xl font-normal">Clear answers. No confusion.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-10 md:mt-20">
            {/* LEFT — Contact Card */}
            <div className="shadow-[0_30px_80px_rgba(0,0,0,0.18)] w-full lg:w-[45%] bg-white/40 rounded-[36px] -rotate-3 md:p-6 p-4">
              <div className="bg-white rounded-[36px] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
                <div className="flex gap-6 items-start mb-5 lg:mb-10">
                  <img
                    src={profile}
                    alt="Agnel"
                    className="w-20 h-20 rounded-full object-cover shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                  />
                  <div>
                    <p className="font-bold text-xl text-black mb-4">Have more questions?</p>
                    <p className="text-gray-700 leading-relaxed font-light max-w-md hidden md:block">
                      Email to my team, get response in 24 to 48 hours
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-light max-w-md mb-2 md:hidden">
                  Email to my team, get response in 24 to 48 hours
                </p>

                <div className="flex gap-3 mb-6">
                  <div className="w-full cursor-pointer text-white/60 hover:text-white bg-gradient-to-br from-white to-[#d9d3d3] rounded-full p-2 shadow-[0_2px_20px_rgba(0,0,0,0.1)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] transform transition-all duration-400">
                    <a
                      href="mailto:agnel@agneljohn.in"
                      className="w-full font-sans font-normal text-sm bg-gradient-to-b from-[#2c2c2c] to-[#111] border-none rounded-full md:py-3 py-2 px-7 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap shadow-[inset_0_-16px_48px_#000,0_24px_75px_rgba(0,0,0,0.18)] outline-none font-['Inter']"
                    >
                      Email Your Questions Now{" "}
                      <motion.span className="text-[17px] inline-block" variants={arrowVariants} animate="animate">
                        →
                      </motion.span>
                    </a>
                  </div>
                </div>

                <div className="ml-3 flex md:gap-6 items-center text-sm">
                  <span className="text-gray-500 font-light hidden md:block">email us at</span>
                  <a href="mailto:agnel@agneljohn.in" className="text-[#ff3b00] font-light hover:underline">
                    agnel@agneljohn.in
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — FAQ Accordion */}
            <div className="w-full lg:w-[55%]">
              {faqs.map((faq, i) => (
                <div key={i} className="border-t border-gray-400 last:border-b border-gray-400">
                  <button
                    className="w-full flex items-center justify-between py-6 bg-none border-none cursor-pointer text-left font-['Inter']"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-lg md:text-xl font-light text-black leading-relaxed transition-colors">
                      {faq.q}
                    </span>
                    <PlusIcon isOpen={openFaq === i} />
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.28, ease: "easeInOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed pb-5">
                          {faqAnswers[i]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA Banner ── */}
      <section className="bg-[#000000] relative m-2 rounded-4xl">
         <div
          className="absolute inset-0 -left-[25rem] -top-[10rem] lg:-left-[10rem] lg:-top-[15rem] opacity-35"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: window.innerWidth < 768 ? "auto 80%" : "80% auto", // Height 80% on mobile, width 80% on desktop
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="pt-20 relative z-10 px-4 text-center m-5 rounded-4xl">
          <div className="max-w-6xl mx-auto text-cente">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div
                className="h-[3.5px] w-16"
                style={{ background: "linear-gradient(to left, rgba(255,255,255,0.5), transparent)" }}
              />
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(26px, 4vw, 55px)",
                  fontStyle: "italic",
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                }}
                className="text-white/50"
              >
                Only a few spots remaining
              </span>
              <div
                className="h-[3.5px] w-16"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.5), transparent)" }}
              />
            </div>

            <h2 className="font-black text-5xl md:text-8xl mb-6 tracking-tight pt-5">
              <span className="text-white">Enroll </span>
              <span className="text-white/50">Now</span>
            </h2>

            <p className="text-white/70 text-sm md:text-2xl mb-8 leading-relaxed mx-auto">
              Join course creators who are using a clear, repeatable{" "}
              <br className="hidden md:block" /> system to grow their education business with confidence
            </p>

            <div className="flex justify-center gap-4 mb-8 flex-col sm:flex-row">
              {/* Enroll Now → Regular */}
              <div className="w-full sm:w-auto group transform transition-all duration-400 hover:scale-105 bg-gradient-to-br from-white to-[#e5e5e5] rounded-full p-[6px] shadow-[0_4px_25px_rgba(0,0,0,0.15)]">
                <button
                  onClick={() => openPayment("Regular")}
                  className="w-full font-['Inter'] text-sm md:text-base text-white/80 bg-gradient-to-b from-[#2c2c2c] to-[#111] rounded-full py-3 px-8 cursor-pointer flex items-center justify-center gap-3 shadow-[inset_0_-12px_30px_#000] transition-all duration-400"
                >
                  Enroll Now{" "}
                  <motion.span className="text-lg inline-block" variants={arrowVariants} animate="animate">
                    →
                  </motion.span>
                </button>
              </div>

              {/* Explore Prebook → Demo */}
              <div className="w-full sm:w-auto group transform transition-all duration-400 hover:scale-105 bg-gradient-to-br from-white to-[#e5e5e5] rounded-full p-[6px] shadow-[0_4px_25px_rgba(0,0,0,0.15)]">
                <button
                  onClick={() => openPayment("Demo")}
                  className="w-full font-['Inter'] text-sm md:text-base bg-white border border-gray-200 rounded-full py-3 px-8 cursor-pointer flex items-center justify-center gap-3 transition-all duration-400"
                >
                  Explore Prebook{" "}
                  <motion.span className="text-lg inline-block" variants={arrowVariants} animate="animate">
                    →
                  </motion.span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="py-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
            <div className="text-gray-500 text-xs md:text-sm space-y-2">
              <p>© Agnel John D, 2026</p>
              <hr />
              <p>
                Powered by{" "}
                <a
                  href="https://lecturehead.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors duration-400 hover:underline decoration-gray-600 hover:decoration-white"
                >
                  LectureHead
                </a>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://www.instagram.com/agneljohnd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 hover:border-gray-400 text-gray-500 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={22} />
              </motion.a>

              <motion.a
                href="https://x.com/theagneljohn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 hover:border-gray-400 text-gray-500 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={22} />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/theagneljohn/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 hover:border-gray-400 text-gray-500 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={22} />
              </motion.a>

              <motion.a
                href="https://www.thewinninggap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 hover:border-gray-400 text-gray-500 hover:text-white transition-all group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen size={22} />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Newsletter
                </span>
              </motion.a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}