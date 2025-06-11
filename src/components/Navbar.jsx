import { Link } from 'react-router-dom';

const Navbar = ({ language, setLanguage, t }) => {
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">VMH Groups</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">{t.home}</Link>
        <Link to="/about" className="hover:underline">{t.about}</Link>
        <Link to="/signup" className="hover:underline">{t.join}</Link>
        <Link to="/faqs" className="hover:underline">{t.faqs}</Link>
        <Link to="/contact" className="hover:underline">{t.contact}</Link>
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
