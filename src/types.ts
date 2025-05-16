export interface DashboardTile {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface PowerBIDashboard {
  id: string;
  title: string;
  embedUrl: string;
  description?: string;
  icon?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  preferences: {
    favoriteReports: string[];
    theme: 'light' | 'dark';
  };
}