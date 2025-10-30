import React, { useState } from 'react';

interface WatchlistItem {
  id: string;
  player: string;
  team: string;
  stat: string;
  line: number;
  recommendation: 'OVER' | 'UNDER';
  confidence: number;
  edge: number;
  addedAt: string;
  alertPrice?: number;
}

export const Watchlist: React.FC = () => {
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([
    {
      id: 'bb-001',
      player: 'LeBron James',
      team: 'LAL',
      stat: 'Points',
      line: 24.5,
      recommendation: 'OVER',
      confidence: 0.92,
      edge: 0.31,
      addedAt: '2025-10-31T13:20:00Z',
      alertPrice: 25.5
    },
    {
      id: 'bb-002',
      player: 'Josh Allen',
      team: 'BUF',
      stat: 'Passing Yards',
      line: 249.5,
      recommendation: 'UNDER',
      confidence: 0.82,
      edge: 0.18,
      addedAt: '2025-10-31T14:45:00Z'
    },
    {
      id: 'bb-003',
      player: 'Victor Wembanyama',
      team: 'SAS',
      stat: 'Blocks',
      line: 3.5,
      recommendation: 'OVER',
      confidence: 0.88,
      edge: 0.24,
      addedAt: '2025-10-31T15:10:00Z'
    }
  ]);

  const removeFromWatchlist = (id: string) => {
    setWatchlistItems(items => items.filter(item => item.id !== id));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.90) return 'text-red-400';
    if (confidence >= 0.80) return 'text-orange-400';
    if (confidence >= 0.70) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getRecommendationColor = (recommendation: 'OVER' | 'UNDER') => {
    return recommendation === 'OVER' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2">Butcher's Block</h1>
        <p className="text-gray-400">Your saved slaughter opportunities and alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Saved Picks</div>
          <div className="text-2xl font-bold text-white">{watchlistItems.length}</div>
          <div className="text-xs text-gray-400">In your block</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Avg Confidence</div>
          <div className="text-2xl font-bold text-red-400">
            {Math.round((watchlistItems.reduce((sum, item) => sum + item.confidence, 0) / watchlistItems.length) * 100)}%
          </div>
          <div className="text-xs text-gray-400">Butcher's certainty</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Avg Edge</div>
          <div className="text-2xl font-bold text-orange-400">
            {Math.round((watchlistItems.reduce((sum, item) => sum + item.edge, 0) / watchlistItems.length) * 100)}%
          </div>
          <div className="text-xs text-gray-400">Market advantage</div>
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="bg-gray-900 rounded-lg border border-red-500/20">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-red-400">Your Slaughter Queue</h3>
          <p className="text-gray-400 text-sm">Monitor these picks for the best opportunities</p>
        </div>
        
        <div className="p-6">
          {watchlistItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🥩</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Your block is empty
              </h3>
              <p className="text-gray-500">
                Add predictions to your butcher's block to track opportunities
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {watchlistItems.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-red-500/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-white">{item.player}</h4>
                        <span className="text-sm text-red-400 font-semibold">{item.team}</span>
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                          {item.stat}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>Line: <span className="text-white font-semibold">{item.line}</span></span>
                        <span>Added: {new Date(item.addedAt).toLocaleDateString()}</span>
                        {item.alertPrice && (
                          <span>Alert at: <span className="text-yellow-400 font-semibold">{item.alertPrice}</span></span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className={`text-lg font-bold ${getRecommendationColor(item.recommendation)}`}>
                        {item.recommendation}
                      </div>
                      <div className={`text-sm ${getConfidenceColor(item.confidence)}`}>
                        {Math.round(item.confidence * 100)}% Conf
                      </div>
                      <div className="text-sm text-red-400">
                        +{Math.round(item.edge * 100)}% Edge
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200">
                      View Analysis
                    </button>
                    <button 
                      onClick={() => removeFromWatchlist(item.id)}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-red-700 hover:text-white transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Alert Configuration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">High Confidence Alerts</div>
              <div className="text-sm text-gray-400">Notify when Execution Level picks appear</div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Edge Alerts</div>
              <div className="text-sm text-gray-400">Alert when edge exceeds 25%</div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Line Movement</div>
              <div className="text-sm text-gray-400">Track significant line changes</div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};