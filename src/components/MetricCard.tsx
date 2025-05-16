import { DataAnnotation } from './DataAnnotation';

interface MetricCardProps {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  dashboardId: string;
}

export function MetricCard({ id, title, value, change, dashboardId }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <DataAnnotation
          dataPointId={id}
          metric={title}
          value={value}
          dashboardId={dashboardId}
        />
      </div>
      <div className="mt-2">
        <div className="text-3xl font-semibold">{value}</div>
        {change !== undefined && (
          <div className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
    </div>
  );
} 