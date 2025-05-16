import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Star } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import type { DashboardTile } from '../types';
import { trackEvent } from '../utils/analytics';

interface DashboardTileProps {
  tile: DashboardTile;
  isFavorite?: boolean;
}

export function DashboardTile({ tile, isFavorite = false }: DashboardTileProps) {
  const Icon = (Icons as any)[tile.icon];
  const isAINavigator = tile.id === 'AINavigator';
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    const currentFavorites = user.preferences.favoriteReports || [];
    let newFavorites;
    
    if (currentFavorites.includes(tile.id)) {
      newFavorites = currentFavorites.filter(id => id !== tile.id);
    } else {
      newFavorites = [...currentFavorites, tile.id];
    }
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        favoriteReports: newFavorites
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const handleClick = () => {
    trackEvent('dashboard_view', {
      dashboard_id: tile.id,
      dashboard_name: tile.title
    });
  };

  return (
    <Link
      to={isAINavigator ? '/ai-navigator' : `/dashboard/${tile.id}`}
      className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
      onClick={handleClick}
    >
      {/* Favorite button */}
      {user && (
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Star 
            className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
          />
        </button>
      )}
      
      {/* Enhanced gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${
          isAINavigator 
            ? 'from-enspec-blue/5 via-enspec-light-blue/5 to-enspec-teal/5' 
            : 'from-[#4076bb]/5 to-[#50c0af]/5'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
      />
      
      {/* Neural network pattern overlay for AI Navigator */}
      {isAINavigator && (
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="neural-network" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" className="fill-enspec-blue" />
              <path d="M2 2 L18 18" className="stroke-enspec-blue stroke-[0.5]" />
              <circle cx="18" cy="18" r="1" className="fill-enspec-teal" />
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill="url(#neural-network)" />
          </svg>
        </div>
      )}
      
      <div className="relative flex flex-col">
        {/* Icon container with enhanced gradient */}
        <div 
          className={`mb-6 p-4 rounded-lg inline-flex ${
            isAINavigator 
              ? 'bg-gradient-to-br from-enspec-blue/10 to-enspec-teal/10' 
              : 'bg-[#4076bb]/10'
          } text-[#4076bb]`}
        >
          <Icon className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{tile.title}</h3>
        <p className="text-gray-600 mb-6">{tile.description}</p>

        {/* Feature pills for AI Navigator */}
        {isAINavigator && (
          <div className="mt-auto flex flex-wrap gap-2">
            {['Post Suggestions', 'Growth Predictions', 'Lead Discovery', 'Benchmarking'].map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 text-xs rounded-full bg-enspec-blue/10 text-enspec-blue"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
        
        {/* View button */}
        <div className="mt-auto pt-6 flex items-center text-[#4076bb] font-medium">
          <span>View Dashboard</span>
          <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
