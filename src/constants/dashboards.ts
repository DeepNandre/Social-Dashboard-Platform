export const dashboards = {
  'linkedin': {
    id: 'linkedin',
    title: 'LinkedIn Analytics',
    description: 'Track LinkedIn engagement, followers, and post performance',
    icon: 'Linkedin',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f78bbeed-d785-4088-82df-6c5ca5e14c9e&autoAuth=true&ctid=81fe4302-0838-482a-b5d1-2db7126cf178',
    type: 'powerbi'
  },
  'google-analytics': {
    id: 'google-analytics',
    title: 'Google Analytics',
    description: 'Website traffic, user behavior, and conversion metrics',
    icon: 'BarChart',
    lookerStudioUrl: 'https://lookerstudio.google.com/embed/reporting/1c566451-86f9-40e1-9ef1-90b8ffaea128/page/kIV1C',
    pdfPath: '/Google_Analytics_Website.pdf',
    type: 'google-analytics'
  },
  'custom-reports': {
    id: 'custom-reports',
    title: 'Custom Reports',
    description: 'Custom analytics reports',
    icon: 'FileBarChart',
    useCustomComponent: true,
    reports: [
      {
        id: 'powerbi-report',
        title: 'PowerBI Dashboard',
        type: 'powerbi',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=d0d378cf-8db0-4029-bc94-5d4b47a882ab&autoAuth=true&ctid=81fe4302-0838-482a-b5d1-2db7126cf178',
        description: 'PowerBI analytics dashboard with key metrics'
      },
      {
        id: 'social-analytics',
        title: 'Social Analytics',
        type: 'pdf',
        pdfPath: '/Microsoft-Power-BI-Presentation.pdf',
        description: 'Social media performance metrics and insights'
      },
      {
        id: 'ga-jan-mar',
        title: 'GA: Jan-Mar 2023',
        type: 'pdf',
        pdfPath: '/Google_Analytics_Jan_Mar.pdf',
        description: 'Google Analytics report for January to March 2023'
      },
      {
        id: 'ga-feb15-mar15',
        title: 'GA: Feb 15-Mar 15',
        type: 'pdf',
        pdfPath: '/Google_Analytics_Feb15_Mar15.pdf',
        description: 'Google Analytics report for February 15 to March 15, 2023'
      }
    ]
  },
  planable: {
    id: 'planable',
    title: 'Content Calendar Analytics',
    embedUrl: 'https://plannable.io/reportEmbed?reportId=planable',
    description: 'Analyze content performance and scheduling efficiency',
    icon: 'PieChart',
    type: 'powerbi'
  },
  odoo: {
    id: 'odoo',
    title: 'Business Analytics',
    embedUrl: 'https://odoo.com/reportEmbed?reportId=odoo',
    description: 'Access business operations and ERP analytics',
    icon: 'Building',
    type: 'powerbi'
  },
  AINavigator: {
    id: 'AINavigator',
    title: 'AI Content Assistant',
    embedUrl: '',
    description: 'AI-powered social media insights and content suggestions',
    icon: 'Brain',
    type: 'powerbi'
  }
};

export const dashboardsArray = Object.values(dashboards);