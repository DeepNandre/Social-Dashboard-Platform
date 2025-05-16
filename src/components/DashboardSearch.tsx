import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import type { DashboardTile } from '../types';

interface DashboardSearchProps {
  dashboards: DashboardTile[];
  onSearch: (results: DashboardTile[]) => void;
}

export function DashboardSearch({ dashboards, onSearch }: DashboardSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      onSearch(dashboards);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    const results = dashboards.filter(
      dash => 
        dash.title.toLowerCase().includes(lowerTerm) || 
        dash.description.toLowerCase().includes(lowerTerm)
    );
    
    onSearch(results);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    onSearch(dashboards);
  };
  
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#4076bb] focus:border-[#4076bb] sm:text-sm"
          placeholder="Search dashboards..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={clearSearch}
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}
