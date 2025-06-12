// import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ language, setLanguage, t,user, setUser }) => {
   const navigate = useNavigate();
  // console.log(user);
  const handleLogout = () => {
     localStorage.removeItem('user');
     localStorage.removeItem('keeplogin');
     setUser(null);
     navigate('/login');
  }
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">VMH Groups</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">{t.home}</Link>
        <Link to="/about" className="hover:underline">{t.about}</Link>
        <Link to="/faqs" className="hover:underline">{t.faqs}</Link>
        <Link to="/contact" className="hover:underline">{t.contact}</Link>
        {user ?(
          <p onClick={handleLogout} className="hover:underline cursor-pointer">{t.logout}</p>
        ) :(<Link to="/login" className="hover:underline">{t.join}</Link>
        )
        }
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
    </nav>
  );
};

export default Navbar;
