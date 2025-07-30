import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, resendVerificationOtp, verifyOtps } from "../services/userService";

const Login = ({ t, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [first, setFirst] = useState(false);
  const [nowLogin, setNowLogin] = useState(false);
  const [error, setError] = useState(""); //  added error state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous error

    try {
      const { token, user } = await loginUser({ email, password });

      if (!token) {
        setError("Invalid login credentials");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      console.log(err.response);
      if(err.response?.data?.message === "Please verify your email first"){
        console.log("true");
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
    setError(message); // 👈 Now it's used — displays message as a success alert
  } catch (err) {
    setError(err.response?.data?.message || "Failed to resend OTP");
  }finally{
    setLoading(false)
  }
};

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{t.login}</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              {t.forgotPassword || "Forgot Password?"}
            </Link>
          </div>
         {verified && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-medium mb-2 text-center text-blue-700">
                  Verify Your Email
                </h3>
                <p className="text-gray-700 mb-2">
                  OTP will be sent to your email: <span className="font-medium text-blue-8 00">{email}</span>
                </p>
                {first &&
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-4 border border-gray-300 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />}
                {first &&
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className={`w-full px-6 py-4 mb-5 font-semibold rounded-lg transition-all duration-200 shadow-lg ${
                            loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 hover:shadow-xl"
                          }`}
                  >
                    Verify OTP
                  </button>
                }

                <button
                  type="button"
                  onClick={handleResendOtp}
                  className={`w-full px-6 py-4 mb-5 font-semibold rounded-lg transition-all duration-200 shadow-lg ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 hover:shadow-xl"
                        }`}
                >
                  {first?"Resend OTP ": "Send OTP"}
                </button>
              </div>
            )}
          {/*  Error display */}
          {
          nowLogin ?(<p className="text-green-600 text-sm">Login Now</p>) :
          (error && <p className="text-red-600 text-sm">{error}</p>)}
          {!verified &&
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-4 font-semibold rounded-lg transition-all duration-200 shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 hover:shadow-xl"
            }`}
          >
            {loading ? "Logging in" : t.login}
          </button>}
        </form>
        {!verified &&
        <p className="text-gray-600 text-center mt-8 mb-1">
          <Link to="/signup">{t.signup} {t.here}</Link>
        </p>}
      </div>
    </div>
  );
};

export default Login;
