import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PowerBIEmbed } from '../components/PowerBIEmbed';
import { AIInsights } from '../components/AIInsights';
import { ChevronLeft } from 'lucide-react';
import { GoogleAnalyticsEmbed } from '../components/GoogleAnalyticsEmbed';
import { CustomReportsTile } from '../components/CustomReportsTile';
import { dashboards } from '../constants/dashboards';

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
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#4076bb] hover:bg-[#3567a7] transition-colors"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* AI Insights Component */}
        <AIInsights 
          dashboardId={dashboard.id} 
          platform={dashboard.id === 'linkedin' ? 'linkedin' : 'website'} 
        />
        
        {/* Conditionally render based on dashboard type */}
        {dashboard.id === 'google-analytics' ? (
          <GoogleAnalyticsEmbed 
            lookerStudioUrl={dashboard.lookerStudioUrl} 
            pdfPath={dashboard.pdfPath}
            showRealData={true}
          />
        ) : dashboard.id === 'custom-reports' ? (
          <CustomReportsTile reports={(dashboard as any).reports} />
        ) : (
          <PowerBIEmbed dashboard={dashboard} />
        )}
      </div>
    </div>
  );
}