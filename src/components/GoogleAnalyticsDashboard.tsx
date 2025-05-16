import React, { useEffect, useState } from 'react';
import { 
  fetchGAOverviewData, 
  fetchGATimelineData,
  fetchGASourceData 
} from '../services/googleAnalyticsService';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Clock, Users, MousePointer, ArrowRight } from 'lucide-react';

export function GoogleAnalyticsDashboard() {
  const [overviewData, setOverviewData] = useState<any>(null);
  const [timelineData, setTimelineData] = useState<any>(null);
  const [sourceData, setSourceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const [overview, timeline, source] = await Promise.all([
          fetchGAOverviewData(),
          fetchGATimelineData(),
          fetchGASourceData()
        ]);
        
        setOverviewData(overview);
        setTimelineData(timeline);
        setSourceData(source);
      } catch (err) {
        console.error('Error fetching Google Analytics data:', err);
        setError('Failed to load Google Analytics data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Google Analytics Dashboard</h2>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
            ))}
          </div>
          <div className="bg-gray-100 h-64 rounded-lg"></div>
          <div className="bg-gray-100 h-64 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Google Analytics Dashboard</h2>
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // Format session duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Prepare timeline data for chart
  const chartData = timelineData?.dates.map((date: string, index: number) => {
    const dataPoint: any = { date };
    timelineData.metrics.forEach((metric: any) => {
      dataPoint[metric.name] = metric.values[index];
    });
    return dataPoint;
  });
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Google Analytics Dashboard</h2>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Users className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm text-blue-600 font-medium">Users</span>
          </div>
          <p className="text-2xl font-bold">{overviewData?.totalUsers.toLocaleString()}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Users className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm text-green-600 font-medium">New Users</span>
          </div>
          <p className="text-2xl font-bold">{overviewData?.newUsers.toLocaleString()}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <MousePointer className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm text-purple-600 font-medium">Sessions</span>
          </div>
          <p className="text-2xl font-bold">{overviewData?.sessions.toLocaleString()}</p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <ArrowRight className="w-4 h-4 text-amber-600 mr-2" />
            <span className="text-sm text-amber-600 font-medium">Bounce Rate</span>
          </div>
          <p className="text-2xl font-bold">{overviewData?.bounceRate.toFixed(1)}%</p>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 text-indigo-600 mr-2" />
            <span className="text-sm text-indigo-600 font-medium">Avg. Session</span>
          </div>
          <p className="text-2xl font-bold">{formatDuration(overviewData?.avgSessionDuration)}</p>
        </div>
        
        <div className="bg-cyan-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="w-4 h-4 text-cyan-600 mr-2">👁️</span>
            <span className="text-sm text-cyan-600 font-medium">Pageviews</span>
          </div>
          <p className="text-2xl font-bold">{overviewData?.pageviews.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Timeline Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">User Activity (Last 30 Days)</h3>
        <div className="bg-gray-50 p-4 rounded-lg" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Users" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Sessions" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Traffic Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
          <div className="bg-gray-50 p-4 rounded-lg" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="source" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Traffic Distribution</h3>
          <div className="bg-gray-50 p-4 rounded-lg" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="sessions"
                  nameKey="source"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sourceData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
