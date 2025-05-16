import React from 'react';
import { AIInsights } from '../components/AIInsights';

export function DebugAIInsights() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Insights Debug</h1>
      <p className="text-gray-600 mb-8">Testing the AIInsights component</p>
      
      <AIInsights platform="linkedin" />
    </div>
  );
} 