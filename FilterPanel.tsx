import React from 'react';

interface FilterPanelProps {
  filters: {
    sport: string;
    confidence: string;
    minEdge: number;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: string, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
      <h3 className="text-lg font-bold text-red-400 mb-4">Butcher's Filters</h3>
      <div className="flex flex-wrap gap-4 items-center">
        {/* Sport Filter */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Weapon Selection</label>
          <select 
            value={filters.sport}
            onChange={(e) => handleFilterChange('sport', e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
          >
            <option value="all">All Sports</option>
            <option value="nba">🏀 NBA</option>
            <option value="nfl">🏈 NFL</option>
            <option value="cbb">🏀 College Basketball</option>
            <option value="nhl">🏒 NHL</option>
          </select>
        </div>

        {/* Confidence Filter */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Carnage Level</label>
          <select 
            value={filters.confidence}
            onChange={(e) => handleFilterChange('confidence', e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="execution">🔥 EXECUTION (90%+)</option>
            <option value="demolition">⚡ DEMOLITION (80-89%)</option>
            <option value="meat">🥩 MEAT (70-79%)</option>
          </select>
        </div>

        {/* Minimum Edge Filter */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Min Edge</label>
          <select 
            value={filters.minEdge}
            onChange={(e) => handleFilterChange('minEdge', parseFloat(e.target.value))}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
          >
            <option value="0">0%</option>
            <option value="0.1">10%</option>
            <option value="0.15">15%</option>
            <option value="0.2">20%</option>
            <option value="0.25">25%</option>
          </select>
        </div>

        {/* Apply Button */}
        <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-6 py-2 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 mt-6">
          Apply Butchery
        </button>
      </div>
    </div>
  );
};