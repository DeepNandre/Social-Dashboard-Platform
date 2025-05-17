import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Bell, 
  Settings,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="MetricFlow Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                MetricFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link 
              to="/analytics" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Analytics
            </Link>
            <Link 
              to="/content" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Content
            </Link>
            <Link 
              to="/team" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Team
            </Link>

            <div className="relative ml-3">
              <button
                type="button"
                className="flex items-center max-w-xs text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Open user menu</span>
                <User className="h-8 w-8 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Analytics
              </Link>
              <Link
                to="/content"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Content
              </Link>
              <Link
                to="/team"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Team
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}