import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiPhone, FiUser, FiLock, FiEye, FiEyeOff, FiMapPin } from "react-icons/fi";
import { signupUser, verifyOtp, loginUser, resendVerificationOtp } from "../services/userService";

const Signup = ({ t, setUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    DOB: '',
    gender: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();

  // Input handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Form Submit
  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signupUser(formData);
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await verifyOtp({ email: formData.email, otp });
      const { token, user } = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const { message } = await resendVerificationOtp(formData.email);
      setError(message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- OTP Verification Screen ---
  if (step === "otp") {
    return (
      <div className="min-h-screen flex flex-col animate-fadeIn">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Branding & Image */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden transition-all duration-700">
            <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-8 pb-4">
              <h1 className="text-4xl font-bold mb-2 tracking-tight text-blue-900">VMH Group</h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-8 pt-32">
              <img
                src="/images/login-vector.png"
                alt="Sign up illustration"
                className="max-w-full max-h-full object-contain scale-105 opacity-90 transition duration-700"
              />
            </div>
          </div>
          {/* Right Side - OTP */}
          <div className="w-full lg:w-1/2 bg-gray-50 overflow-y-auto flex justify-center pt-8">
            <div className="w-full max-w-md fade-in-up pb-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">VMH Group</span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-blue-900">Verify Your Email</h2>
                <p className="text-gray-600 mb-4">
                  OTP sent to your email: <span className="font-medium text-blue-800">{formData.email}</span>
                </p>
              </div>
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {error && (
                  <div className="text-red-600 text-sm text-center animate-shake">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 mb-2 font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify OTP & Login"}
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className={`w-full py-3 font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-white border border-blue-400 text-blue-700 hover:bg-blue-50 shadow"
                  }`}
                >
                  Resend OTP
                </button>
              </form>
            </div>
          </div>
        </div>
        <style>{`
          .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.22,1,.36,1); }
          .fade-in-up { animation: fadeInUp 0.9s cubic-bezier(.22,1,.36,1); }
          @keyframes fadeIn { to { opacity: 1; } from { opacity: 0; } }
          @keyframes fadeInUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform:translateY(0);} }
          .animate-shake { animation: shake 0.3s; }
          @keyframes shake { 10%, 90% {transform: translateX(-1px);} 20%, 80% {transform: translateX(3px);} 30%, 50%, 70% {transform: translateX(-4px);} 40%, 60% {transform: translateX(4px);} }
        `}</style>
      </div>
    );
  }

  // --- MAIN SIGNUP FORM SCREEN ---
  return (
    <div className="min-h-screen flex flex-col mt-27 animate-fadeIn">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Branding & Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden transition-all duration-700">
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-8 pb-4">
            <h1 className="text-4xl font-bold mb-2 tracking-tight text-blue-900">VMH Group</h1>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-8 pt-32">
            <img
              src="/images/login-vector.png"
              alt="Sign up illustration"
              className="max-w-full max-h-full object-contain scale-105 opacity-90 transition duration-700"
            />
          </div>
        </div>
        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col h-screen">
          {/* This area is scrollable if the form is long and always shows from the top */}
          <div className="flex-1 overflow-y-auto flex justify-center pt-8">
            <div className="w-full max-w-md fade-in-up pb-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">VMH Group</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.signup || "Join Us"}</h2>
                <p className="text-gray-600">Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline font-medium hover:text-blue-700 transition-colors duration-200">
                    {t.login || "Login"}
                  </Link>
                </p>
              </div>
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Full Name */}
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={t.name || "Full Name"}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>
                {/* Email */}
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.email || "Your Email"}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>
                {/* Phone */}
                <div className="relative group">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.phone || "Phone Number"}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>
                {/* DOB & Gender on a row */}
                <div className="flex space-x-2">
                  <div className="relative w-1/2">
                    <input
                      type="date"
                      name="DOB"
                      value={formData.DOB}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-4 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    />
                  </div>
                  <div className="relative w-1/2">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-4 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    >
                      <option value="">{t.gender || "Gender"}</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                {/* Country */}
                <div className="relative group">
                  <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder={t.country || "Country"}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>
                {/* Address, City, State, Zip */}
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  required
                  className="w-full py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200 mb-2"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                    className="w-1/3 py-4 px-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                    className="w-1/3 py-4 px-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Zip Code"
                    required
                    className="w-1/3 py-4 px-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                </div>
                {/* Password and Confirm Password */}
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t.password || "Password"}
                    required
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showPassword
                      ? <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      : <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                  </button>
                </div>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showCPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t.confirmPassword || "Confirm Password"}
                    required
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-gray-500 hover:bg-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showCPassword
                      ? <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      : <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                  </button>
                </div>
                {/* Consent Checkbox */}
                <label className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{t.consent || "I agree to terms & policies"}</span>
                </label>
                {/* Error Message */}
                {error && <div className="text-red-600 text-sm text-center animate-shake">{error}</div>}
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 font-medium rounded-lg transition-all duration-200 shadow-lg hover:scale-[1.02] ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-900 hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Registering...
                    </span>
                  ) : (
                    t.submit || "Sign Up"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.22,1,.36,1); }
        .fade-in-up { animation: fadeInUp 0.9s cubic-bezier(.22,1,.36,1); }
        @keyframes fadeIn { to { opacity: 1; } from { opacity: 0; } }
        @keyframes fadeInUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform:translateY(0);} }
        .animate-shake { animation: shake 0.3s; }
        @keyframes shake { 10%, 90% {transform: translateX(-1px);} 20%, 80% {transform: translateX(3px);} 30%, 50%, 70% {transform: translateX(-4px);} 40%, 60% {transform: translateX(4px);} }
      `}</style>
    </div>
  );
};

export default Signup;
