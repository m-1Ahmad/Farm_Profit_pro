import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Sprout, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Sprout className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Farm Profit Pro</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
              <Link to="/crops" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Crops</Link>
              <Link to="/analytics" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Analytics</Link>
              <Link to="/reports" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Reports</Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;