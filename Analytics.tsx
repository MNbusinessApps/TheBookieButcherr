import React, { useState } from 'react';

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const analytics = {
    '1d': {
      predictions: 28,
      accuracy: 82.1,
      profit: 1240.50,
      avgEdge: 23.4,
      execution: 5,
      demolition: 12,
      meat: 8,
      scrap: 3
    },
    '7d': {
      predictions: 187,
      accuracy: 84.6,
      profit: 8940.25,
      avgEdge: 22.8,
      execution: 34,
      demolition: 89,
      meat: 48,
      scrap: 16
    },
    '30d': {
      predictions: 756,
      accuracy: 83.2,
      profit: 32150.75,
      avgEdge: 21.9,
      execution: 156,
      demolition: 378,
      meat: 167,
      scrap: 55
    }
  };

  const current = analytics[timeRange as keyof typeof analytics];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2">Slaughterhouse Analytics</h1>
        <p className="text-gray-400">Track the Butcher's performance and domination metrics</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-900 rounded-lg p-2 border border-red-500/20">
          <div className="flex space-x-2">
            {[
              { key: '1d', label: '24 Hours' },
              { key: '7d', label: '7 Days' },
              { key: '30d', label: '30 Days' }
            ].map((range) => (
              <button
                key={range.key}
                onClick={() => setTimeRange(range.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range.key
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Total Predictions</div>
          <div className="text-3xl font-bold text-white">{current.predictions}</div>
          <div className="text-sm text-red-400">Lines analyzed</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Accuracy Rate</div>
          <div className="text-3xl font-bold text-green-400">{current.accuracy}%</div>
          <div className="text-sm text-gray-400">Predictions hit</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Mathematical Profit</div>
          <div className="text-3xl font-bold text-yellow-400">${current.profit.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Based on even odds</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Avg Edge</div>
          <div className="text-3xl font-bold text-red-400">{current.avgEdge}%</div>
          <div className="text-sm text-gray-400">Market advantage</div>
        </div>
      </div>

      {/* Confidence Level Breakdown */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-6">Carnage Level Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400">{current.execution}</div>
            <div className="text-sm text-red-300 font-semibold">EXECUTION</div>
            <div className="text-xs text-gray-400">90%+ confidence</div>
            <div className="mt-2 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${(current.execution / current.predictions) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400">{current.demolition}</div>
            <div className="text-sm text-orange-300 font-semibold">DEMOLITION</div>
            <div className="text-xs text-gray-400">80-89% confidence</div>
            <div className="mt-2 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ width: `${(current.demolition / current.predictions) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400">{current.meat}</div>
            <div className="text-sm text-yellow-300 font-semibold">MEAT</div>
            <div className="text-xs text-gray-400">70-79% confidence</div>
            <div className="mt-2 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(current.meat / current.predictions) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-400">{current.scrap}</div>
            <div className="text-sm text-gray-300 font-semibold">SCRAP</div>
            <div className="text-xs text-gray-400">Below 70%</div>
            <div className="mt-2 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gray-500 h-2 rounded-full" 
                style={{ width: `${(current.scrap / current.predictions) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sport Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <h3 className="text-xl font-bold text-red-400 mb-4">Sport Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>🏀</span>
                <span className="font-semibold">NBA</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-400">86.2%</div>
                <div className="text-sm text-gray-400">45 games</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>🏈</span>
                <span className="font-semibold">NFL</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-400">82.8%</div>
                <div className="text-sm text-gray-400">32 games</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>🏀</span>
                <span className="font-semibold">College Basketball</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-400">83.5%</div>
                <div className="text-sm text-gray-400">78 games</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>🏒</span>
                <span className="font-semibold">NHL</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-400">81.9%</div>
                <div className="text-sm text-gray-400">32 games</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <h3 className="text-xl font-bold text-red-400 mb-4">Edge Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">25%+ Edge</span>
              <div className="text-right">
                <span className="font-bold text-red-400">15.2%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">20-24% Edge</span>
              <div className="text-right">
                <span className="font-bold text-orange-400">23.7%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">15-19% Edge</span>
              <div className="text-right">
                <span className="font-bold text-yellow-400">31.4%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">10-14% Edge</span>
              <div className="text-right">
                <span className="font-bold text-blue-400">22.1%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Below 10%</span>
              <div className="text-right">
                <span className="font-bold text-gray-400">7.6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Top Butchery Opportunities</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
            <div>
              <div className="font-bold">LeBron James Points</div>
              <div className="text-sm text-gray-400">LAL vs MIA</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-red-400">92% Conf</div>
              <div className="text-sm text-gray-400">+31% Edge</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
            <div>
              <div className="font-bold">Josh Allen Passing Yards</div>
              <div className="text-sm text-gray-400">BUF @ PHI</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-orange-400">82% Conf</div>
              <div className="text-sm text-gray-400">+18% Edge</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
            <div>
              <div className="font-bold">Wembanyama Blocks</div>
              <div className="text-sm text-gray-400">SAS vs DAL</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-orange-400">88% Conf</div>
              <div className="text-sm text-gray-400">+24% Edge</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};