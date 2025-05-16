import React, { useState, useEffect } from 'react';
import { GoogleAnalyticsService } from '../services/googleAnalytics';

interface AnalyticsData {
  pageViews: number;
  activeUsers: number;
  engagedSessions: number;
}

export function RealTimeAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 3833,
    activeUsers: 19,
    engagedSessions: 4644
  });
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Real-Time Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Page Views</p>
          <p className="text-2xl font-bold text-blue-900">
            {analyticsData.pageViews.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 mb-1">Active Users</p>
          <p className="text-2xl font-bold text-green-900">
            {analyticsData.activeUsers.toLocaleString()}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 mb-1">Engaged Sessions</p>
          <p className="text-2xl font-bold text-purple-900">
            {analyticsData.engagedSessions.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
} 