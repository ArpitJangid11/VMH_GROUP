import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, loginUser } from "../services/userService";

const Login = ({ t, setUser }) => {
  const [email, setEmail] = useState("");                                            
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { token } = await loginUser({ email, password });

    if (!token) {
      alert("Invalid login credentials");
      return;
    }

    // ✅ Save token BEFORE calling getProfile
    localStorage.setItem("token", token);

    const user = await getProfile();

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    navigate(user.role === "admin" ? "/admin" : "/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || err.message || "Login failed. Try again.");
  } finally {
    setLoading(false);
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
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? "Logging in" : t.login}
          </button>
        </form>
        <p className="text-gray-600 text-center mt-8 mb-1">
          <Link to="/signup">{t.signup} {t.here}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
