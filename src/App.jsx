import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import translations from './translations';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import UserDashboard from './pages/userPages/UserDashboard';
import Faqs from './pages/Faqs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Surveys from './pages/userPages/Surveys';
import Admin from './pages/adminPages/AdminDashboard';
import ManageUsers from './pages/adminPages/ManageUsers';
import AdminProfile from './pages/adminPages/AdminProfile';
import ManageSurveys from './pages/adminPages/ManageSurveys';
import AssignSurveys from './pages/adminPages/AssignSurveys';
import RewardsPanel from './pages/adminPages/RewardsPanel';
import EditSurvey from './pages/adminPages/EditSurvey';
import Refer from './pages/userPages/Refer';
import PointsRewards from './pages/userPages/Rewards';
import SurveyHistory from './pages/userPages/SurveyHistory';
import EditUserRole from './pages/adminPages/EditUserRole';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Notification from './pages/userPages/Notification';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);

  const t = translations[language];

  useEffect(() => {
    try {
      const savedUserString = localStorage.getItem("user");

      if (savedUserString && savedUserString !== "undefined") {
        const savedUser = JSON.parse(savedUserString);
        setUser(savedUser);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <Router future={{v7_relativeSplatPath: true,}}>
      <div className="min-h-screen bg-gray-100">
        <Navbar
          language={language}
          setLanguage={setLanguage}
          t={t}
          user={user}
          setUser={setUser}
        />
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home t={t} user={user} />} />
            <Route path="/about" element={<About t={t} />} />
            <Route path="/login" element={<Login t={t} setUser={setUser} />} />
            <Route path="/signup" element={<Signup t={t} setUser={setUser} />} />
            <Route path="/faqs" element={<Faqs t={t} />} />
            <Route path="/contact" element={<Contact t={t} />} />
            <Route path="/forgot-password" element={<ForgotPassword t={t}/>} />
            <Route path="/reset-password" element={<ResetPassword t={t} />} />

            {/* Admin side routes */}
            <Route path="/admin" element={<Admin t={t} user={user} />} />
            <Route path="/admin/manageuser" element={<ManageUsers t={t} user={user} />} />
            <Route path="/admin/managesurvey" element={<ManageSurveys t={t} user={user} />} />
            <Route path="/admin/assignsurvey" element={<AssignSurveys t={t} user={user} />} />
            <Route path="/admin/rewardpanel" element={<RewardsPanel t={t} user={user} />} />
            <Route path="/admin/edit-user-role" element={<EditUserRole />} />

            <Route path="/admin/profile" element={<AdminProfile t={t} user={user} setUser={setUser}/>} />
            <Route path="/admin/edit-survey/:id" element={<EditSurvey />} />

            {/* user side  routes */}
            <Route path="/dashboard" element={<UserDashboard t={t} user={user} setUser={setUser} />} />
            <Route path="/profile" element={<AdminProfile t={t} user={user} setUser={setUser} />} />
            <Route path="/survey-history" element={<SurveyHistory t={t} user={user} setUser={setUser} />} />
            <Route path="/earnings" element={<PointsRewards t={t} user={user} setUser={setUser} />} />
            <Route path="/surveys" element={<Surveys t={t} />} />
            <Route path="/refer" element={<Refer t={t} />} />
            <Route path="/notifications" element={<Notification t={t} />} />

            
          </Routes>
        </main>
        <footer className="bg-blue-900 text-white p-4 text-center">
          <p>&copy; 2025 VMH Groups Market Research. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
