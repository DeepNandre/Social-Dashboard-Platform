import React, { useState, useContext } from 'react';
import { ArrowLeft, Menu, X, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NotificationCenter } from './NotificationCenter';
import { useUser } from '../context/UserContext';
import { UserContext } from '../context/UserContext';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Simple logout without MSAL
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {!isHome && (
              <Link
                to="/"
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-5 h-5 text-[#4076bb]" />
              </Link>
            )}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/enspec-logo.png" 
                alt="Enspec Power Logo" 
                className="h-12 w-auto" 
              />
              <div className="hidden md:block h-6 w-px bg-gray-200"></div>
              <span className="hidden md:block text-sm font-medium text-gray-600">Analytics Dashboard</span>
            </Link>
          </div>
          
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isHome ? 'text-[#4076bb] bg-blue-50' : 'text-gray-600 hover:text-[#4076bb] hover:bg-gray-50'}`}>
                Home
              </Link>
              <a href="https://www.enspecpower.com" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-[#4076bb] hover:bg-gray-50 transition-colors">
                Main Website
              </a>
              
              {/* Notification Center */}
              <NotificationCenter />
              
              {/* User menu */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4076bb]"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => navigate('/profile')}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-[#4076bb] text-white flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#4076bb]" />
            ) : (
              <Menu className="w-5 h-5 text-[#4076bb]" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && user && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isHome ? 'text-[#4076bb] bg-blue-50' : 'text-gray-600 hover:text-[#4076bb] hover:bg-gray-50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#4076bb] hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <a 
              href="https://www.enspecpower.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#4076bb] hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Main Website
            </a>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}