import { useState, useEffect } from "react";
import { UserPlus, X, Loader2, ArrowLeft } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import profile from "../assets/images/profile.png";
import dummy from "../assets/images/dummy-profile.jpeg";

const API_BASE = "https://users.api.lecturehead.com/v0";
const API_KEY = import.meta.env.VITE_LECTUREHEAD_API_KEY;

// Cookie utility functions
const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'consumerAuthToken') return value;
  }
  return null;
};

const setAuthCookie = (token) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30); // 30 days expiry
  document.cookie = `consumerAuthToken=${token}; domain=.agneljohn.in; path=/; expires=${expiryDate.toUTCString()}; Secure; SameSite=Lax`;
};

function parseError(data, fallback) {
  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.join(" ");
  }
  return data?.message || fallback;
}

// ─────────────────────────────────────────────
// LoginModal — standalone navbar login
// After successful OTP login: set cookie → fetch
// profile from /user/my-profile → update navbar
// ─────────────────────────────────────────────
function LoginModal({ onClose, onLoginSuccess }) {
  const [step, setStep] = useState("email"); // "email" | "otp" | "name"
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
    "Authorization": `Bearer ${API_KEY}`,
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
      // API shape: { data: { isExistingUser: bool } }
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

      // API shape: { data: { token, expiresAt, isNewUser } }
      // Note: login endpoint does NOT return user profile — fetch separately
      const token = data?.data?.token;
      if (!token) throw new Error("No token returned");
      setAuthCookie(token);

      // Fetch full profile from /user/my-profile
      const profileRes = await fetch(`${API_BASE}/user/my-profile`, {
        headers: {
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await profileRes.json();
      // Profile shape: { data: { id, name, firstName, lastName, email, phoneNumber, image } }
      const userProfile = profileRes.ok ? profileData?.data : null;

      // Store user profile in localStorage for persistence
      if (userProfile) {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
      }

      onLoginSuccess(userProfile, token);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
      setStep("otp");
    } finally {
      setLoading(false);
    }
  }

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

          {/* Label */}
          <div className="inline-flex items-center gap-1.5 bg-black/90 text-white text-xs font-['Inter'] px-3 py-1 rounded-full mb-5 backdrop-blur-sm">
            <span>Sign in to your account</span>
          </div>

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
                className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/40 text-sm font-['Inter'] outline-none focus:ring-2 focus:ring-black/30 transition-all"
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
                className="mt-4 w-full bg-black/90 text-white rounded-2xl py-3.5 font-['Inter'] text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Send OTP →"
                )}
              </button>
            </form>
          )}

          {/* ── OTP STEP ── */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setErrorMsg("");
                }}
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
              <p className="text-black/90 text-sm font-medium mb-5 font-['Inter']">
                {email}
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/30 text-xl font-bold tracking-[0.35em] text-center outline-none focus:ring-2 focus:ring-black/30 transition-all"
                autoFocus
              />
              {errorMsg && (
                <p className="text-red-500 text-xs mt-2 font-['Inter'] font-medium">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="mt-4 w-full bg-black/90 text-white rounded-2xl py-3.5 font-['Inter'] text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Verify & Sign In →"
                )}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doLogin();
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setStep("otp");
                  setErrorMsg("");
                }}
                className="flex items-center gap-1 text-black/50 text-xs mb-4 hover:text-black/80 transition-colors font-['Inter']"
              >
                <ArrowLeft size={13} /> Back
              </button>
              <h3 className="text-black/90 font-bold text-2xl tracking-tight mb-1 font-['Inter'] drop-shadow-sm">
                One last step
              </h3>
              <p className="text-black/60 text-sm mb-5 font-['Inter'] font-light">
                Create your account to complete sign in.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/40 text-sm font-['Inter'] outline-none focus:ring-2 focus:ring-black/30 transition-all"
                  required
                  autoFocus
                />
                <input
                  type="tel"
                  placeholder="Phone number (10 digits)"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))
                  }
                  className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-5 py-3.5 text-black/90 placeholder:text-black/40 text-sm font-['Inter'] outline-none focus:ring-2 focus:ring-black/30 transition-all"
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
                className="mt-4 w-full bg-black/90 text-white rounded-2xl py-3.5 font-['Inter'] text-sm font-medium flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [progress, setProgress] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      const token = getAuthToken();
      
      if (token) {
        try {
          // Fetch profile using the existing token
          const profileRes = await fetch(`${API_BASE}/user/my-profile`, {
            headers: {
              "x-api-key": API_KEY,
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const userProfile = profileData?.data;
            if (userProfile) {
              setUser(userProfile);
              localStorage.setItem('userProfile', JSON.stringify(userProfile));
            }
          } else {
            // Token is invalid, clear it
            document.cookie = "consumerAuthToken=; domain=.agneljohn.in; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            localStorage.removeItem('userProfile');
          }
        } catch (error) {
          console.error("Failed to fetch profile with existing token:", error);
        }
      } else {
        // Try to get user from localStorage as fallback
        const storedUser = localStorage.getItem('userProfile');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            localStorage.removeItem('userProfile');
          }
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", setProgress);
    return () => unsubscribe();
  }, [smoothProgress]);

  function handleLoginSuccess(userProfile) {
    // userProfile: { id, name, firstName, lastName, email, phoneNumber, image }
    setUser(userProfile);
    // Don't redirect immediately - let the user see the logged-in state
    // The profile click will handle navigation
    window.location.href = "https://app.agneljohn.in";
  }

  const handleProfileClick = () => {
    if (user) {
      // Navigate to app when profile is clicked
      window.location.href = "https://app.agneljohn.in";
    } else {
      // Open login modal if not logged in
      setShowLoginModal(true);
    }
  };

  const displayName = user?.firstName || user?.name?.split(" ")[0] || "Agnel John";
  const avatarSrc = user?.image || profile;

  // Don't render anything while checking session to prevent flash
  if (isLoading) {
    return null; // Or return a loading spinner if you prefer
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 max-w-[90rem] mx-auto">
        {/* Left — always shows owner profile pill */}
        <motion.button
          className="bg-white/40 text-black font-semibold text-sm pl-1 pr-5 py-1 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 backdrop-blur-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = profile;
            }}
          />
          Agnel John
        </motion.button>

        {/* Right — login button or logged-in user pill with animation */}
        <motion.button
          className="relative flex items-center gap-2 px-4 py-2 rounded-full group bg-white/40 backdrop-blur-sm cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProfileClick}
          style={{
            background: `linear-gradient(white, white) padding-box,
                        conic-gradient(from 0deg, #000000 ${progress * 360}deg, #e5e7eb ${progress * 360}deg) border-box`,
            border: "2px solid transparent",
            borderRadius: "999px",
          }}
        >
          {user ? (
            <>
              <img
                src={user.image || dummy}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover relative z-10"
                onError={(e) => {
                  e.currentTarget.src = dummy;
                }}
              />
              <span className="text-black font-semibold text-sm font-['Inter'] pr-1 relative z-10">
                {user.firstName || user.name?.split(" ")[0]}
              </span>
            </>
          ) : (
            <>
              <span className="text-black font-semibold text-sm relative z-10">
                Login
              </span>
              <div className="w-8 h-8 rounded-full bg-white hidden md:flex items-center justify-center group-hover:bg-gray-50 transition-all relative z-10 shadow-sm">
                <UserPlus
                  size={14}
                  className="text-gray-700 group-hover:text-black transition-colors"
                />
              </div>
            </>
          )}
        </motion.button>
      </nav>

      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}