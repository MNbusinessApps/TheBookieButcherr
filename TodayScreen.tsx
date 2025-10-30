import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

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

export const TodayScreen: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  // Sample data for demonstration
  const samplePredictions: Prediction[] = [
    {
      prediction_id: 'bb-001',
      player_name: 'LeBron James',
      team: 'LAL',
      sport: 'nba',
      stat_type: 'Points',
      line_value: 24.5,
      recommendation: 'OVER',
      confidence: 0.92,
      analysis: 'Advanced mathematical slaughter based on comprehensive analysis',
      reasoning: 'LeBron James is operating at EXECUTION LEVEL dominance. Home court advantage provides +3.1 PPG average that becomes lethal in playoff atmosphere. Opponent defense ranks 27th in points allowed to small forwards (28.4 PPG), creating a feast opportunity. Lakers offense channels through LeBron with +4.2% usage rate increase in high-stakes games. Recent form shows 27.8 PPG over last 5 games with 31.2% usage rate.',
      edge_percentage: 0.31,
      confidence_level: 'EXECUTION',
      posted_at: '2025-10-31T13:20:00Z',
    },
    {
      prediction_id: 'bb-002',
      player_name: 'Josh Allen',
      team: 'BUF',
      sport: 'nfl',
      stat_type: 'Passing Yards',
      line_value: 249.5,
      recommendation: 'UNDER',
      confidence: 0.82,
      analysis: 'DEMOLITION LEVEL prediction based on historical road performance',
      reasoning: "Josh Allen's road passer rating undergoes MASSACRE against elite defenses. Road performance drops to 84.7 QBR (vs 105.1 at home), representing a 20.4-point decline. Opponent possesses top-5 defense allowing only 6.2 YPA to opposing quarterbacks. Weather warfare intensifies with 18+ mph winds forecasted, historically limiting aerial production.",
      edge_percentage: 0.18,
      confidence_level: 'DEMOLITION',
      posted_at: '2025-10-31T14:45:00Z',
    },
    {
      prediction_id: 'bb-003',
      player_name: 'Victor Wembanyama',
      team: 'SAS',
      sport: 'nba',
      stat_type: 'Blocks',
      line_value: 3.5,
      recommendation: 'OVER',
      confidence: 0.88,
      analysis: 'DEMOLITION LEVEL prediction based on matchup and recent form',
      reasoning: "Wembanyama's block rate SUFFOCATES opposing offenses at home. 3.8 blocks per game average in San Antonio with 6.2% block rate (highest in NBA). Opponent field goal attempts in paint: 48.2 per game, creating maximum rejection opportunities. Recent 5-game average: 4.2 BPG with 7.8% block rate.",
      edge_percentage: 0.24,
      confidence_level: 'DEMOLITION',
      posted_at: '2025-10-31T15:10:00Z',
    },
  ];

  const fetchPredictions = async () => {
    try {
      // In real app, fetch from API
      setTimeout(() => {
        setPredictions(samplePredictions);
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPredictions();
  };

  const filteredPredictions = predictions.filter(pred => {
    if (filter === 'all') return true;
    if (filter === 'execution') return pred.confidence_level === 'EXECUTION';
    if (filter === 'demolition') return pred.confidence_level === 'DEMOLITION';
    if (filter === 'meat') return pred.confidence_level === 'MEAT';
    return true;
  });

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'nba': return '🏀';
      case 'nfl': return '🏈';
      case 'cbb': return '🏀';
      case 'nhl': return '🏒';
      default: return '🥩';
    }
  };

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'EXECUTION': return '#dc2626';
      case 'DEMOLITION': return '#f97316';
      case 'MEAT': return '#eab308';
      case 'SCRAP': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getRecommendationColor = (recommendation: 'OVER' | 'UNDER') => {
    return recommendation === 'OVER' ? '#10b981' : '#ef4444';
  };

  const renderPredictionCard = ({ item }: { item: Prediction }) => (
    <TouchableOpacity 
      style={[styles.card, { borderColor: getConfidenceColor(item.confidence_level) + '40' }]}
      onPress={() => Alert.alert(
        'Butcher Analysis',
        item.reasoning,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Add to Block', 
            onPress: () => Alert.alert('Added to Butcher\'s Block!')
          }
        ]
      )}
    >
      <View style={styles.cardHeader}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>
            {getSportIcon(item.sport)} {item.player_name}
          </Text>
          <Text style={styles.teamInfo}>{item.team}</Text>
          <Text style={styles.sportInfo}>{item.sport.toUpperCase()}</Text>
        </View>
        <View style={styles.confidenceInfo}>
          <View style={[styles.confidenceBadge, { backgroundColor: getConfidenceColor(item.confidence_level) + '20' }]}>
            <Text style={[styles.confidenceText, { color: getConfidenceColor(item.confidence_level) }]}>
              {Math.round(item.confidence * 100)}%
            </Text>
          </View>
          <Text style={styles.confidenceLevel}>{item.confidence_level}</Text>
        </View>
      </View>

      <View style={styles.lineInfo}>
        <View>
          <Text style={styles.statType}>{item.stat_type}</Text>
          <Text style={styles.lineValue}>{item.line_value}</Text>
        </View>
        <View style={styles.recommendationInfo}>
          <Text style={styles.recommendationLabel}>Butcher's Call</Text>
          <Text style={[styles.recommendationValue, { color: getRecommendationColor(item.recommendation) }]}>
            {item.recommendation}
          </Text>
        </View>
      </View>

      <View style={styles.edgeInfo}>
        <Text style={styles.edgeLabel}>Mathematical Carnage</Text>
        <Text style={styles.edgeValue}>+{Math.round(item.edge_percentage * 100)}%</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => Alert.alert('Added to Butcher\'s Block!')}
        >
          <Text style={styles.addButtonText}>Add to Block</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.analysisButton}>
          <Text style={styles.analysisButtonText}>📊</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>🥩 Preparing the Slaughter...</Text>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Stats Header */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{predictions.length}</Text>
          <Text style={styles.statLabel}>Daily Kill Count</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {predictions.filter(p => p.confidence_level === 'EXECUTION').length}
          </Text>
          <Text style={styles.statLabel}>Execution Level</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {Math.round(predictions.reduce((sum, p) => sum + p.edge_percentage, 0) / predictions.length * 100)}%
          </Text>
          <Text style={styles.statLabel}>Avg Carnage</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All Levels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'execution' && styles.filterButtonActive]}
          onPress={() => setFilter('execution')}
        >
          <Text style={[styles.filterText, filter === 'execution' && styles.filterTextActive]}>
            🔥 EXECUTION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'demolition' && styles.filterButtonActive]}
          onPress={() => setFilter('demolition')}
        >
          <Text style={[styles.filterText, filter === 'demolition' && styles.filterTextActive]}>
            ⚡ DEMOLITION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'meat' && styles.filterButtonActive]}
          onPress={() => setFilter('meat')}
        >
          <Text style={[styles.filterText, filter === 'meat' && styles.filterTextActive]}>
            🥩 MEAT
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Predictions List */}
      <FlatList
        data={filteredPredictions}
        renderItem={renderPredictionCard}
        keyExtractor={(item) => item.prediction_id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#dc2626',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dc262620',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 5,
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#dc2626',
  },
  filterText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#dc2626',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  teamInfo: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '600',
    marginBottom: 2,
  },
  sportInfo: {
    fontSize: 12,
    color: '#888888',
    textTransform: 'uppercase',
  },
  confidenceInfo: {
    alignItems: 'flex-end',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  confidenceLevel: {
    fontSize: 10,
    color: '#888888',
  },
  lineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statType: {
    fontSize: 14,
    color: '#cccccc',
  },
  lineValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  recommendationInfo: {
    alignItems: 'flex-end',
  },
  recommendationLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  recommendationValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  edgeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  edgeLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  edgeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  analysisButton: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  analysisButtonText: {
    fontSize: 16,
  },
});