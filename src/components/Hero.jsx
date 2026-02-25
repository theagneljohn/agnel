import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import trusted from "../assets/images/trusted.png";
import OtpModal from "./OtpModel";

// ─── Replace with your actual course ID from GET /courses ────────────────────
const COURSE_ID = 1;

function RollingDigit({ digit }) {
  const [current, setCurrent] = useState(digit);
  const [prev, setPrev] = useState(null);
  const [k, setK] = useState(0);

  useEffect(() => {
    if (digit !== current) {
      setPrev(current);
      setCurrent(digit);
      setK((n) => n + 1);
    }
  }, [digit]); // eslint-disable-line

  return (
    <span className="relative inline-block w-[0.6em] leading-inherit align-top">
      {prev !== null && (
        <motion.span
          key={`o${k}`}
          initial={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          animate={{ y: "-115%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.14, ease: [0.55, 0, 1, 0.45] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {prev}
        </motion.span>
      )}

      <motion.span
        key={`i${k}`}
        initial={
          prev !== null
            ? { y: "115%", opacity: 0, filter: "blur(6px)" }
            : { y: "0%", opacity: 1, filter: "blur(0px)" }
        }
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={prev !== null ? { duration: 0.18, ease: [0, 0.55, 0.45, 1] } : {}}
        className="flex items-center justify-center w-full"
      >
        {current}
      </motion.span>
    </span>
  );
}

function RollingNumber({ value }) {
  const str = String(value).padStart(2, "0");
  return (
    <span className="inline-flex tracking-[0]">
      {str.split("").map((d, i) => (
        <RollingDigit key={i} digit={d} />
      ))}
    </span>
  );
}

function useStepCount(target, from = 0, stepMs = 120) {
  const [count, setCount] = useState(from);
  const timer = useRef(null);

  useEffect(() => {
    setCount(from);
    let cur = from;
    const tick = () => {
      cur += 1;
      setCount(cur);
      if (cur < target) timer.current = setTimeout(tick, stepMs);
    };
    timer.current = setTimeout(tick, 750);
    return () => clearTimeout(timer.current);
  }, [target, from, stepMs]);

  return count;
}

function Badge({ children, floatAnim, value }) {
  const paddingClass =
    String(value).length === 1
      ? "pt-0 pr-[0.9em] pb-0 pl-[0.9em]"
      : "pt-[0.06em] pr-[1.7em] pb-[0.06em] pl-[0.8em]";

  return (
    <motion.div
      animate={floatAnim.animate}
      transition={floatAnim.transition}
      className={`inline-flex items-center bg-gradient-to-br from-[#2d2d2d] to-[#0c0c0c] rounded-[clamp(12px,3vw,40px)] ${paddingClass} shadow-[24px_24px_34px_-4px_rgba(0,0,0,.09),11px_11px_15px_-4px_rgba(0,0,0,.32),5px_5px_8px_-3px_rgba(0,0,0,.41),3px_3px_4px_-2px_rgba(0,0,0,.46),1px_1px_2px_-1px_rgba(0,0,0,.5)] flex-shrink-0 overflow-hidden`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const count10 = useStepCount(10, 0, 120);
  const count3 = 3;
  const [modal, setModal] = useState(null);

  const float1 = {
    animate: { y: [0, -9, 0], rotate: [-2, -0.8, -2] },
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
  };
  const float2 = {
    animate: { y: [6, -3, 6], rotate: [1, 2.2, 1] },
    transition: { duration: 4.1, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section className="lg:min-h-screen bg-[#D9D9D9] flex flex-col items-center justify-center text-center px-6 py-20 box-border">
      {/* OTP Modal */}
      {modal && (
        <OtpModal
          packageType={modal.packageType}
          courseId={COURSE_ID}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Hello! ── */}
      <div className="flex items-center gap-3.5 mb-5 mt-10 lg:mt-0">
        <div className="h-[3.5px] w-16 bg-gradient-to-r from-transparent to-black/22" />
        <span className="font-['Instrument_Serif'] text-black/50 text-[clamp(26px,4vw,55px)] italic tracking-[0.01em] leading-none">
          Hello!
        </span>
        <div className="h-[3.5px] w-16 bg-gradient-to-l from-transparent to-black/22" />
      </div>

      {/* ── Headline block ── */}
      <div className="max-w-6xl w-full">
        {/* Row 1 — "I Scaled to [10] Crore" */}
        <div className="flex flex-wrap items-center justify-center gap-[clamp(6px,1vw,14px)]">
          <span className="font-['Poppins'] font-extrabold text-black text-[clamp(2.2rem,6.4vw,100px)] leading-[1.28] tracking-[-0.05em] whitespace-nowrap">
            I Scaled to
          </span>

          <Badge floatAnim={float1} value={count10}>
            <span className="font-['Poppins'] font-extrabold text-[#E3E3E3] italic text-[clamp(2.2rem,6.4vw,100px)] leading-[1.28] tracking-[-0.25vw] whitespace-nowrap">
              <RollingNumber value={count10} />
            </span>
          </Badge>
          <br className="md:hidden" />

          <span className="font-['Poppins'] font-medium text-black/50 text-[clamp(2.2rem,6.4vw,100px)] leading-[1.28] tracking-[-0.05em] whitespace-nowrap">
            Crore
          </span>
        </div>

        {/* Row 2 — "in [03] years." */}
        <div className="flex flex-wrap items-center justify-center gap-[clamp(6px,1vw,14px)]">
          <span className="font-['Poppins'] font-medium text-black/50 text-[clamp(2.2rem,6.4vw,100px)] leading-[1.28] tracking-[-0.05em] whitespace-nowrap">
            in
          </span>

          <Badge floatAnim={float2} value={count3}>
            <span className="font-['Poppins'] font-extrabold text-[#E3E3E3] italic text-[clamp(2.2rem,6.4vw,100px)] leading-[1.28] tracking-[-0.25vw] whitespace-nowrap">
              03
            </span>
          </Badge>

          <span className="font-['Poppins'] font-extrabold text-black text-[clamp(2.2rem,6.4vw,100px)] leading-[1.28] tracking-[-0.04em] whitespace-nowrap">
            years.
          </span>
        </div>
      </div>

      {/* ── Subtitle ── */}
      <p className="font-['Inter'] text-black/40 text-[clamp(17px,2vw,26px)] max-w-2xl leading-[1.65] my-8 px-2 tracking-[-0.03em]">
        Learn how to position your course as the only choice and scale your education business.
      </p>

      {/* ── CTA row ── */}
      <div className="flex flex-wrap items-center justify-center gap-5.5">
        <div className="flex justify-center">
          <motion.div
            style={{
              background: "linear-gradient(135deg, #fff, #d9d3d3)",
              borderRadius: 999,
              padding: 8,
              boxShadow: "0 2px 20px rgba(0,0,0,.1), inset 0 0 0 1px rgba(255,255,255,.6)",
            }}
            
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

        <div className="flex flex-col gap-1">
          <img src={trusted} alt="Trusted by Leaders" className="h-10" />
          <span className="font-['Inter'] text-xs text-black/40">Trusted by Leaders</span>
        </div>
      </div>
    </section>
  );
}