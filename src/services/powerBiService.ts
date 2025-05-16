import axios from 'axios';

export interface LinkedInMetrics {
  followers: {
    current: number;
    previous: number;
    growth: number;
  };
  engagement: {
    rate: number;
    industryAverage: number;
    trending: 'up' | 'down' | 'stable';
  };
  posts: {
    topPerforming: {
      id: string;
      type: string;
      engagement: number;
    }[];
    dayAnalysis: {
      bestDay: string;
      worstDay: string;
      engagementDiff: number;
    };
  };
  visitors: {
    count: number;
    previousCount: number;
    growth: number;
  };
  keywords: string[];
}

// In a real implementation, this would use the Power BI API
// or a backend service that accesses the Power BI REST API
export async function fetchLinkedInMetrics(): Promise<LinkedInMetrics> {
  try {
    // For development, we'll simulate the API call
    // In production, replace with actual Power BI API call:
    // const response = await axios.get('/api/powerbi/linkedin-metrics');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This would normally come from the API response
    const metrics: LinkedInMetrics = {
      followers: {
        current: 8750,
        previous: 7950,
        growth: 10.1
      },
      engagement: {
        rate: 3.2,
        industryAverage: 2.1,
        trending: 'up'
      },
      posts: {
        topPerforming: [
          { id: 'post123', type: 'image', engagement: 5.4 },
          { id: 'post456', type: 'article', engagement: 4.8 },
          { id: 'post789', type: 'video', engagement: 7.2 }
        ],
        dayAnalysis: {
          bestDay: 'Tuesday',
          worstDay: 'Friday',
          engagementDiff: 37
        }
      },
      visitors: {
        count: 1250,
        previousCount: 980,
        growth: 27.6
      },
      keywords: ['power systems', 'renewable energy', 'sustainability', 'grid reliability']
    };
    
    return metrics;
  } catch (error) {
    console.error('Error fetching LinkedIn metrics:', error);
    throw error;
  }
} 