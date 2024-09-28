import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");

      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-5xl font-bold"><Link to="/">Quantify</Link>  </div>
      <nav className="hidden md:flex space-x-4">
        {currentUser ? (
          <>
            <Link to="/community-chat" className="hover:text-gray-400">Community Chat</Link>
            <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
            <Link to="/register" className="hover:text-gray-400">Register</Link>
          </>
        )}
      </nav>
      <div className="md:hidden relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center focus:outline-none">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
            <div className="py-2">
              {currentUser ? (
                <>
                  <Link to="/community-chat" className="block px-4 py-2 text-sm hover:bg-gray-700">Community Chat</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-700">Login</Link>
                  <Link to="/register" className="block px-4 py-2 text-sm hover:bg-gray-700">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
