"use client";

import { useState } from 'react';

interface AnnouncementCardProps {
  id: string;
  title: string;
  content: string;
  department: string;
  date: string;
  isImportant?: boolean;
}

export default function AnnouncementCard({
  id,
  title,
  content,
  department,
  date,
  isImportant = false
}: AnnouncementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
        isImportant ? 'border-l-4 border-red-500' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full mb-2">
              {department}
            </span>
            {isImportant && (
              <span className="inline-block ml-2 px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                Important
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        
        <div className={`text-gray-600 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {content}
        </div>
        
        <button
          onClick={toggleExpand}
          className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
        >
          {isExpanded ? 'Voir moins' : 'Voir plus'}
        </button>
      </div>
    </div>
  );
}
