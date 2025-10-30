import React, { useState } from 'react';

interface Prediction {
  prediction_id: string;
  player_name: string;
  team: string;
  sport: string;
  stat_type: string;
  line_value: number;
  recommendation: 'OVER' | 'UNDER';
  confidence: number;
  analysis: string;
  reasoning: string;
  edge_percentage: number;
  confidence_level: 'EXECUTION' | 'DEMOLITION' | 'MEAT' | 'SCRAP';
  posted_at: string;
}

interface PredictionCardProps {
  prediction: Prediction;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const [expanded, setExpanded] = useState(false);

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'nba': return '🏀';
      case 'nfl': return '🏈';
      case 'cbb': return '🏀';
      case 'nhl': return '🏒';
      default: return '🥩';
    }
  };

  const getConfidenceColor = (confidence: number, level: string) => {
    if (level === 'EXECUTION') return 'text-red-400 bg-red-900/30';
    if (level === 'DEMOLITION') return 'text-orange-400 bg-orange-900/30';
    if (level === 'MEAT') return 'text-yellow-400 bg-yellow-900/30';
    return 'text-gray-400 bg-gray-900/30';
  };

  const getConfidenceLabel = (level: string) => {
    switch (level) {
      case 'EXECUTION': return 'EXECUTION';
      case 'DEMOLITION': return 'DEMOLITION';
      case 'MEAT': return 'MEAT';
      case 'SCRAP': return 'SCRAP';
      default: return 'UNKNOWN';
    }
  };

  const getRecommendationColor = (recommendation: 'OVER' | 'UNDER') => {
    return recommendation === 'OVER' ? 'text-green-400' : 'text-red-400';
  };

  const getEdgeColor = (edge: number) => {
    if (edge >= 0.25) return 'text-red-400';
    if (edge >= 0.15) return 'text-orange-400';
    if (edge >= 0.10) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="bg-gray-800 border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="mr-2">{getSportIcon(prediction.sport)}</span>
            {prediction.player_name}
          </h3>
          <p className="text-sm text-red-400 font-semibold">{prediction.team}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wide">{prediction.sport}</p>
        </div>
        <div className="text-right">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getConfidenceColor(prediction.confidence, prediction.confidence_level)}`}>
            {Math.round(prediction.confidence * 100)}%
          </div>
          <p className="text-xs text-gray-400 mt-1">{getConfidenceLabel(prediction.confidence_level)}</p>
        </div>
      </div>

      {/* Line Info */}
      <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">{prediction.stat_type}</p>
            <p className="text-2xl font-bold text-white">{prediction.line_value}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Butcher's Call</p>
            <p className={`text-xl font-bold ${getRecommendationColor(prediction.recommendation)}`}>
              {prediction.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Edge Indicator */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Mathematical Carnage</span>
        <span className={`text-sm font-bold ${getEdgeColor(prediction.edge_percentage)}`}>
          +{Math.round(prediction.edge_percentage * 100)}%
        </span>
      </div>

      {/* Analysis Preview */}
      <div className="mb-4">
        <p className="text-sm text-gray-300 leading-relaxed">
          {expanded 
            ? prediction.reasoning 
            : `${prediction.reasoning.substring(0, 150)}...`
          }
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-red-400 text-sm mt-2 hover:text-red-300 transition-colors"
        >
          {expanded ? 'Hide Analysis' : 'Read Full Butchery'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-2 px-4 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200">
          Add to Butcher's Block
        </button>
        <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
          <span>📊</span>
        </button>
      </div>

      {/* Live Indicator */}
      <div className="mt-3 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Live Slaughter Feed</span>
        </div>
      </div>
    </div>
  );
};