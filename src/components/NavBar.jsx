import logo from '../assets/Travel.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* 🔹 Logo */}
        <div className="h-16">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-full w-auto" />
          </Link>
        </div>

        {/* 🔹 Navbar Links */}
        <div className="flex space-x-7 text-lg text-black">
          <Link to="/aboutUs" className="hover:text-gray-300">Who we are</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          <a href="#" className="hover:text-gray-300">✆</a>
        </div>

      </div>
    </nav>
  );
}
