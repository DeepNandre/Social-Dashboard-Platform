import React, { useContext, useState, useEffect } from 'react';
import { BarChart3, LinkedinIcon, PieChart, ShieldCheck, Building, Brain, ArrowRight, Clock, Star, BarChart2, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { DashboardTile } from '../components/DashboardTile';
import { UserContext } from '../context/UserContext';
import type { DashboardTile as DashboardTileType } from '../types';
import { DashboardSearch } from '../components/DashboardSearch';
import { useNavigate } from 'react-router-dom';
import { dashboardsArray } from '../constants/dashboards';
import { Link } from 'react-router-dom';
import { ArrowRight as LinkArrowRight, Star as LinkStar, Clock as LinkClock, BarChart as LinkBarChart, Users, Zap, LineChart } from 'lucide-react';

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
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center md:text-left md:max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
              AI-Powered Analytics Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Transform Your Social Media Analytics
            </h1>
            <p className="mt-6 text-xl text-white/90 max-w-3xl">
              Unlock the power of AI-driven insights, real-time analytics, and automated content optimization for your social media success.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#dashboards" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Started
                <LinkArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </a>
              <a 
                href="#demo" 
                className="inline-flex items-center justify-center px-5 py-3 border border-white/30 text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors"
              >
                Watch Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need for Social Media Success
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to help you grow your social media presence
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* AI Analytics */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="absolute -top-4 left-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Insights</h3>
              <p className="mt-2 text-gray-600">
                Get intelligent recommendations and predictions based on your data
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="absolute -top-4 left-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <LineChart className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Real-time Analytics</h3>
              <p className="mt-2 text-gray-600">
                Monitor your social media performance in real-time
              </p>
            </div>

            {/* Content Optimization */}
            <div className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="absolute -top-4 left-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Content Optimization</h3>
              <p className="mt-2 text-gray-600">
                AI-powered content suggestions and optimization
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Section - Only show if user has favorites */}
      {favoriteDashboards.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <LinkStar className="w-5 h-5 text-yellow-500 mr-2" />
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
            <LinkClock className="w-5 h-5 text-[#4076bb] mr-2" />
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
      <div id="dashboards" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Powerful Analytics Dashboards
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get insights from all your social media platforms in one place
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add your dashboard tiles here */}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}