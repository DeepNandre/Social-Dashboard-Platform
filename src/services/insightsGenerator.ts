import { fetchLinkedInMetrics } from './powerBiService';
import { generateLinkedInInsights } from './aiService';

// Explicitly export the FormattedInsight interface
export interface FormattedInsight {
  iconType: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
}

export async function getLinkedInInsights(): Promise<FormattedInsight[]> {
  try {
    console.log("insightsGenerator: Fetching LinkedIn metrics");
    // Fetch metrics from Power BI
    const metrics = await fetchLinkedInMetrics();
    
    console.log("insightsGenerator: Generating AI insights");
    // Generate insights using AI service
    const aiInsights = await generateLinkedInInsights({ 
      metrics,
      insightCount: 3
    });
    
    console.log("insightsGenerator: Formatting insights");
    // Transform AI insights into formatted insights with appropriate icon types
    return aiInsights.map(insight => {
      let iconType: string;
      
      // Assign appropriate icon based on insight type
      switch (insight.type) {
        case 'success':
          iconType = 'TrendingUp';
          break;
        case 'warning':
          iconType = 'TrendingDown';
          break;
        case 'info':
          // Assign different icons based on insight content
          if (insight.title.toLowerCase().includes('day')) {
            iconType = 'Clock';
          } else if (insight.title.toLowerCase().includes('content')) {
            iconType = 'BarChart';
          } else if (insight.title.toLowerCase().includes('follower')) {
            iconType = 'Users';
          } else {
            iconType = 'AlertTriangle';
          }
          break;
        default:
          iconType = 'AlertTriangle';
      }
      
      return {
        iconType,
        title: insight.title,
        description: insight.description,
        type: insight.type
      };
    });
  } catch (error) {
    console.error('Error generating LinkedIn insights:', error);
    // Return fallback insights in case of failure
    return [
      {
        iconType: 'AlertTriangle',
        title: "Unable to generate real-time insights",
        description: "We encountered an issue connecting to the analytics service. Please try again later.",
        type: "warning"
      }
    ];
  }
} 