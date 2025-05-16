import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, AlertTriangle, Users, Eye, MessageSquare, Share2 } from 'lucide-react';

interface AIInsightsProps {
  dashboardId?: string;
  platform?: string;
}

export function AIInsights({ dashboardId, platform }: AIInsightsProps) {
  // Only show for specific dashboards
  if (dashboardId !== 'google-analytics' && dashboardId !== 'custom-reports' && dashboardId !== 'linkedin') {
    return null;
  }

  // Different insights based on platform/dashboard
  const getInsights = () => {
    if (dashboardId === 'linkedin' || platform === 'linkedin') {
      return [
        {
          title: 'Engagement Growth',
          message: 'Your engagement rate has increased by 14.45% compared to the previous period.',
          type: 'success',
          icon: <TrendingUp className="h-5 w-5 text-green-600" />
        },
        {
          title: 'Follower Growth',
          message: 'You gained 404 new followers in 2025, a 5.3% increase from the previous period.',
          type: 'success',
          icon: <Users className="h-5 w-5 text-green-600" />
        },
        {
          title: 'Post Performance',
          message: 'Your most engaging post received 3x more interactions than your average post.',
          type: 'info',
          icon: <BarChart2 className="h-5 w-5 text-blue-600" />
        }
      ];
    } else if (dashboardId === 'google-analytics' || platform === 'website') {
      return [
        {
          title: 'Traffic Analysis',
          message: 'Organic search is your top traffic source with 38.1% of all sessions.',
          type: 'info',
          icon: <Eye className="h-5 w-5 text-blue-600" />
        },
        {
          title: 'Conversion Alert',
          message: 'Your conversion rate has decreased by 1.8% in the last 7 days.',
          type: 'warning',
          icon: <AlertTriangle className="h-5 w-5 text-amber-600" />
        },
        {
          title: 'User Engagement',
          message: 'Average session duration has increased by 15 seconds (8.2%).',
          type: 'success',
          icon: <TrendingUp className="h-5 w-5 text-green-600" />
        }
      ];
    } else {
      // Custom reports or default
      return [
        {
          title: 'Cross-Platform Analysis',
          message: 'Users from social media spend 40% more time on your website than other traffic sources.',
          type: 'info',
          icon: <Share2 className="h-5 w-5 text-blue-600" />
        },
        {
          title: 'Content Performance',
          message: 'Blog posts about industry trends receive 2.5x more engagement than product announcements.',
          type: 'success',
          icon: <MessageSquare className="h-5 w-5 text-green-600" />
        },
        {
          title: 'Audience Growth',
          message: 'Your follower growth rate across all platforms is up 6.3% this quarter.',
          type: 'success',
          icon: <TrendingUp className="h-5 w-5 text-green-600" />
        }
      ];
    }
  };

  const insights = getInsights();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Analytics Insights</h2>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${
              insight.type === 'success' ? 'bg-green-50 border-green-200' : 
              insight.type === 'warning' ? 'bg-amber-50 border-amber-200' : 
              'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {insight.icon}
              </div>
              <div>
                <h3 className={`font-medium ${
                  insight.type === 'success' ? 'text-green-800' : 
                  insight.type === 'warning' ? 'text-amber-800' : 
                  'text-blue-800'
                }`}>
                  {insight.title}
                </h3>
                <p className={`mt-1 text-sm ${
                  insight.type === 'success' ? 'text-green-700' : 
                  insight.type === 'warning' ? 'text-amber-700' : 
                  'text-blue-700'
                }`}>
                  {insight.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 