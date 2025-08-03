import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Shield, User, LogOut, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/faqs', key: 'faqs' },
  { to: '/contact', key: 'contact' },
];

const LANGS = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', label: 'عربي',   flag: '🇸🇦' },
  { code: 'zh', label: '中國人',  flag: '🇨🇳' },
];

export default function Navbar({ language, setLanguage, t, user, setUser }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenLang(false);
      setOpenMenu(false);
    };
    if (openLang || openMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openLang, openMenu]);

  const isActive = (route) => pathname === route;
  const currentLang = LANGS.find((l) => l.code === language) ?? LANGS[0];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    setOpenMenu(false);
  };

  return (
    <nav 
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-6xl 
        rounded-full transition-all duration-300 ease-out
        ${scrolled 
          ? 'bg-white shadow-2xl border-2 border-blue-100' 
          : 'bg-white/95 shadow-xl border-2 border-blue-200'
        }`}
    >
      <div className="flex items-center justify-between px-4 py-2 lg:px-5 lg:py-1">
        
        {/* CLEAN BRAND */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-400 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl font-bold text-white">V</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-blue-700 text-2xl group-hover:text-blue-600 transition-colors">VMH</span>
            <span className="font-medium text-blue-400 text-sm -mt-1 tracking-wide">Market Research</span>
          </div>
        </Link>

        {/* CLEAN DESKTOP MENU */}
        <div className="hidden lg:flex flex-1 justify-center items-center mx-8">
          <div className="flex items-center space-x-2 bg-blue-50 rounded-full p-2 border border-blue-100">
            {NAV_LINKS.map(({ to, key }) => (
              <Link
                key={to}
                to={to}
                className={`
                  relative rounded-full px-6 py-2 text-base font-semibold transition-all duration-300
                  group hover:scale-105
                  ${isActive(to) 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                    : 'text-blue-700 hover:bg-white hover:shadow-md'
                  }
                `}
              >
                <span className="relative z-10">{t[key]}</span>
                {isActive(to) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* CLEAN RIGHT SECTION */}
        <div className="flex items-center space-x-3">
          {/* Auth Section */}
          {user ? (
            <div className="hidden md:flex items-center space-x-2">
              {user.role === 'admin' ? (
                <>
                  <Link  
                    to="/admin"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-sm flex items-center font-semibold space-x-2 hover:from-blue-200 hover:to-blue-100 transition-all duration-300 border border-blue-200 hover:scale-105"
                  >
                    <Shield size={16} />
                    <span>{t.admin}</span>
                  </Link>
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
                  <Link 
                    to="/dashboard"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-sm flex items-center font-semibold space-x-2 hover:from-blue-200 hover:to-blue-100 transition-all duration-300 border border-blue-200 hover:scale-105"
                  >
                    <User size={16} />
                    <span>{t.dashboard}</span>
                  </Link>
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
            <Link
              to="/login"
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-600 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t.join}
            </Link>
          )}

          {/* Language Picker */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setOpenLang(!openLang)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-blue-100 hover:bg-blue-50 transition-all duration-300 text-blue-700 font-medium hover:scale-105 hover:shadow-md"
            >
              <Globe size={16} />
              <span className="text-lg">{currentLang.flag}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${openLang ? 'rotate-180' : ''}`} />
            </button>
            
            {openLang && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border-2 border-blue-100 shadow-2xl z-50 overflow-hidden">
                {LANGS.map((l, index) => (
                  <button
                    key={l.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage(l.code);
                      setOpenLang(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-blue-50 transition-all duration-200
                      ${index === 0 ? 'rounded-t-2xl' : ''}
                      ${index === LANGS.length - 1 ? 'rounded-b-2xl' : ''}
                      ${language === l.code ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-blue-800'}`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span>{l.label}</span>
                    {language === l.code && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Burger */}
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

      {/* CLEAN MOBILE MENU */}
      {openMenu && (
        <div 
          className="lg:hidden absolute top-full left-0 right-0 mt-1 mx-2 bg-white rounded-3xl shadow-2xl border-2 border-blue-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-1 space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {NAV_LINKS.map(({ to, key }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpenMenu(false)}
                  className={`block w-full rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-300
                    ${isActive(to) 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100 hover:scale-[1.02]'
                    }`}
                >
                  {t[key]}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-blue-100 pt-4 space-y-3">
              {user ? (
                user.role === 'admin' ? (
                  <>
                    <Link
                      to="/admin"
                      onClick={() => setOpenMenu(false)}
                      className="w-full flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-3 font-semibold hover:from-blue-200 hover:to-blue-100 transition-all border border-blue-200"
                    >
                      <Shield size={18} />
                      <span>{t.admin}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-100 to-red-50 text-red-600 px-4 py-3 font-medium hover:from-red-200 hover:to-red-100 transition-all border border-red-200"
                    >
                      <LogOut size={18} />
                      <span>{t.logout}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpenMenu(false)}
                      className="w-full flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-3 font-semibold hover:from-blue-200 hover:to-blue-100 transition-all border border-blue-200"
                    >
                      <User size={18} />
                      <span>{t.dashboard}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-100 to-red-50 text-red-600 px-4 py-3 font-medium hover:from-red-200 hover:to-red-100 transition-all border border-red-200"
                    >
                      <LogOut size={18} />
                      <span>{t.logout}</span>
                    </button>
                  </>
                )
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpenMenu(false)}
                  className="block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 font-bold text-center hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg"
                >
                  {t.join}
                </Link>
              )}

              {/* Mobile Language Selection */}
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <label className="block text-blue-700 font-semibold mb-2 text-sm">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl bg-white py-2 px-3 font-medium text-blue-800 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {LANGS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
