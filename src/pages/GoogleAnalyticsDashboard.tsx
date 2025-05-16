import React from 'react';
import { AIInsights } from '../components/AIInsights';
import { GoogleAnalyticsEmbed } from '../components/GoogleAnalyticsEmbed';

export function GoogleAnalyticsDashboard() {
  const lookerStudioUrl = 'https://lookerstudio.google.com/embed/reporting/YOUR_REPORT_ID/page/YOUR_PAGE_ID';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
      <p className="text-gray-600 mb-8">Tracking ID: G-BG8E04DPVS</p>
      
      <div className="space-y-6">
        <AIInsights platform="website" />
        <GoogleAnalyticsEmbed lookerStudioUrl={lookerStudioUrl} />
      </div>
    </div>
  );
} 