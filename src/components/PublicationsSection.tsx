import React from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';

interface Publication {
  title: string;
  url: string;
  source: string;
  date?: string;
  impressions?: number;
}

interface PublicationsSectionProps {
  totalPublications: number;
  totalImpressions: number;
  publications: Publication[];
}

export function PublicationsSection({ 
  totalPublications = 9,
  totalImpressions = 11900,
  publications 
}: PublicationsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center mb-6">
        <Newspaper className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Media Publications</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Publications</p>
          <p className="text-2xl font-bold">{totalPublications}</p>
          <p className="text-xs text-gray-600">Pieces published in 2025</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Coverage Views</p>
          <p className="text-2xl font-bold">{totalImpressions.toLocaleString()}</p>
          <p className="text-xs text-gray-600">Total impressions in 2025</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Average Per Publication</p>
          <p className="text-2xl font-bold">{Math.round(totalImpressions/totalPublications).toLocaleString()}</p>
          <p className="text-xs text-gray-600">Views per publication</p>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publication
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {publications.map((publication, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {publication.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {publication.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a 
                    href={publication.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                  >
                    View Article
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 