import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PowerBIEmbed } from '../components/PowerBIEmbed';
import { AIInsights } from '../components/AIInsights';
import { ChevronLeft } from 'lucide-react';
import { GoogleAnalyticsEmbed } from '../components/GoogleAnalyticsEmbed';
import { CustomReportsTile } from '../components/CustomReportsTile';
import { dashboards } from '../constants/dashboards';
import { motion } from 'framer-motion';

export function Dashboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the dashboard by ID
  const dashboard = id ? dashboards[id as keyof typeof dashboards] : null;
  
  useEffect(() => {
    if (!id || !dashboard) {
      navigate('/');
    }
  }, [id, dashboard, navigate]);
  
  if (!dashboard) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard not found</h2>
          <p className="text-gray-600 mb-8">The dashboard you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8 space-y-8">
        {/* AI Insights Component */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <AIInsights 
            dashboardId={dashboard.id} 
            platform={dashboard.id === 'linkedin' ? 'linkedin' : 'website'} 
          />
        </motion.div>
        {/* Conditionally render based on dashboard type */}
        {dashboard.id === 'google-analytics' && 'lookerStudioUrl' in dashboard && 'pdfPath' in dashboard ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <GoogleAnalyticsEmbed 
              lookerStudioUrl={dashboard.lookerStudioUrl} 
              pdfPath={dashboard.pdfPath}
              showRealData={true}
            />
          </motion.div>
        ) : dashboard.id === 'custom-reports' && 'reports' in dashboard ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <CustomReportsTile reports={dashboard.reports} />
          </motion.div>
        ) : 'embedUrl' in dashboard ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <PowerBIEmbed dashboard={dashboard} />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}