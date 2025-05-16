import React, { useContext, useState, useEffect } from 'react';
import { BarChart3, LinkedinIcon, PieChart, ShieldCheck, Building, Brain, ArrowRight, Clock, Star, BarChart2, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { DashboardTile } from '../components/DashboardTile';
import { UserContext } from '../context/UserContext';
import type { DashboardTile as DashboardTileType } from '../types';
import { DashboardSearch } from '../components/DashboardSearch';
import { useNavigate } from 'react-router-dom';
import { dashboardsArray } from '../constants/dashboards';

// Use dashboards from constants file instead of duplicating
const dashboards = dashboardsArray;

export function Home() {
  const { user } = useContext(UserContext);
  const [filteredDashboards, setFilteredDashboards] = useState(dashboards);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Get user's favorite dashboards
  const favoriteDashboards = user?.preferences?.favoriteReports 
    ? dashboards.filter(dash => user.preferences.favoriteReports.includes(dash.id))
    : [];
  
  // Get recently viewed dashboards from localStorage
  const [recentlyViewedDashboards, setRecentlyViewedDashboards] = useState<DashboardTileType[]>([]);
  
  useEffect(() => {
    const getRecentlyViewed = () => {
      const recentlyViewed = localStorage.getItem('recentlyViewed');
      if (recentlyViewed) {
        const recentIds = JSON.parse(recentlyViewed);
        return recentIds
          .map((id: string) => dashboards.find(dash => dash.id === id))
          .filter(Boolean);
      }
      return [];
    };
    
    setRecentlyViewedDashboards(getRecentlyViewed());
  }, []);
  
  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
    setSelectedForComparison([]);
  };
  
  const toggleDashboardSelection = (id: string) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(selectedForComparison.filter(dashId => dashId !== id));
    } else {
      // Limit to 2 dashboards for comparison
      if (selectedForComparison.length < 2) {
        setSelectedForComparison([...selectedForComparison, id]);
      }
    }
  };
  
  const startComparison = () => {
    if (selectedForComparison.length === 2) {
      navigate(`/compare?dashboards=${selectedForComparison.join(',')}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#4076bb] to-[#50c0af] overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center md:text-left md:max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
              Analytics Dashboard
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Social Media Analytics Platform
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-3xl">
              Access all your social media insights in one centralized location. Make data-driven decisions with real-time analytics.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#dashboards" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#4076bb] bg-white hover:bg-gray-50 transition-colors"
              >
                View Dashboards
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-5 py-3 border border-white/30 text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#f9fafb" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Favorites Section - Only show if user has favorites */}
      {favoriteDashboards.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Your Favorites</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteDashboards.map((tile) => (
              <DashboardTile key={tile.id} tile={tile} isFavorite={true} />
            ))}
          </div>
        </div>
      )}
      
      {/* Recently Viewed Section - Only show if user has recently viewed dashboards */}
      {recentlyViewedDashboards.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Clock className="w-5 h-5 text-[#4076bb] mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentlyViewedDashboards.slice(0, 3).map((tile) => (
              <DashboardTile 
                key={`recent-${tile.id}`} 
                tile={tile} 
                isFavorite={user?.preferences?.favoriteReports?.includes(tile.id) || false} 
              />
            ))}
          </div>
        </div>
      )}

      {/* All Dashboards Section */}
      <div id="dashboards" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">All Analytics Dashboards</h2>
            <p className="mt-2 text-lg text-gray-600">
              Select a dashboard to view detailed analytics and insights
            </p>
          </div>
          
          {user && (
            <button
              onClick={toggleComparisonMode}
              className={`mt-4 md:mt-0 px-4 py-2 rounded-md text-sm font-medium ${
                comparisonMode 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-[#4076bb] text-white hover:bg-[#3567a7]'
              } transition-colors`}
            >
              {comparisonMode ? (
                <span className="flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  Cancel Comparison
                </span>
              ) : (
                <span className="flex items-center">
                  <BarChart2 className="w-4 h-4 mr-1" />
                  Compare Dashboards
                </span>
              )}
            </button>
          )}
        </div>
        
        {/* Comparison mode controls */}
        {comparisonMode && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div>
                <h3 className="font-medium text-[#4076bb]">Select two dashboards to compare</h3>
                <p className="text-sm text-gray-600">
                  {selectedForComparison.length === 0 
                    ? 'Click on two dashboards below to select them for comparison' 
                    : `Selected: ${selectedForComparison.length}/2`}
                </p>
              </div>
              
              <button
                onClick={startComparison}
                disabled={selectedForComparison.length !== 2}
                className="mt-3 sm:mt-0 px-4 py-2 bg-[#4076bb] text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Selected
              </button>
            </div>
          </div>
        )}
        
        <DashboardSearch dashboards={dashboards} onSearch={setFilteredDashboards} />
        
        {filteredDashboards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No dashboards found matching your search.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredDashboards.map((tile) => (
              comparisonMode ? (
                <div 
                  key={tile.id}
                  onClick={() => toggleDashboardSelection(tile.id)}
                  className={`relative overflow-hidden rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer border ${
                    selectedForComparison.includes(tile.id) 
                      ? 'border-[#4076bb] ring-2 ring-[#4076bb]/50' 
                      : 'border-gray-100 hover:border-[#4076bb]/30'
                  }`}
                >
                  {/* Icon */}
                  <div className="flex items-center mb-4">
                    {tile.icon && React.createElement((Icons as any)[tile.icon], { 
                      className: "w-6 h-6 text-[#4076bb]" 
                    })}
                    <h3 className="ml-2 text-lg font-medium text-gray-900">{tile.title}</h3>
                  </div>
                  
                  <p className="text-gray-600">{tile.description}</p>
                </div>
              ) : (
                <DashboardTile 
                  key={tile.id} 
                  tile={tile} 
                  isFavorite={user?.preferences?.favoriteReports?.includes(tile.id) || false} 
                />
              )
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <img src="/analytics-logo.png" alt="Analytics Logo" className="h-8 w-auto mr-3" />
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Social Analytics Dashboard. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm">Powered by AI & Analytics</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}