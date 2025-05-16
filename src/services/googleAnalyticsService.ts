import axios from 'axios';

// You'll need to set up OAuth2 or use a service account
const API_KEY = process.env.REACT_APP_GA_API_KEY;
const VIEW_ID = process.env.REACT_APP_GA_VIEW_ID;

interface GAMetric {
  name: string;
  value: number;
}

interface GATimelineData {
  dates: string[];
  metrics: {
    name: string;
    values: number[];
  }[];
}

export async function fetchGAOverviewData() {
  try {
    // This would be a real API call in production
    // For now, we'll simulate the response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      totalUsers: 12450,
      newUsers: 3280,
      sessions: 18750,
      bounceRate: 42.3,
      avgSessionDuration: 185, // in seconds
      pageviews: 45600
    };
  } catch (error) {
    console.error('Error fetching GA overview data:', error);
    throw error;
  }
}

export async function fetchGATimelineData(days = 30): Promise<GATimelineData> {
  try {
    // This would be a real API call in production
    // For now, we'll simulate the response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock data
    const dates = [];
    const userValues = [];
    const sessionValues = [];
    
    const today = new Date();
    for (let i = days; i > 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
      
      // Generate some random but somewhat realistic data
      userValues.push(Math.floor(Math.random() * 300) + 100);
      sessionValues.push(Math.floor(Math.random() * 450) + 150);
    }
    
    return {
      dates,
      metrics: [
        { name: 'Users', values: userValues },
        { name: 'Sessions', values: sessionValues }
      ]
    };
  } catch (error) {
    console.error('Error fetching GA timeline data:', error);
    throw error;
  }
}

export async function fetchGASourceData() {
  try {
    // This would be a real API call in production
    await new Promise(resolve => setTimeout(resolve, 900));
    
    return [
      { source: 'Organic Search', sessions: 7840, percentage: 41.8 },
      { source: 'Direct', sessions: 5620, percentage: 30.0 },
      { source: 'Social', sessions: 2340, percentage: 12.5 },
      { source: 'Referral', sessions: 1950, percentage: 10.4 },
      { source: 'Email', sessions: 780, percentage: 4.2 },
      { source: 'Other', sessions: 220, percentage: 1.1 }
    ];
  } catch (error) {
    console.error('Error fetching GA source data:', error);
    throw error;
  }
}
