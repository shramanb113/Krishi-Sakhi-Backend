import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, User, LogOut } from 'lucide-react';
import { useFarmer } from '../../context/FarmerContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { currentFarmer, setCurrentFarmer } = useFarmer();

  const handleLogout = () => {
    setCurrentFarmer(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Krishi Sakhi</h1>
              <p className="text-xs text-gray-500">കൃഷി സഖി</p>
            </div>
          </Link>

          {/* Navigation */}
          {currentFarmer && (
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/activities"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/activities')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Activities
              </Link>
              <Link
                to="/chat"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/chat')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                AI Assistant
              </Link>
              <Link
                to="/mandi-prices"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/mandi-prices')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Market Prices
              </Link>
              <Link
                to="/schemes"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/schemes')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Schemes
              </Link>
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {currentFarmer ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {currentFarmer.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({currentFarmer.farmerId})
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/onboarding"
                className="btn-primary"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;