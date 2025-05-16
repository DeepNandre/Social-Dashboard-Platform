import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img 
                  src="/enspec-logo.png" 
                  alt="Enspec Power Logo"
                  className="h-8 w-auto"
                  onError={(e) => {
                    // Fallback if logo image is missing
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="ml-2 text-xl font-bold text-gray-900">Analytics Dashboard</span>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link 
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
} 