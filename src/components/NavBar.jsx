import { useState, useEffect } from 'react';
import logo from '../assets/Travel.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userData');
    
    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="h-12 flex items-center">
          <Link to="/" onClick={handleNavClick}>
            <img src={logo} alt="Logo" className="h-full w-auto max-h-12" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link to="/aboutUs" className="hover:text-[#588157] transition-colors" onClick={handleNavClick}>Who we are</Link>
          <Link to="/community" className="hover:text-[#588157] transition-colors" onClick={handleNavClick}>Community</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-[#588157] transition-colors" onClick={handleNavClick}>Profile</Link>
              <button 
                onClick={handleLogout}
                className="hover:text-[#588157] transition-colors focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#588157] transition-colors" onClick={handleNavClick}>Login</Link>
              <Link to="/signup" className="hover:text-[#588157] transition-colors" onClick={handleNavClick}>Signup</Link>
            </>
          )}
          
          <Link to="/contact" aria-label="Contact Us" className="hover:text-[#588157] transition-colors flex items-center" onClick={handleNavClick}>
            <span className="text-xl">✆</span>
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-7 h-7 text-[#588157]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-40" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-8 flex flex-col space-y-6 text-lg font-medium animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-[#588157] focus:outline-none"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              &times;
            </button>
            <Link to="/aboutUs" className="hover:text-[#588157]" onClick={handleNavClick}>Who we are</Link>
            <Link to="/community" className="hover:text-[#588157]" onClick={handleNavClick}>Community</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="hover:text-[#588157]" onClick={handleNavClick}>Profile</Link>
                <button onClick={handleLogout} className="hover:text-[#588157] text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#588157]" onClick={handleNavClick}>Login</Link>
                <Link to="/signup" className="hover:text-[#588157]" onClick={handleNavClick}>Signup</Link>
              </>
            )}
            <Link to="/contact" aria-label="Contact Us" className="hover:text-[#588157] flex items-center" onClick={handleNavClick}>
              <span className="text-xl">✆</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
