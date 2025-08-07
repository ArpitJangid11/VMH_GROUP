import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import vertor from "../../public/images/login-vector.png"
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { loginUser, resendVerificationOtp, verifyOtps } from "../services/userService";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { token, user } = await loginUser({ email, password });

      if (!token) {
        setError("Invalid login credentials");
        return;
      }
        const {jobsTitle} = "";
      localStorage.setItem("token", token);
      localStorage.setItem("jobsTitle", jobsTitle);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      console.log("Jobtitle = ",user.jobTitle);
      
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      if(err.response?.data?.message === "Please verify your email first"){
        setVerified(true)
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
      setVerified(false)
      setNowLogin(true)
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setFirst(true)
      setLoading(true)
      const { message } = await resendVerificationOtp(email);
      setError(message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen mt-27 flex flex-col">
      {/* Main Content Area - Fixed height and scroll */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Vector Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
          {/* VMH Group Branding - Top */}
          <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center pt-8 pb-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2 tracking-tight text-blue-900">VMH Group</h1>
            </div>
          </div>
          
          {/* Vector Image Container - Below Title */}
          <div className="absolute inset-0 flex items-center justify-center p-8 pt-32">
            <img 
              src="/images/login-vector.png" 
              alt="Login illustration" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side - Clean Functional Form with Scroll */}
        <div className="w-full lg:w-1/2 bg-gray-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-8">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">VMH Group</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">
                  Still don't have an account?{" "}
                  <Link to="/signup" className="text-blue-500 hover:underline font-medium hover:text-blue-700 transition-colors duration-200">
                    Sign up
                  </Link>
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>

                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500 hover:bg-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                    )}
                  </button>
                </div>

                {!verified && (
                  <div className="flex items-center justify-end">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-500 hover:underline font-medium hover:text-blue-700 transition-colors duration-200"
                    >
                      Forget Password?
                    </Link>
                  </div>
                )}

                {verified && (
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
                    <h3 className="text-lg font-medium mb-4 text-center text-blue-700">
                      Verify Your Email
                    </h3>
                    <p className="text-gray-700 mb-4 text-center">
                      OTP will be sent to your email: <span className="font-medium text-blue-800">{email}</span>
                    </p>
                    
                    {first && (
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full p-4 bg-white border border-gray-200 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    )}
                    
                    {first && (
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className={`w-full py-4 mb-4 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className={`w-full py-4 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-900 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {loading ? "Sending..." : (first ? "Resend OTP" : "Send OTP")}
                    </button>
                  </div>
                )}

                {nowLogin ? (
                  <p className="text-green-600 text-sm font-medium text-center animate-pulse">Login Now</p>
                ) : (
                  error && <p className="text-red-600 text-sm text-center animate-pulse">{error}</p>
                )}

                {!verified && (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 font-medium rounded-lg transition-all duration-200 shadow-lg transform hover:scale-105 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-900 hover:shadow-xl hover:-translate-y-1"
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
      </div>

      {/* Copyright Footer with Social Media on Right - DARK THEME */}
      <div className="text-gray-800 bg-white py-4 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Copyright Text - Left Side */}
          <div className="text-sm opacity-70">
            Copyright © All Rights Reserved. VMH Groups.
          </div>
          
          {/* Social Media Icons - Right Side */}
          <div className="flex space-x-3">
            <a href="#" className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
