import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // You should define this function in your API file

const Login = ({ t,setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      if (response) {
        setUser(response);
        // alert('Login successful!');
        // localStorage.setItem('',JSON.stringify(true))
        localStorage.setItem('user', JSON.stringify(response)); // 👈 store user
        localStorage.setItem('keeplogin', JSON.stringify(true));
        navigate('/dashboard'); 
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   console.log(formData);
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{t.login}</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder={t.email}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <input
            type="password"
            name="password"
            placeholder={t.password}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t.login}
          </button>
        </form>
          <p className="text-gray-600 text-center mt-8 mb-1"> <Link  
                            to='/signup'>{t.signup} {t.here}</Link></p>
      </div>
    </div>
  );
};

export default Login;
