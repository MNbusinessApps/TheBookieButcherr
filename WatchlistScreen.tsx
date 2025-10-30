import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

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

export const WatchlistScreen: React.FC = () => {
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
    Alert.alert(
      'Remove from Block',
      'Are you sure you want to remove this pick from your butcher\'s block?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setWatchlistItems(items => items.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.90) return '#dc2626';
    if (confidence >= 0.80) return '#f97316';
    if (confidence >= 0.70) return '#eab308';
    return '#6b7280';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.90) return 'EXECUTION';
    if (confidence >= 0.80) return 'DEMOLITION';
    if (confidence >= 0.70) return 'MEAT';
    return 'SCRAP';
  };

  const getRecommendationColor = (recommendation: 'OVER' | 'UNDER') => {
    return recommendation === 'OVER' ? '#10b981' : '#ef4444';
  };

  const avgConfidence = watchlistItems.length > 0 
    ? watchlistItems.reduce((sum, item) => sum + item.confidence, 0) / watchlistItems.length
    : 0;

  const avgEdge = watchlistItems.length > 0
    ? watchlistItems.reduce((sum, item) => sum + item.edge, 0) / watchlistItems.length
    : 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Butcher's Block</Text>
        <Text style={styles.headerSubtitle}>Your saved slaughter opportunities</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{watchlistItems.length}</Text>
          <Text style={styles.statLabel}>Saved Picks</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{Math.round(avgConfidence * 100)}%</Text>
          <Text style={styles.statLabel}>Avg Confidence</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{Math.round(avgEdge * 100)}%</Text>
          <Text style={styles.statLabel}>Avg Edge</Text>
        </View>
      </View>

      {/* Watchlist Items */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {watchlistItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🥩</Text>
            <Text style={styles.emptyTitle}>Your block is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add predictions to your butcher's block to track opportunities
            </Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Browse Today's Picks</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            {watchlistItems.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.itemCard}
                onPress={() => Alert.alert(
                  'Butcher Analysis',
                  `${item.player} - ${item.stat}\n\nRecommendation: ${item.recommendation}\nConfidence: ${Math.round(item.confidence * 100)}%\nEdge: +${Math.round(item.edge * 100)}%\n\nAdded: ${new Date(item.addedAt).toLocaleDateString()}\n${item.alertPrice ? `Alert at: ${item.alertPrice}` : ''}\n\nTap "Remove" to delete from your block.`,
                  [
                    { text: 'Close', style: 'cancel' },
                    { text: 'Remove', style: 'destructive', onPress: () => removeFromWatchlist(item.id) }
                  ]
                )}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>{item.player}</Text>
                    <Text style={styles.teamStat}>{item.team} • {item.stat}</Text>
                  </View>
                  <View style={styles.confidenceBadge}>
                    <Text style={[styles.confidenceText, { color: getConfidenceColor(item.confidence) }]}>
                      {Math.round(item.confidence * 100)}%
                    </Text>
                    <Text style={styles.confidenceLevel}>{getConfidenceLabel(item.confidence)}</Text>
                  </View>
                </View>

                <View style={styles.lineInfo}>
                  <View>
                    <Text style={styles.lineLabel}>Line</Text>
                    <Text style={styles.lineValue}>{item.line}</Text>
                  </View>
                  <View style={styles.recommendationContainer}>
                    <Text style={[styles.recommendationValue, { color: getRecommendationColor(item.recommendation) }]}>
                      {item.recommendation}
                    </Text>
                    <Text style={styles.recommendationLabel}>Butcher's Call</Text>
                  </View>
                </View>

                <View style={styles.edgeInfo}>
                  <Text style={styles.edgeLabel}>Mathematical Carnage</Text>
                  <Text style={styles.edgeValue}>+{Math.round(item.edge * 100)}%</Text>
                </View>

                <View style={styles.addedInfo}>
                  <Text style={styles.addedText}>
                    Added: {new Date(item.addedAt).toLocaleDateString()}
                  </Text>
                  {item.alertPrice && (
                    <Text style={styles.alertText}>Alert at: {item.alertPrice}</Text>
                  )}
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.viewAnalysisButton}
                    onPress={() => Alert.alert(
                      'Detailed Analysis',
                      `${item.player} - ${item.stat}\n\nThis prediction is based on advanced mathematical analysis including:\n\n• Historical performance vs similar opponents\n• Current market conditions\n• Environmental factors\n• Recent form and trends\n\nRecommendation: ${item.recommendation}\nConfidence: ${Math.round(item.confidence * 100)}%\nMathematical Edge: +${Math.round(item.edge * 100)}%`,
                      [{ text: 'Close', style: 'cancel' }]
                    )}
                  >
                    <Text style={styles.viewAnalysisButtonText}>View Analysis</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeFromWatchlist(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Alerts Configuration */}
        {watchlistItems.length > 0 && (
          <View style={styles.alertsSection}>
            <Text style={styles.alertsTitle}>Alert Configuration</Text>
            
            <TouchableOpacity style={styles.alertToggle}>
              <View style={styles.alertInfo}>
                <Text style={styles.alertName}>High Confidence Alerts</Text>
                <Text style={styles.alertDesc}>Notify when Execution Level picks appear</Text>
              </View>
              <View style={styles.alertSwitch}>
                <Text style={styles.alertSwitchText}>ON</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.alertToggle}>
              <View style={styles.alertInfo}>
                <Text style={styles.alertName}>Edge Alerts</Text>
                <Text style={styles.alertDesc}>Alert when edge exceeds 25%</Text>
              </View>
              <View style={styles.alertSwitch}>
                <Text style={styles.alertSwitchText}>ON</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.alertToggle}>
              <View style={styles.alertInfo}>
                <Text style={styles.alertName}>Line Movement</Text>
                <Text style={styles.alertDesc}>Track significant line changes</Text>
              </View>
              <View style={styles.alertSwitch}>
                <Text style={styles.alertSwitchText}>OFF</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
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
  listContainer: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#cccccc',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  itemsContainer: {
    marginBottom: 20,
  },
  itemCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#dc262640',
  },
  itemHeader: {
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
  teamStat: {
    fontSize: 14,
    color: '#cccccc',
  },
  confidenceBadge: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontSize: 16,
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
  lineLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  lineValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  recommendationContainer: {
    alignItems: 'flex-end',
  },
  recommendationValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recommendationLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  edgeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  addedInfo: {
    marginBottom: 12,
  },
  addedText: {
    fontSize: 12,
    color: '#888888',
  },
  alertText: {
    fontSize: 12,
    color: '#eab308',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  viewAnalysisButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAnalysisButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  removeButtonText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  alertsSection: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dc262620',
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 12,
  },
  alertToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  alertInfo: {
    flex: 1,
  },
  alertName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  alertDesc: {
    fontSize: 14,
    color: '#cccccc',
  },
  alertSwitch: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  alertSwitchText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});