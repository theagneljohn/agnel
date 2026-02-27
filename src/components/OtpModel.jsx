import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ArrowLeft } from "lucide-react";

const API_BASE = "https://users.api.lecturehead.com/v0";
const API_KEY = import.meta.env.VITE_LECTUREHEAD_API_KEY;
const COURSE_SLUG = "the-only-choice-playbook";

function parseError(data, fallback) {
  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.join(" ");
  }
  return data?.message || fallback;
}

const setAuthCookie = (token) => {
  document.cookie = `
consumerAuthToken=${token};
domain=.agneljohn.in;
path=/;
Secure;
SameSite=Lax
`;
};

/**
 * OtpModal
 * Props:
 *  - packageType: "Regular" | "Demo"   ← comes from course pricing[].packageType
 *  - onClose: () => void
 *
 * Fetches course details internally using slug "the-winning-gap"
 * to resolve courseId (data.id) before generating a payment link.
 */
export default function OtpModal({ packageType, onClose }) {
  // ── Course resolution ──────────────────────────────────────────────────────
  const [courseId, setCourseId] = useState(null);
  const [courseError, setCourseError] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(
          `${API_BASE}/courses/details/${COURSE_SLUG}`,
          { headers: { "x-api-key": API_KEY } }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(parseError(data, "Failed to load course"));

        // Per API docs: course id lives at data.id
        const id = data?.data?.id;
        if (!id) throw new Error("Course ID not found in response");
        setCourseId(id);
      } catch (err) {
        setCourseError(err.message);
      }
    }
    fetchCourse();
  }, []);

  // ── Auth / OTP flow ────────────────────────────────────────────────────────
  const [step, setStep] = useState("email"); // "email" | "otp" | "name" | "loading" | "error"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };

  async function handleSendOtp(e) {
    e?.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/user/otp/send`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(parseError(data, "Failed to send OTP"));
      // Shape: { data: { message, expiresIn, isExistingUser } }
      setIsNewUser(data?.data?.isExistingUser === false);
      setStep("otp");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;
    if (isNewUser && (!name || !phone)) {
      setStep("name");
      return;
    }
    await doLogin();
  }

  async function doLogin() {
    setLoading(true);
    setErrorMsg("");
    try {
      const body = { email, otp };
      if (isNewUser) {
        body.name = name;
        body.phoneNumber = phone;
      }
      const res = await fetch(`${API_BASE}/user/otp/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(parseError(data, "OTP verification failed"));

      // Shape: { data: { message, token, expiresAt, isNewUser } }
      const token = data?.data?.token;
      if (!token) throw new Error("No token returned");

      setAuthCookie(token);
      await generatePaymentLink(token);
    } catch (err) {
      setErrorMsg(err.message);
      setStep("otp");
    } finally {
      setLoading(false);
    }
  }

  async function generatePaymentLink(token) {
    setStep("loading");
    try {
      // courseId resolved from GET /courses/details/the-winning-gap → data.id
      // packageType comes from pricing[].packageType — passed in as a prop
      const res = await fetch(`${API_BASE}/payment-link`, {
        method: "POST",
        headers,
        body: JSON.stringify({ token, courseId, packageType }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(parseError(data, "Failed to generate payment link"));

      // Shape: { data: { message, data: { redirectUrl, packageId } } }
      const url = data?.data?.data?.redirectUrl;
      window.location.href = url || "https://app.agneljohn.in";
    } catch (err) {
      setErrorMsg(err.message);
      setStep("error");
    }
  }

  // ── Derived badge label from packageType ───────────────────────────────────
  const packageLabel =
    packageType === "Regular" ? "Full Access — ₹2,999" : "Start with — ₹499";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal Card */}
        <motion.div
          className="relative bg-white/35 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 w-full max-w-md shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all"
          >
            <X size={16} className="text-black/70" />
          </button>

          {/* Package badge */}
          <div className="inline-flex items-center gap-1.5 bg-black/90 text-white text-xs font-['Inter'] px-3 py-1 rounded-full mb-5 backdrop-blur-sm">
            <span>{packageLabel}</span>
          </div>

          {/* Course loading error — shown inline, modal still usable */}
          {courseError && (
            <p className="text-red-500 text-xs mb-3 font-['Inter'] font-medium">
              ⚠ {courseError}
            </p>
          )}

          {/* ── EMAIL STEP ── */}
          {step === "email" && (
            <form onSubmit={handleSendOtp}>
              <h3 className="text-black/90 font-bold text-2xl tracking-tight mb-1 font-['Inter'] drop-shadow-sm">
                Enter your email
              </h3>
              <p className="text-black/60 text-sm mb-6 font-['Inter'] font-light">
                We'll send a 6-digit OTP to verify your identity.
              </p>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/40 text-sm font-['Inter'] outline-none focus:outline-none focus:ring-2 focus:ring-black/30 transition-all"
                required
                autoFocus
              />
              {errorMsg && (
                <p className="text-red-500 text-xs mt-2 font-['Inter'] font-medium">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !email}
                className="mt-4 w-full bg-black/90 text-white rounded-2xl py-3.5 font-['Inter'] text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Send OTP →"}
              </button>
            </form>
          )}

          {/* ── OTP STEP ── */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <button
                type="button"
                onClick={() => { setStep("email"); setErrorMsg(""); }}
                className="flex items-center gap-1 text-black/50 text-xs mb-4 hover:text-black/80 transition-colors font-['Inter']"
              >
                <ArrowLeft size={13} /> Back
              </button>
              <h3 className="text-black/90 font-bold text-2xl tracking-tight mb-1 font-['Inter'] drop-shadow-sm">
                Check your inbox
              </h3>
              <p className="text-black/60 text-sm mb-1 font-['Inter'] font-light">
                We sent a 6-digit OTP to
              </p>
              <p className="text-black/90 text-sm font-medium mb-5 font-['Inter']">{email}</p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/30 text-xl font-bold tracking-[0.35em] text-center outline-none focus:outline-none focus:ring-2 focus:ring-black/30 transition-all"
                autoFocus
              />
              {errorMsg && (
                <p className="text-red-500 text-xs mt-2 font-['Inter'] font-medium">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || otp.length !== 6 || !courseId}
                className="mt-4 w-full bg-black/90 text-white rounded-2xl py-3.5 font-['Inter'] text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Verify & Continue →"}
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="mt-3 w-full text-center text-xs text-black/50 hover:text-black/80 transition-colors font-['Inter'] disabled:opacity-50"
              >
                Resend OTP
              </button>
            </form>
          )}

          {/* ── NAME/PHONE STEP (new users only) ── */}
          {step === "name" && (
            <form onSubmit={(e) => { e.preventDefault(); doLogin(); }}>
              <button
                type="button"
                onClick={() => { setStep("otp"); setErrorMsg(""); }}
                className="flex items-center gap-1 text-black/50 text-xs mb-4 hover:text-black/80 transition-colors font-['Inter']"
              >
                <ArrowLeft size={13} /> Back
              </button>
              <h3 className="text-black/90 font-bold text-2xl tracking-tight mb-1 font-['Inter'] drop-shadow-sm">
                One last step
              </h3>
              <p className="text-black/60 text-sm mb-5 font-['Inter'] font-light">
                Create your account to complete enrollment.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/40 text-sm font-['Inter'] outline-none focus:outline-none focus:ring-2 focus:ring-black/30 transition-all"
                  required
                  autoFocus
                />
                <input
                  type="tel"
                  placeholder="Phone number (10 digits)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                  className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/40 text-sm font-['Inter'] outline-none focus:outline-none focus:ring-2 focus:ring-black/30 transition-all"
                  required
                  minLength={10}
                />
              </div>
              {errorMsg && (
                <p className="text-red-500 text-xs mt-2 font-['Inter'] font-medium">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !name || phone.length < 10}
                className="mt-4 w-full bg-black/90 text-white rounded-2xl py-3.5 font-['Inter'] text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Complete Enrollment →"}
              </button>
            </form>
          )}

          {/* ── LOADING / REDIRECT ── */}
          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <Loader2 size={32} className="animate-spin text-black/80" />
              <p className="text-black/90 font-medium font-['Inter'] drop-shadow-sm">
                Redirecting to checkout…
              </p>
              <p className="text-black/50 text-xs font-['Inter']">
                Please don't close this window
              </p>
            </div>
          )}

          {/* ── ERROR ── */}
          {step === "error" && (
            <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100/80 backdrop-blur-sm flex items-center justify-center">
                <X size={20} className="text-red-600" />
              </div>
              <p className="text-black/90 font-medium font-['Inter'] drop-shadow-sm">
                Something went wrong
              </p>
              <p className="text-black/60 text-sm font-['Inter']">{errorMsg}</p>
              <button
                onClick={() => { setStep("email"); setErrorMsg(""); setOtp(""); }}
                className="text-sm text-black/70 underline hover:text-black/90 font-['Inter'] hover:no-underline transition-colors"
              >
                Try again
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}