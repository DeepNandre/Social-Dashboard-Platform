import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function RealAnalyticsDashboard() {
  // Traffic sources data
  const trafficSourcesData = [
    { source: 'google', medium: 'cpc', sessions: 1585, percentage: 38.1 },
    { source: 'google', medium: 'organic', sessions: 1112, percentage: 26.7 },
    { source: '(direct)', medium: '(none)', sessions: 624, percentage: 15.0 },
    { source: 'bing', medium: 'organic', sessions: 243, percentage: 5.8 },
    { source: 'linkedin.com', medium: 'referral', sessions: 180, percentage: 4.3 },
    { source: '(not set)', medium: '(not set)', sessions: 123, percentage: 3.0 },
    { source: 'chatgpt.com', medium: 'referral', sessions: 66, percentage: 1.6 },
    { source: 'distributedenergyshow.com', medium: 'referral', sessions: 49, percentage: 1.2 },
    { source: 'energytechhive.com', medium: 'referral', sessions: 22, percentage: 0.5 },
  ];

  // Chart data for traffic sources
  const chartData = {
    labels: trafficSourcesData.slice(0, 6).map(item => item.source),
    datasets: [
      {
        label: 'Sessions',
        data: trafficSourcesData.slice(0, 6).map(item => item.sessions),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top Traffic Sources',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Website Analytics</h2>
        <div className="text-sm text-gray-500">
          <span className="mr-2">Jan 1 - Mar 8, 2023</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Live Data</span>
        </div>
      </div>
      
      {/* Website Traffic Metrics */}
      <h3 className="text-lg font-medium mb-4 text-gray-700">Website Traffic</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Active users</p>
          <p className="text-2xl font-bold">2.8K</p>
          <p className="text-xs text-green-600 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            14.6%
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">New users</p>
          <p className="text-2xl font-bold">2.6K</p>
          <p className="text-xs text-green-600 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            13.6%
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">New User %</p>
          <p className="text-2xl font-bold">92%</p>
          <p className="text-xs text-red-600 flex items-center">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            0.5%
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Bounce rate</p>
          <p className="text-2xl font-bold">33.6%</p>
          <p className="text-xs text-green-600 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            3.8%
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Pct Engaged</p>
          <p className="text-2xl font-bold">66%</p>
          <p className="text-xs text-red-600 flex items-center">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            1.8%
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Engagement Time</p>
          <p className="text-2xl font-bold">00:01:24</p>
          <p className="text-xs text-green-600 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            15.3%
          </p>
        </div>
      </div>
      
      {/* Traffic Sources */}
      <h3 className="text-lg font-medium mb-4 text-gray-700">Top Traffic Sources</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medium
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sessions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Sessions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trafficSourcesData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.medium}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sessions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
} 