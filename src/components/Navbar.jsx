import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional icons

const Navbar = ({ language, setLanguage, t, user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">VMH Groups</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:underline">{t.home}</Link>
          <Link to="/about" className="hover:underline">{t.about}</Link>
          <Link to="/faqs" className="hover:underline">{t.faqs}</Link>
          <Link to="/contact" className="hover:underline">{t.contact}</Link>
          {user ? (user.role === "admin" ? 
            <>
              <Link to="/admin" className="hover:underline">{t.admin}</Link>
              <button onClick={handleLogout} className="hover:underline"> {t.logout} </button>
            </>
            :
            <>
              <Link to="/dashboard" className="hover:underline">{t.dashboard}</Link>
              <button onClick={handleLogout} className="hover:underline"> {t.logout} </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">{t.join}</Link>
          )}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-black p-1 rounded"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-4 space-y-2 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>{t.home}</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>{t.about}</Link>
          <Link to="/faqs" onClick={() => setMenuOpen(false)}>{t.faqs}</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>{t.contact}</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>{t.dashboard}</Link>
              <button onClick={handleLogout}>{t.logout}</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>{t.join}</Link>
          )}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-black p-1 rounded"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
