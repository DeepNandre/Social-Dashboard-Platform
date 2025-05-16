import { GA_CONFIG } from '../config/googleAnalytics';

export class GoogleAnalyticsService {
  private static accessToken: string | null = null;
  private static tokenExpiry: number = 0;

  static async authenticate() {
    try {
      // For development/testing, we'll use a simpler approach
      // In production, you would implement a proper OAuth flow with a backend
      
      // Check if we have a valid token in localStorage
      const tokenData = localStorage.getItem('ga_token');
      if (tokenData) {
        const { token, expiry } = JSON.parse(tokenData);
        if (expiry > Date.now()) {
          this.accessToken = token;
          this.tokenExpiry = expiry;
          return token;
        }
      }
      
      // In a real app, you would redirect to Google's OAuth consent screen
      
      // For now, we'll return null which will cause us to use the demo data
      return null;
    } catch (error) {
      console.error('Failed to authenticate with Google Analytics:', error);
      throw error;
    }
  }

  static async getBusinessProfileData() {
    try {
      if (this.accessToken) {
        // This would be the real implementation with the Google Analytics Data API
        // For now, we'll return the demo data based on the screenshot
        return this.getBusinessProfileDemoData();
      }
      
      // Return demo data if we don't have an access token
      return this.getBusinessProfileDemoData();
    } catch (error) {
      console.error('Failed to fetch business profile data:', error);
      return this.getBusinessProfileDemoData();
    }
  }
  
  private static getBusinessProfileDemoData() {
    return {
      overviews: 66,
      calls: 4,
      bookings: 0,
      directions: 35,
      websiteClicks: 173,
      overviewsPercentChange: 15,
      callsPercentChange: 33,
      bookingsPercentChange: 0,
      directionsPercentChange: 24,
      websiteClicksPercentChange: 2,
      viewsBreakdown: [
        { label: 'Google Search - Desktop', value: 102, percentage: 59 },
        { label: 'Google Search - Mobile', value: 22, percentage: 12.7 },
        { label: 'Google Maps - Desktop', value: 23, percentage: 13.3 },
        { label: 'Google Maps - Mobile', value: 26, percentage: 15 }
      ],
      timelineData: {
        labels: ['Jan 29', 'Feb 2', 'Feb 6', 'Feb 10', 'Feb 14', 'Feb 18', 'Feb 22', 'Feb 26'],
        datasets: [
          {
            label: 'Overviews',
            data: [2, 6, 2, 6, 8, 4, 3, 2, 4, 3, 2, 0],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.4
          }
        ]
      },
      searches: {
        total: 80,
        terms: [
          { term: 'enspec', count: 80 },
          { term: 'enspec power', count: 15 },
          { term: 'enspec power ltd, technology campus, waterside court, waterside, saint helens', count: 15 },
          { term: 'siemens st ehelns', count: 15 }
        ]
      }
    };
  }

  static async getAnalyticsData(startDate: string, endDate: string) {
    // Return consistent data that matches the business profile data
    return {
      rows: [
        {
          dimensions: ['/'],
          metrics: [
            { value: '3833' },  // pageViews
            { value: '19' },    // activeUsers
            { value: '4644' }   // engagedSessions
          ]
        }
      ]
    };
  }
} 