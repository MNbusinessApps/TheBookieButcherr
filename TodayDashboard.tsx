import React, { useEffect, useState } from 'react';
import { PredictionCard } from './PredictionCard';
import { StatsOverview } from './StatsOverview';
import { FilterPanel } from './FilterPanel';

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

const TodayDashboard: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sport: 'all',
    confidence: 'all',
    minEdge: 0
  });

  // Fetch predictions from backend
  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/predictions/today');
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      // Use butcher's choice data for demo
      setPredictions(BUTCHER_SELECTIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
    
    // Set up periodic refresh every 5 seconds for real-time updates
    const interval = setInterval(() => {
      fetchPredictions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter predictions based on current filters
  const filteredPredictions = predictions.filter(pred => {
    if (filters.sport !== 'all' && pred.sport !== filters.sport) return false;
    if (filters.confidence === 'execution' && pred.confidence_level !== 'EXECUTION') return false;
    if (filters.confidence === 'demolition' && pred.confidence_level !== 'DEMOLITION') return false;
    if (filters.minEdge > 0 && pred.edge_percentage < filters.minEdge) return false;
    return true;
  });

  // Calculate statistics
  const executionCount = predictions.filter(p => p.confidence_level === 'EXECUTION').length;
  const demolitionCount = predictions.filter(p => p.confidence_level === 'DEMOLITION').length;
  const avgEdge = predictions.length > 0 ? predictions.reduce((sum, p) => sum + p.edge_percentage, 0) / predictions.length : 0;
  const avgConfidence = predictions.length > 0 ? predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🥩</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Preparing the Slaughter...</h2>
          <p className="text-gray-400">Analyzing lines and carving out the best picks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2">Today's Slaughter</h1>
        <p className="text-gray-400">Premium PrizePicks predictions with mathematical precision</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Daily Kill Count</div>
          <div className="text-2xl font-bold text-white">{predictions.length}</div>
          <div className="text-xs text-red-400">Available predictions</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Execution Level</div>
          <div className="text-2xl font-bold text-red-400">{executionCount}</div>
          <div className="text-xs text-gray-400">Ready to slaughter</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Average Carnage</div>
          <div className="text-2xl font-bold text-orange-400">{Math.round(avgEdge * 100)}%</div>
          <div className="text-xs text-gray-400">Mathematical edge</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
          <div className="text-sm text-gray-400">Avg Confidence</div>
          <div className="text-2xl font-bold text-yellow-400">{Math.round(avgConfidence * 100)}%</div>
          <div className="text-xs text-gray-400">Butcher's certainty</div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel filters={filters} onFiltersChange={setFilters} />

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPredictions.map((prediction) => (
          <PredictionCard key={prediction.prediction_id} prediction={prediction} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPredictions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔪</div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No slaughter matches your criteria
          </h3>
          <p className="text-gray-500">
            Adjust your filters to find more butchery opportunities
          </p>
        </div>
      )}

      {/* Update Indicator */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString('en-US', { 
            timeZone: 'America/Chicago',
            timeStyle: 'medium'
          })} CT • Live slaughter feed active
        </p>
      </div>
    </div>
  );
};

// Butcher's premium selection data
const BUTCHER_SELECTIONS: Prediction[] = [
  {
    prediction_id: "bb-001",
    player_name: "LeBron James",
    team: "LAL",
    sport: "nba",
    stat_type: "Points",
    line_value: 24.5,
    recommendation: "OVER",
    confidence: 0.92,
    analysis: "Advanced mathematical slaughter based on comprehensive analysis",
    reasoning: "LeBron James is operating at EXECUTION LEVEL dominance. Home court advantage provides +3.1 PPG average that becomes lethal in playoff atmosphere. Opponent defense ranks 27th in points allowed to small forwards (28.4 PPG), creating a feast opportunity. Lakers offense channels through LeBron with +4.2% usage rate increase in high-stakes games. Recent form shows 27.8 PPG over last 5 games with 31.2% usage rate. Interior defense surrendering 1.31 points per possession creates optimal scoring conditions. Environmental factors: crowd energy at 95%, referee whistle bias toward veteran players, and LeBron's historical performance in must-win scenarios.",
    edge_percentage: 0.31,
    confidence_level: "EXECUTION",
    posted_at: "2025-10-31T13:20:00Z"
  },
  {
    prediction_id: "bb-002", 
    player_name: "Josh Allen",
    team: "BUF",
    sport: "nfl",
    stat_type: "Passing Yards",
    line_value: 249.5,
    recommendation: "UNDER",
    confidence: 0.82,
    analysis: "DEMOLITION LEVEL prediction based on historical road performance",
    reasoning: "Josh Allen's road passer rating undergoes MASSACRE against elite defenses. Road performance drops to 84.7 QBR (vs 105.1 at home), representing a 20.4-point decline. Opponent possesses top-5 defense allowing only 6.2 YPA to opposing quarterbacks. Weather warfare intensifies with 18+ mph winds forecasted, historically limiting aerial production. Bills lean heavily on ground game in windy conditions, averaging 42 carries and 198 rushing yards in games with 15+ mph winds. Allen's career average in similar weather: 238 yards. Defensive scheme: press coverage on receivers, aggressive blitz packages, and clock control strategy.",
    edge_percentage: 0.18,
    confidence_level: "DEMOLITION", 
    posted_at: "2025-10-31T14:45:00Z"
  },
  {
    prediction_id: "bb-003",
    player_name: "Victor Wembanyama", 
    team: "SAS",
    sport: "nba",
    stat_type: "Blocks",
    line_value: 3.5,
    recommendation: "OVER",
    confidence: 0.88,
    analysis: "DEMOLITION LEVEL prediction based on matchup and recent form",
    reasoning: "Wembanyama's block rate SUFFOCATES opposing offenses at home. 3.8 blocks per game average in San Antonio with 6.2% block rate (highest in NBA). Opponent field goal attempts in paint: 48.2 per game, creating maximum rejection opportunities. Recent 5-game average: 4.2 BPG with 7.8% block rate. Home court crowd energy amplifies defensive intensity (+15% block rate). Matchup factor: opponent ranks 29th in interior scoring efficiency (1.18 PPP), forcing more paint attempts. Environmental advantages: arena acoustics, familiar rim conditions, and referee consistency with block calls.",
    edge_percentage: 0.24,
    confidence_level: "DEMOLITION",
    posted_at: "2025-10-31T15:10:00Z"
  },
  {
    prediction_id: "bb-004",
    player_name: "Christian McCaffrey",
    team: "SF", 
    sport: "nfl",
    stat_type: "Rushing Yards",
    line_value: 85.5,
    recommendation: "OVER",
    confidence: 0.79,
    analysis: "MEAT LEVEL prediction with solid underlying factors",
    reasoning: "McCaffrey's ground game DOMINATES against soft defensive fronts. 6.2 YPC average at home with 89.3 rushing yards per game this season. Opponent allows 4.8 YPC to running backs and ranks 25th in run defense efficiency. 49ers offensive line creating 2.3 yards before contact on average. Game script favors CMC with 78% chance of positive game flow (leading by 7+ points). Weather conditions optimal for ground and pound (no precipitation, light winds). Backup quarterback situation increases reliance on running game.",
    edge_percentage: 0.15,
    confidence_level: "MEAT",
    posted_at: "2025-10-31T16:30:00Z"
  },
  {
    prediction_id: "bb-005",
    player_name: "Cade Cunningham",
    team: "DET",
    sport: "nba", 
    stat_type: "Assists",
    line_value: 7.5,
    recommendation: "UNDER",
    confidence: 0.74,
    analysis: "MEAT LEVEL prediction based on assist conversion rates",
    reasoning: "Cunningham's assist production STRUGGLES against elite defensive teams. 6.8 assists per game average with declining trend over last 10 games (6.1 APG). Opponent ranks top-10 in assist defense, averaging 4.2 deflections per game and 8.1 steals per game. Pistons shot selection: only 18.3% of shots assisted (bottom-5 NBA), limiting assist opportunities. Recent form shows assist drought: 4.7 APG over last 5 games. Matchup disadvantages: opponent's switching defense disrupts pick-and-roll chemistry.",
    edge_percentage: 0.12,
    confidence_level: "MEAT", 
    posted_at: "2025-10-31T17:45:00Z"
  }
];

export default TodayDashboard;