import { useEffect, useState } from 'react';
import { signupUser } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard'

const Signup = ({ t, setUser }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', age: '', gender: '', country: '', jobTitle: '', industry: '',password: '', consent: false,
  });
  const navigate = useNavigate();
  const [dash,setDash]= useState(false)

      const handleSignup = async (e) => {
        e.preventDefault();

        if (!formData.consent) {
          alert('Please agree to the GDPR terms.');
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        
        try {
          const response = await signupUser(formData);  // this sends the data to Airtable
          setUser(response); // you store the returned user (optional)
          // setPage('dashboard'); // go to dashboard
          alert('Registration successful!');
          setDash(true)
          // navigate(Dashboard)
        } catch (error) {
          console.error('Signup error:', error);
          alert('Registration failed. Please try again.');
        }
      };
      useEffect(()=>{
        if(dash){
          navigate('/Dashboard')
        }
      })
      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
      };
//  console.log(formData);
 
  return (
     <div className="max-w-lg mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">{t.signup}</h2>
                  <p className="text-gray-600 text-center mb-8">Join our research community today</p>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder={t.name}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder={t.email}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                      <input
                        type="number"
                        name="age"
                        placeholder={t.age}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <select
                      name="gender"
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">{t.gender}</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="text"
                      name="country"
                      placeholder={t.country}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="jobTitle"
                        placeholder={t.jobTitle}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                      <input
                        type="text"
                        name="industry"
                        placeholder={t.industry}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="password"
                        name="password"
                        placeholder={t.password }
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder={t.confirmPassword }
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <label className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        name="consent"
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                      />
                      <span className="text-sm text-gray-700">{t.consent}</span>
                    </label>
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {t.submit}
                    </button>
                  </form>
                  <p className="text-gray-600 cursor-pointer text-center mt-8 mb-8"> <Link  
                   to='/Login'>{t.login}  {t.here}</Link></p>
                </div>
              </div>
  );
};

export default Signup;
