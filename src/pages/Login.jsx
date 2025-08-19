import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser, resendVerificationOtp, verifyOtps } from "../services/userService";
import VmhLogo from '/images/vmh-logo.png';

const Login = ({ t, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [first, setFirst] = useState(false);
  const [nowLogin, setNowLogin] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75; // adjust speed as needed
    // Do NOT hide or alter any global footer here; layout will handle it.
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { token, user } = await loginUser({ email, password });
      console.log("Token from login:", token);
      if (!token) {
        setError("Invalid login credentials");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      if (err.response?.data?.message === "Please verify your email first") {
        setVerified(true);
      }
      setError(err.response?.data?.message || err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      await verifyOtps({ email, otp });
      setVerified(false);
      setNowLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setFirst(true);
      setLoading(true);
      const { message } = await resendVerificationOtp(email);
      setError(message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fixed background video */}
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
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 -z-5" />

      {/* Scrollable content, centered form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 py-8">
        <div className="w-full max-w-md my-8">
          <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
            {/* Header */}
            <div className="px-6 sm:px-8 pt-8 pb-6 text-center">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={VmhLogo} 
                  alt="VMH Group Logo" 
                  className="h-12 sm:h-16 lg:h-20 w-auto group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
              <p className="text-gray-700">
                Still don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline font-medium hover:text-blue-700"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Form */}
            <div className="px-6 sm:px-8 pb-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
                  />
                </div>

                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/80 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                </div>

                {!verified && (
                  <div className="flex items-center justify-end">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:underline font-medium hover:text-blue-700"
                    >
                      Forget Password?
                    </Link>
                  </div>
                )}

                {verified && (
                  <div className="mt-2 p-5 bg-blue-50/80 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-medium mb-3 text-center text-blue-700">
                      Verify Your Email
                    </h3>
                    <p className="text-gray-700 mb-4 text-center">
                      OTP will be sent to your email:{" "}
                      <span className="font-medium text-blue-800">{email}</span>
                    </p>

                    {first && (
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full p-4 bg-white border border-gray-200 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    )}

                    {first && (
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className={`w-full py-3 mb-3 font-medium rounded-lg ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                        }`}
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className={`w-full py-3 font-medium rounded-lg ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                      }`}
                    >
                      {loading ? "Sending..." : first ? "Resend OTP" : "Send OTP"}
                    </button>
                  </div>
                )}

                {nowLogin ? (
                  <p className="text-green-600 text-sm font-medium text-center">Login Now</p>
                ) : (
                  error && <p className="text-red-600 text-sm text-center">{error}</p>
                )}

                {!verified && (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 font-medium rounded-lg transition-all shadow-lg ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Logging in...
                      </span>
                    ) : (
                      t?.login || "Log In"
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* No local footer here — global/layout footer will render below this content */}
      </div>
    </div>
  );
};

export default Login;
