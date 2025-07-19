import { useState } from 'react';
import { signupUser, verifyOtp, loginUser} from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ t, setUser }) => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', age: '', gender: '', country: '',
    jobTitle: '', industry: '', password: '', confirmPassword: '',
    role: 'user', consent: false,
  });

  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await signupUser(formData);
      setStep("otp");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await verifyOtp({ email: formData.email, otp });
      const { token, user } = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      // const temp = await getProfile()
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(formData));
      setUser(user);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification or login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (step === "otp") {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>
        <p className="text-gray-600 text-center mb-8">OTP sent to your email. Please check your inbox.</p>
        <form onSubmit={handleOtpVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? "Verifying..." : "Verify OTP & Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">{t.signup}</h2>
        <p className="text-gray-600 text-center mb-8">Join our research community today</p>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="fullName" placeholder={t.name} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            <input type="email" name="email" placeholder={t.email} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="tel" name="phone" placeholder={t.phone} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            <input type="number" name="age" placeholder={t.age} onChange={handleInputChange} required min="1" max="120" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          <select name="gender" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" defaultValue="">
            <option value="" disabled>{t.gender}</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" name="country" placeholder={t.country} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="jobTitle" placeholder={t.jobTitle} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            <input type="text" name="industry" placeholder={t.industry} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="password" name="password" autoComplete="new-password" placeholder={t.password} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            <input type="password" name="confirmPassword" autoComplete="new-password" placeholder={t.confirmPassword} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          
          <label className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" name="consent" onChange={handleInputChange} checked={formData.consent} required className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-sm text-gray-700">{t.consent}</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : t.submit}
          </button>
        </form>
        <p className="text-gray-600 text-center mt-8 mb-8">
          <Link to='/login' className="text-blue-600 hover:underline">{t.login} {t.here}</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
