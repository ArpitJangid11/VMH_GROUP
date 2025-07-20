import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../services/userService";

const ResetPassword = ({ t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          {t.resetPassword || "Reset Password"}
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="text"
            placeholder={t.otp || "Enter OTP"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <input
            type="password"
            placeholder={t.newPassword || "New Password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <input
            type="password"
            placeholder={t.confirmPassword || "Confirm Password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
         <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-lg transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
            >
            {loading ? "Updating..." : t.updatePassword || "Update Password"}
        </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
