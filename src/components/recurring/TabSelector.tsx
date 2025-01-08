import React from 'react';
import { CalendarClock, History } from 'lucide-react';

interface Props {
  activeTab: 'upcoming' | 'past';
  onTabChange: (tab: 'upcoming' | 'past') => void;
}

export function TabSelector({ activeTab, onTabChange }: Props) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange('upcoming')}
          className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'upcoming'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <CalendarClock className="h-5 w-5 mr-2" />
          Upcoming
        </button>
        <button
          onClick={() => onTabChange('past')}
          className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'past'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <History className="h-5 w-5 mr-2" />
          Past
        </button>
      </nav>
    </div>
  );
}