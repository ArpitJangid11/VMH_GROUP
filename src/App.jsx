import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import translations from './translations';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Faqs from './pages/Faqs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Surveys from './pages/Surveys';
import SurveyPage from './pages/QuestionSurevy';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null);
  const t = translations[language];

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('keeplogin'));
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (isLoggedIn && savedUser) {
      setUser(savedUser); // restore user from localStorage
    }
  }, []);

  return (
    <Router>
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
            <Route path="/dashboard" element={<Dashboard t={t} user={user} setUser={setUser}/>} />
            <Route path="/surveys" element={<Surveys t={t} />} />
            <Route path="/surveys/:label" element={<SurveyPage t={t} />} />
            <Route path="/faqs" element={<Faqs t={t} />} />
            <Route path="/contact" element={<Contact t={t} />} />
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
