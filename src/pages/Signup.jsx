import { useState } from 'react';
import { signupUser, verifyOtp, loginUser } from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ t, setUser }) => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', DOB: '', gender: '', country: '',
    address: '', city: '', state: '', zipCode: '',
    jobTitle: '', industry: '', employmentStatus: '', primaryBusiness: '',
    numberOfEmployees: '', revenueOrganization: '', higherDegree: '',
    incomeBeforeTax: '', totalMembers: '', children: '', retiredPerson: '',
    maritalStatus: '', password: '', confirmPassword: '',
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
      alert(error.response?.data?.message || "Registration failed.");
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
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed.");
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
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-centerr">Verify OTP</h2>
        <p className="text-gray-600 text-center mb-8">OTP sent to your email. Please check your inbox.</p>
        <form onSubmit={handleOtpVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white rounded"
          >
            {loading ? "Verifying..." : "Verify OTP & Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{t.signup}</h2>
        <p className="text-center text-gray-600 mb-6">Join our research community today</p>
        <form onSubmit={handleSignup} className="space-y-6">

          {/* Basic Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder={t.name} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="email" name="email" placeholder={t.email} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="tel" name="phone" placeholder={t.phone} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <div className="relative w-full">
  <input
    type="date"
    name="DOB"
    id="dob"
    max={new Date().toISOString().split("T")[0]}
    onChange={handleInputChange}
    required
    className="peer block w-full appearance-none border border-gray-300 bg-white px-3 pt-5 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <label
    htmlFor="dob"
    className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
  >
    Date of Birth
  </label>
</div>

              <select name="gender" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" defaultValue="">
                <option value="" disabled>{t.gender}</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="country" placeholder={t.country} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="text" name="address" placeholder="Street Address" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="text" name="city" placeholder="City" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="text" name="state" placeholder="State" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>

          {/* Professional Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Professional Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
               <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">What is your job title?</label>
                <select
                  name="jobTitle"
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  defaultValue=""
                >
                  <option value="" disabled>--Select One--</option>
                  <option value="C-level">C-level (CEO, CFO, CTO, CIO, CMO)</option>
                  <option value="Owner">Owner, Partners</option>
                  <option value="Vice President">Vice President</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Assistant">Assistant or Associate</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Intern">Intern</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="None">None of the above</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Which departments you work within at your organization:</label>
                 <select
                  name="departments"
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  defaultValue=""
                >
                  <option value="" disabled>--Select One--</option>
                  <option>Administration/General Staff</option>
                  <option>Customer Service/Client Service</option>
                  <option>Executive Leadership</option>
                  <option>Finance/Accounting</option>
                  <option>Human Resource</option>
                  <option>Legal/Law</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                  <option>Procurement</option>
                  <option>Sales/Business Development</option>
                  <option>Technology Development Hardware</option>
                  <option>Technology Development Software</option>
                  <option>Technology Implementation</option>
                  <option>Other</option>
                  <option>I don’t work</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Employment status:</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                  <option value="">--Select One--</option>
                  <option value="Employed for wages">Employed for wages</option>
                  <option value="Self employed">Self employed</option>
                  <option value="Employed full-time">Employed full-time</option>
                  <option value="Employed part-time">Employed part-time</option>
                  <option value="Contract/Freelancer">Contract, Freelancer or Temporary Employee</option>
                  <option value="Homemaker">A homemaker</option>
                  <option value="Student">A student</option>
                  <option value="Military">Military</option>
                  <option value="Retired">Retired</option>
                  <option value="Unable to work">Unable to work</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">What is your company’s primary type of business?:</label>
                <select
                  name="primaryBusiness"
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  defaultValue=""
                >
                  <option value="" disabled>--Select One--</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Aerospace and Defence">Aerospace and Defence</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Banking and Financial Service">Banking and Financial Service</option>
                  <option value="Chemicals">Chemicals</option>
                  <option value="Construction">Construction</option>
                  <option value="eCommerce">eCommerce</option>
                  <option value="Education">Education</option>
                  <option value="Energy">Energy</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Government and Public Sector">Government and Public Sector</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Life Science">Life Science</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Mining and Extraction">Mining and Extraction</option>
                  <option value="Non-profit Sector">Non-profit Sector</option>
                  <option value="Publishing and Media">Publishing and Media</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retail and Wholesale Trade">Retail and Wholesale Trade</option>
                  <option value="Technology">Technology</option>
                  <option value="Telecommunication">Telecommunication</option>
                  <option value="Transport">Transport</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Travel and Hospitality">Travel and Hospitality</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">How many employees work at your Organization (all locations)?:</label>
                <select name="numberOfEmployees" onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition" defaultValue="">
                  <option value="" disabled>--Select One--</option>
                  <option value="1 TO 49">1 TO 49 EMPLOYEES</option>
                  <option value="50 TO 249">50 TO 249 EMPLOYEES</option>
                  <option value="250 TO 499">250 TO 499 EMPLOYEES</option>
                  <option value="500 TO 999">500 TO 999 EMPLOYEES</option>
                  <option value="1000 TO 1999">1000 TO 1999 EMPLOYEES</option>
                  <option value="2000 TO 4999">2000 TO 4999 EMPLOYEES</option>
                  <option value="5000+">5000+ EMPLOYEES</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">What is the annual revenue for your organization?:</label>
                <select
                  name="revenueOrganization"
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  defaultValue=""
                >
                  <option value="" disabled>--Select One--</option>
                  <option value="UNDER $10000">UNDER $10000</option>
                  <option value="$10000-$24999">$10000-$24999</option>
                  <option value="$25000 - $49999">$25000 - $49999</option>
                  <option value="$50000 - $99999">$50000 - $99999</option>
                  <option value="$1MILLION – $4.99MILLION">$1MILLION – $4.99MILLION</option>
                  <option value="$5MILLION – $9.99MILLION">$5MILLION – $9.99MILLION</option>
                  <option value="$10MILLION – $49.99MILLION">$10MILLION – $49.99MILLION</option>
                  <option value="$50MILLION – $99.99MILLION">$50MILLION – $99.99MILLION</option>
                  <option value="$100MILLION – $249.99MILLION">$100MILLION – $249.99MILLION</option>
                  <option value="$250MILLION – $499.99MILLION">$250MILLION – $499.99MILLION</option>
                  <option value="$500MILLION – $999.99MILLION">$500MILLION – $999.99MILLION</option>
                  <option value="$1BILLION+">$1BILLION+</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  What is the highest degree or level of school you have completed?:
                </label>
                <select
                  name="higherDegree"
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  defaultValue=""
                  >
                  <option value="" disabled>--Select One--</option>
                  <option value="Nursery School to 8th Grade">Nursery School to 8th Grade</option>
                  <option value="Some High school">Some High school</option>
                  <option value="High school graduate">High school graduate</option>
                  <option value="Associate degree">Associate degree</option>
                  <option value="Bachelor's degree">Bachelor's degree</option>
                  <option value="Master's degree">Master's degree</option>
                  <option value="Professional degree">Professional degree</option>
                  <option value="Doctorate degree">Doctorate degree</option>
                </select>
              </div>
            </div>
          </div>

          {/* Household Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Household Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="number" name="incomeBeforeTax" placeholder="Income Before Tax" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="number" name="totalMembers" placeholder="Total Household Members" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="number" name="children" placeholder="Number of Children" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="number" name="retiredPerson" placeholder="Number of Retired Persons" onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <select name="maritalStatus" onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
                <option value="">Select Marital Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
            </div>
          </div>

          {/* Account Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Account Credentials</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="password" name="password" placeholder={t.password} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              <input type="password" name="confirmPassword" placeholder={t.confirmPassword} onChange={handleInputChange} required className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>

          {/* Consent */}
          <label className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
            <input type="checkbox" name="consent" onChange={handleInputChange} checked={formData.consent} required className="mt-1 h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-700">{t.consent}</span>
          </label>

          {/* Submit */}
          <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition disabled:opacity-50">
            {loading ? "Registering..." : t.submit}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to='/login' className="text-blue-600 hover:underline">{t.login} {t.here}</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
