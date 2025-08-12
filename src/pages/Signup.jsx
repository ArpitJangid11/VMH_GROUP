import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiPhone, FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { signupUser, verifyOtp, loginUser, resendVerificationOtp } from "../services/userService";

const Signup = ({ t = {}, setUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75;
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Phone: keep digits only, up to 15 (E.164)
  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 15);
    setFormData((p) => ({ ...p, phone: digits }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signupUser(formData);
      setStep("otp");
      setInfo(`We sent an OTP to ${formData.email}.`);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    try {
      await verifyOtp({ email: formData.email, otp });
      const { token, user } = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser?.(user);
      navigate(user?.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message || "OTP verification or login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setInfo("");
    try {
      const { message } = await resendVerificationOtp({ email: formData.email });
      setInfo(message || "OTP resent successfully.");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification Screen
  if (step === "otp") {
    return (
      <div className="relative min-h-screen w-full mt-12 overflow-x-hidden">
        <video
          ref={videoRef}
          className="fixed inset-0 w-full h-full object-cover object-center -z-10"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/login-bg.mp4"
          poster="/images/login-video-poster.jpg"
        />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
          <div className="w-full max-w-md">
            <div className="backdrop-blur-md bg-white/75 rounded-2xl border border-white/40 shadow-xl sm:shadow-2xl">
              <div className="px-5 sm:px-8 pt-8 pb-4 text-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg sm:text-xl">V</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">VMH Group</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-blue-900">Verify Your Email</h2>
                <p className="text-gray-600 mb-2 sm:mb-4">
                  OTP sent to: <span className="font-medium text-blue-800 break-all">{formData.email}</span>
                </p>
              </div>

              <div className="px-5 sm:px-8 pb-6 sm:pb-8">
                {info && (
                  <div className="text-blue-700 bg-blue-50 border border-blue-200 rounded p-2 text-sm text-center mb-3">
                    {info}
                  </div>
                )}
                {error && (
                  <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm text-center mb-3">
                    {error}
                  </div>
                )}

                <form onSubmit={handleOtpVerify} className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={6}
                    required
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    aria-label="Enter 6-digit OTP"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 sm:py-4 font-medium rounded-lg transition-all duration-200 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-800 shadow-md sm:shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {loading ? "Verifying..." : "Verify OTP & Login"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className={`w-full py-3 font-medium rounded-lg transition-all duration-200 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-white border border-blue-400 text-blue-700 hover:bg-blue-50 shadow-sm"
                    }`}
                  >
                    Resend OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Signup Screen
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover object-center -z-10"
        autoPlay
        muted
        loop
        playsInline
        src="/videos/login-bg.mp4"
        poster="/images/login-video-poster.jpg"
      />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-white/75 rounded-2xl shadow-xl sm:shadow-2xl border border-white/40 overflow-hidden">
            <div className="px-5 sm:px-8 pt-8 pb-5 text-center">
              <div className="flex items-center justify-center mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg sm:text-xl">V</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-800">VMH Group</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium hover:text-blue-700">
                  {t.login || "Log in"}
                </Link>
              </p>
            </div>

            <div className="px-5 sm:px-8 pb-6 sm:pb-8">
              {info && (
                <div className="text-blue-700 bg-blue-50 border border-blue-200 rounded p-2 text-sm text-center mb-3">
                  {info}
                </div>
              )}
              {error && (
                <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm text-center mb-3">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4 sm:space-y-6">
                {/* Full Name */}
                <div className="relative group">
                  <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={t?.name || "Full Name"}
                    required
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t?.email || "Your Email"}
                    required
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>

                {/* Phone */}
                <div className="relative group">
                  <FiPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={t?.phone || "Phone Number"}
                    required
                    inputMode="numeric"
                    pattern="\d{10,15}"
                    aria-describedby="phoneHelp"
                    className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t?.password || "Password"}
                    required
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative group">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showCPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t?.confirmPassword || "Confirm Password"}
                    required
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-3 sm:py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowCPassword((v) => !v)}
                    aria-label={showCPassword ? "Hide confirm password" : "Show confirm password"}
                    aria-pressed={showCPassword}
                  >
                    {showCPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 p-3 sm:p-2 bg-gray-50 rounded-lg cursor-pointer mb-1 sm:mb-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to{" "}
                    <Link to="/gdpr" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">
                      {t?.consent || "terms & policies"}
                    </Link>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 sm:py-4 font-medium rounded-lg transition-all duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-900 shadow-md sm:shadow-lg hover:shadow-xl hover:-translate-y-0 sm:hover:-translate-y-1"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Registering...
                    </span>
                  ) : (
                    t?.submit || "Sign Up"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer note placement-friendly for small screens */}
          <div className="mt-4 text-center text-xs text-white/80">
            © {new Date().getFullYear()} VMH Group. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
