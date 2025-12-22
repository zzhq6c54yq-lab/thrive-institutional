
import React from "react";

interface TabNavigationProps {
  activeTab: 'resources' | 'assessments' | 'workshops';
  onTabChange: (tab: 'resources' | 'assessments' | 'workshops') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => (
  <div className="flex overflow-x-auto scrollbar-hide">
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'resources' 
          ? 'border-green-500 text-green-400' 
          : 'border-transparent text-white/60 hover:text-white'
      }`}
      onClick={() => onTabChange('resources')}
    >
      Resources
    </button>
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'assessments' 
          ? 'border-green-500 text-green-400' 
          : 'border-transparent text-white/60 hover:text-white'
      }`}
      onClick={() => onTabChange('assessments')}
    >
      Assessments
    </button>
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'workshops' 
          ? 'border-green-500 text-green-400' 
          : 'border-transparent text-white/60 hover:text-white'
      }`}
      onClick={() => onTabChange('workshops')}
    >
      Workshops
    </button>
  </div>
);

export default TabNavigation;
