import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-green-600 border-b-2 border-green-600 px-3 py-2 text-sm font-medium'
      : 'text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium';

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.jpg" alt="Farm Profit Pro Logo" className="h-10 w-10 object-contain" />
              <span className="ml-2 text-xl font-bold text-gray-900">Farm Profit Pro</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/profit-estimation" className={navLinkClass}>Profit Estimation</NavLink>
            <NavLink to="/price-history" className={navLinkClass}>Price History</NavLink>
            <NavLink to="/weather" className={navLinkClass}>Weather</NavLink>
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 focus:outline-none"
                >
                  <span>{user.name}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/signin" className={navLinkClass}>Sign In</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;