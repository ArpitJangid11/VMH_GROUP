import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield, User, LogOut, ChevronDown } from 'lucide-react';
import { MdOutlineTranslate } from "react-icons/md";
import VmhLogo from '/images/vmh-logo.png';

const NAV_LINKS = [
  { id: 'about', key: 'aboutUs' },
  { id: 'how-it-works', key: 'howItWorks' },
  { id: 'why-us', key: 'whyUs' },
  { id: 'steps-to-join', key: 'stepsToJoin' },
];

const LANGS = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', label: 'عربي', flag: '🇸🇦' },
  { code: 'zh', label: '中國人', flag: '🇨🇳' },
];

export default function Navbar({ language, setLanguage, t, user, setUser }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLang = LANGS.find((l) => l.code === language) ?? LANGS[0];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    setOpenMenu(false);
  };

  // Smooth scroll handler
  const handleNavClick = (id) => {
    if (pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
        ${scrolled
          ? 'bg-white shadow-lg border-b border-blue-100 backdrop-blur-md'
          : 'bg-white/30 backdrop-blur-sm'
        }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-2 py-1 lg:px-2">

        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center space-x-3 group">
          <img
            src={VmhLogo}
            alt="VMH Group Logo"
            className="h-20 w-auto group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="font-bold text-blue-700 text-2xl group-hover:text-blue-600 transition-colors">VMH</span>
            <span className="font-medium text-blue-400 text-sm -mt-1 tracking-wide">PANEL REWARDS</span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center items-center mx-8">
          <div className="flex items-center space-x-2 bg-blue-50 rounded-full p-2 border border-blue-100">
            {NAV_LINKS.map(({ id, key }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="relative rounded-full px-6 py-2 text-base font-semibold transition-all duration-300
                           group hover:scale-105 text-blue-700 hover:bg-white hover:shadow-md"
              >
                <span className="relative z-10">{t[key]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="hidden md:flex items-center space-x-2">
              {user.role === 'admin' ? (
                <>
                  <button
                    onClick={() => navigate("/admin")}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-sm flex items-center font-semibold space-x-2 hover:from-blue-200 hover:to-blue-100 transition-all duration-300 border border-blue-200 hover:scale-105"
                  >
                    <Shield size={16} />
                    <span>{t.admin}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-50 text-red-600 flex items-center text-sm font-medium space-x-2 hover:from-red-200 hover:to-red-100 transition-all duration-300 border border-red-200 hover:scale-105"
                  >
                    <LogOut size={16} />
                    <span>{t.logout}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-sm flex items-center font-semibold space-x-2 hover:from-blue-200 hover:to-blue-100 transition-all duration-300 border border-blue-200 hover:scale-105"
                  >
                    <User size={16} />
                    <span>{t.dashboard}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-red-50 text-red-600 flex items-center text-sm font-medium space-x-2 hover:from-red-200 hover:to-red-100 transition-all duration-300 border border-red-200 hover:scale-105"
                  >
                    <LogOut size={16} />
                    <span>{t.logout}</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-600 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.join}
            </button>
          )}

          {/* Language Picker */}
          <div className="hidden lg:block relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-blue-100 hover:bg-blue-50 transition-all duration-300 text-blue-700 font-medium hover:scale-105 hover:shadow-md"
            >
              <MdOutlineTranslate size={16} />
              <span className="text-lg">{currentLang.flag}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${openLang ? 'rotate-180' : ''}`} />
            </button>

            {openLang && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl z-50 overflow-hidden">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage(l.code);
                      setOpenLang(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-blue-50 transition-all duration-200
                      ${language === l.code ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-blue-800'}`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(!openMenu);
            }}
            className="lg:hidden p-2 rounded-full bg-white border border-blue-100 text-blue-700 hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu size={20} className={`absolute inset-0 transition-all duration-300 ${openMenu ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <X size={20} className={`absolute inset-0 transition-all duration-300 ${openMenu ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 mt-1 mx-2 bg-white rounded-3xl shadow-2xl border-2 border-blue-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {NAV_LINKS.map(({ id, key }) => (
                <button
                  key={id}
                  onClick={() => {
                    handleNavClick(id);
                    setOpenMenu(false);
                  }}
                  className="block w-full rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-300 bg-blue-50 text-blue-800 hover:bg-blue-100 hover:scale-[1.02]"
                >
                  {t[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
