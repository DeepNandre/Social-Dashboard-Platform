import React, { useContext, useState, useEffect } from 'react';
import { BarChart3, Brain, Zap, LineChart, Star, Clock, ArrowRight } from 'lucide-react';
import { DashboardTile } from '../components/DashboardTile';
import { UserContext } from '../context/UserContext';
import { dashboardsArray } from '../constants/dashboards';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const dashboards = dashboardsArray;

export function Home() {
  const { user } = useContext(UserContext);
  const [filteredDashboards, setFilteredDashboards] = useState(dashboards);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const navigate = useNavigate();

  // Get user's favorite dashboards
  const favoriteDashboards = user?.preferences?.favoriteReports
    ? dashboards.filter(dash => user?.preferences?.favoriteReports?.includes(dash.id))
    : [];

  // Get recently viewed dashboards from localStorage
  const [recentlyViewedDashboards, setRecentlyViewedDashboards] = useState<any[]>([]);
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

  // --- UI ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-teal-400 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center justify-center text-center">
          <motion.img 
            src="/logo.png" 
            alt="Social Sleuth Logo" 
            className="h-20 w-20 mb-6 drop-shadow-lg" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          />
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to <span className="text-blue-200">Social Sleuth</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Uncover powerful social media insights, AI-driven analytics, and content optimization—all in one place.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#dashboards" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors shadow"
            >
              Get Started
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </a>
            <a 
              href="#demo" 
              className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors shadow"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need for Social Media Success
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to help you grow your social media presence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="bg-white rounded-xl shadow p-8 flex flex-col items-center" whileHover={{ scale: 1.04 }}>
              <Brain className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600 text-center">Get intelligent recommendations and predictions based on your data.</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow p-8 flex flex-col items-center" whileHover={{ scale: 1.04 }}>
              <LineChart className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
              <p className="text-gray-600 text-center">Monitor your social media performance in real-time.</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow p-8 flex flex-col items-center" whileHover={{ scale: 1.04 }}>
              <Zap className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Optimization</h3>
              <p className="text-gray-600 text-center">AI-powered content suggestions and optimization.</p>
            </motion.div>
          </div>
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
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Powerful Analytics Dashboards
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get insights from all your social media platforms in one place
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDashboards.map((tile) => (
              <DashboardTile key={tile.id} tile={tile} />
            ))}
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