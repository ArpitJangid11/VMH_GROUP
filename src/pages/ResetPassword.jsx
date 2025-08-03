import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword, sendForgotPasswordOtp } from "../services/userService";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const ResetPassword = ({ t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match");
    setLoading(false);
    return;
  }

  try {
    const res = await resetPassword({ email, otp, newPassword });
    setSuccess(res.message || "Password updated successfully.");
    setTimeout(() => navigate("/login"), 2000);
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Reset failed");
  } finally {
    setLoading(false);
  }
};
const handleResendOtp = async () => {
  try {
    setLoading(true)
    const { message } = await sendForgotPasswordOtp(email);
    setError(message); // 👈 Now it's used — displays message as a success alert
  } catch (err) {
    setError(err.response?.data?.message || "Failed to resend OTP");
  }finally{
    setLoading(false)
  }
};

  return (
    <div className="max-w-md mx-auto mt-27">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          {t.resetPassword || "Reset Password"}
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="text"
            placeholder={t.otp || "Enter OTP"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
             className="w-full pl-12 pr-12 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500 hover:bg-gray-200"
          />
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200" />
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Your Password"
              required
              className="w-full pl-12 pr-12 py-4 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500 hover:bg-gray-200"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-all duration-200"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? (
                <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
              )}
            </button>
          </div>
          <div className="relative"> 
            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors duration-200" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.confirmPassword || "Confirm Password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
         <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mb-4 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl"
            }`}
            >
            {loading ? "Updating..." : t.updatePassword || "Update Password"}
        </button>
        <button
          type="button"
          onClick={handleResendOtp}
         className={`w-full py-4 mb-4 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl"
          }`}
        >
          Resend OTP 
        </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
