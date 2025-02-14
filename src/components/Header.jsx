import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Header({ darkMode, setDarkMode }) {
  const { currentUser, login, logout } = useUser();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Slot Booking App
        </Link>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {currentUser ? (
            <>
              <Link to="/manage-slots" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Manage Slots
              </Link>
              <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Profile
              </Link>
              <button onClick={logout} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Logout
              </button>
            </>
          ) : (
            <button onClick={login} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Login
            </button>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;