import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { PowerBIEmbed } from '../components/PowerBIEmbed';

// Import dashboard data
import { dashboards } from '../constants/dashboards';

export function CompareView() {
  const [searchParams] = useSearchParams();
  const dashboardIds = searchParams.get('dashboards')?.split(',') || [];
  
  const selectedDashboards = dashboardIds
    .map(id => dashboards[id as keyof typeof dashboards])
    .filter(Boolean);
  
  if (selectedDashboards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No dashboards selected</h2>
          <p className="text-gray-600 mb-8">Please select dashboards to compare.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#4076bb] hover:bg-[#3567a7] transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Comparison</h1>
          <Link 
            to="/" 
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className={`grid gap-6 ${selectedDashboards.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {selectedDashboards.map(dashboard => (
            <div key={dashboard.id} className="relative">
              <PowerBIEmbed dashboard={dashboard} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}