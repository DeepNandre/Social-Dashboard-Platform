import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page not found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#4076bb] hover:bg-[#3567a7] transition-colors"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
