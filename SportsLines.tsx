import React, { useState } from 'react';

export const SportsLines: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState('nba');

  const sportData = {
    nba: {
      name: 'NBA',
      icon: '🏀',
      color: 'orange',
      games: 8,
      lines: 156,
      avgEdge: '24.3%'
    },
    nfl: {
      name: 'NFL', 
      icon: '🏈',
      color: 'green',
      games: 4,
      lines: 89,
      avgEdge: '19.7%'
    },
    cbb: {
      name: 'College Basketball',
      icon: '🏀', 
      color: 'blue',
      games: 12,
      lines: 198,
      avgEdge: '22.1%'
    },
    nhl: {
      name: 'NHL',
      icon: '🏒',
      color: 'purple', 
      games: 6,
      lines: 134,
      avgEdge: '18.9%'
    }
  };

  const currentSport = sportData[selectedSport as keyof typeof sportData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2">Weapon Selection</h1>
        <p className="text-gray-400">Choose your sporting arsenal for today's slaughter</p>
      </div>

      {/* Sport Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(sportData).map(([key, sport]) => (
          <button
            key={key}
            onClick={() => setSelectedSport(key)}
            className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              selectedSport === key
                ? 'border-red-500 bg-red-900/20'
                : 'border-gray-600 bg-gray-800 hover:border-red-500/50'
            }`}
          >
            <div className="text-4xl mb-2">{sport.icon}</div>
            <h3 className="font-bold text-white mb-2">{sport.name}</h3>
            <div className="text-sm text-gray-400">
              <div>{sport.games} games</div>
              <div>{sport.lines} lines</div>
              <div>Avg: {sport.avgEdge}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Current Sport Details */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{currentSport.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{currentSport.name}</h2>
              <p className="text-gray-400">Today's lines and opportunities</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-red-400">{currentSport.lines}</div>
            <div className="text-sm text-gray-400">Active Lines</div>
          </div>
        </div>

        {/* Sample Lines */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-red-400 mb-4">Today's Featured Carnage</h3>
          
          <div className="space-y-3">
            {selectedSport === 'nba' && (
              <>
                <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">LeBron James - Points</div>
                    <div className="text-sm text-gray-400">LAL vs MIA • 7:30 PM CT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">OVER 24.5</div>
                    <div className="text-sm text-red-400">+31% edge</div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Victor Wembanyama - Blocks</div>
                    <div className="text-sm text-gray-400">SAS vs DAL • 8:00 PM CT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">OVER 3.5</div>
                    <div className="text-sm text-red-400">+24% edge</div>
                  </div>
                </div>
              </>
            )}
            
            {selectedSport === 'nfl' && (
              <>
                <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Josh Allen - Passing Yards</div>
                    <div className="text-sm text-gray-400">BUF @ PHI • 1:00 PM CT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-400">UNDER 249.5</div>
                    <div className="text-sm text-red-400">+18% edge</div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Christian McCaffrey - Rushing Yards</div>
                    <div className="text-sm text-gray-400">SF vs KC • 4:25 PM CT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">OVER 85.5</div>
                    <div className="text-sm text-red-400">+15% edge</div>
                  </div>
                </div>
              </>
            )}
            
            {selectedSport === 'cbb' && (
              <>
                <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Duke Blue Devils - Points</div>
                    <div className="text-sm text-gray-400">Duke vs UNC • 8:00 PM CT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">OVER 78.5</div>
                    <div className="text-sm text-red-400">+22% edge</div>
                  </div>
                </div>
              </>
            )}
            
            {selectedSport === 'nhl' && (
              <>
                <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Connor McDavid - Points</div>
                    <div className="text-sm text-gray-400">EDM vs LAK • 9:30 PM CT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">OVER 1.5</div>
                    <div className="text-sm text-red-400">+19% edge</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};