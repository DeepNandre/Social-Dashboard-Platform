import { dashboards } from '../constants/dashboards';
import { Link } from 'react-router-dom';
import { FileBarChart } from 'lucide-react';

export function DashboardList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.values(dashboards).map((dashboard) => (
        <div key={dashboard.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="mb-4 p-3 bg-blue-50 inline-block rounded-lg">
            {/* Dynamically render icon based on dashboard type */}
            {dashboard.id === 'custom-reports' && <FileBarChart className="h-6 w-6 text-blue-600" />}
            {/* Add other icon conditions here */}
          </div>
          <h3 className="text-lg font-semibold mb-2">{dashboard.title}</h3>
          <p className="text-gray-600 mb-4">{dashboard.description}</p>
          <Link 
            to={`/dashboard/${dashboard.id}`} 
            className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
          >
            View Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
} 