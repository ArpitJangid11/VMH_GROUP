import { useState } from "react";
import { sendForgotPasswordOtp } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";

const ForgotPassword = ({ t }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state added
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true); // ✅ Start loading

    try {
      const res = await sendForgotPasswordOtp(email);
      setMessage(res.message || "OTP sent to your email");
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to send OTP");
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  return (
    <div className="max-w-md mx-auto mt-27">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          {t.forgotPassword || "Forgot Password"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mb-4 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-600 hover:to-blue-800 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Sending..." : t.sendOtp || "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
