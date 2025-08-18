import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import GDPRPage from './pages/GDPRPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HowItWorks from './pages/HowItWorks';
import ScrollToTop from './components/ScrollToTop';
import WhyChooseUs from './pages/WhyChooseUs';

// Layout wrapper that adds padding conditionally
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/'; // check if current page is home
  return (
    <main
      className={`flex-grow w-full mb-20 ${
        isHome ? 'mt-24' : 'pt-24'
      }`}
    >
      {children}
      <CookieBanner />
    </main>
  );
};

const AppContent = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'; // Load saved language
  });
  const [user, setUser] = useState(null);

  const t = translations[language];
  useEffect(() => {
    
    localStorage.setItem('language', language);
     
  }, [language]);

  useEffect(() => {
    try {
      const savedUserString = localStorage.getItem('user');
      if (savedUserString && savedUserString !== 'undefined') {
        setUser(JSON.parse(savedUserString));
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user');
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar
          language={language}
          setLanguage={setLanguage}
          t={t}
          user={user}
          setUser={setUser}
        />
            <div className="mt-2">
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home t={t} user={user} />} />
            <Route path="/about" element={<About t={t} user={user} />} />
            <Route path="/login" element={<Login t={t} setUser={setUser} />} />
            <Route path="/signup" element={<Signup t={t} setUser={setUser} />} />
            <Route path="/faqs" element={<Faqs t={t} />} />
            <Route path="/contact" element={<Contact t={t} />} />
            <Route path="/forgot-password" element={<ForgotPassword t={t} />} />
            <Route path="/reset-password" element={<ResetPassword t={t} />} />
            <Route path="/gdpr" element={<GDPRPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin t={t} user={user} />} />
            <Route path="/admin/manageuser" element={<ManageUsers t={t} user={user} />} />
            <Route path="/admin/managesurvey" element={<ManageSurveys t={t} user={user} />} />
            <Route path="/admin/assignsurvey" element={<AssignSurveys t={t} user={user} />} />
            <Route path="/admin/rewardpanel" element={<RewardsPanel t={t} user={user} />} />
            <Route path="/admin/edit-user-role" element={<EditUserRole />} />
            <Route path="/admin/profile" element={<AdminProfile t={t} user={user} setUser={setUser} />} />
            <Route path="/admin/edit-survey/:id" element={<EditSurvey />} />

            {/* User Routes */}
            <Route path="/dashboard" element={<UserDashboard t={t} user={user} setUser={setUser} />} />
            <Route path="/profile" element={<AdminProfile t={t} user={user} setUser={setUser} />} />
            <Route path="/survey-history" element={<SurveyHistory t={t} user={user} setUser={setUser} />} />
            <Route path="/earnings" element={<PointsRewards t={t} user={user} setUser={setUser} />} />
            <Route path="/surveys" element={<Surveys t={t} />} />
            <Route path="/refer" element={<Refer t={t} />} />
            <Route path="/notifications" element={<Notification t={t} />} />
          </Routes>
        </MainLayout>
          </div>
        <Footer />
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
