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

interface SportData {
  name: string;
  icon: string;
  games: number;
  lines: number;
  avgEdge: string;
  featured?: {
    player: string;
    stat: string;
    line: number;
    recommendation: 'OVER' | 'UNDER';
    edge: string;
    time: string;
  }[];
}

export const SportsScreen: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('nba');

  const sportData: Record<string, SportData> = {
    nba: {
      name: 'NBA',
      icon: '🏀',
      games: 8,
      lines: 156,
      avgEdge: '24.3%',
      featured: [
        {
          player: 'LeBron James',
          stat: 'Points',
          line: 24.5,
          recommendation: 'OVER',
          edge: '+31%',
          time: '7:30 PM CT'
        },
        {
          player: 'Victor Wembanyama',
          stat: 'Blocks',
          line: 3.5,
          recommendation: 'OVER',
          edge: '+24%',
          time: '8:00 PM CT'
        }
      ]
    },
    nfl: {
      name: 'NFL',
      icon: '🏈',
      games: 4,
      lines: 89,
      avgEdge: '19.7%',
      featured: [
        {
          player: 'Josh Allen',
          stat: 'Passing Yards',
          line: 249.5,
          recommendation: 'UNDER',
          edge: '+18%',
          time: '1:00 PM CT'
        },
        {
          player: 'Christian McCaffrey',
          stat: 'Rushing Yards',
          line: 85.5,
          recommendation: 'OVER',
          edge: '+15%',
          time: '4:25 PM CT'
        }
      ]
    },
    cbb: {
      name: 'College Basketball',
      icon: '🏀',
      games: 12,
      lines: 198,
      avgEdge: '22.1%',
      featured: [
        {
          player: 'Duke Blue Devils',
          stat: 'Team Points',
          line: 78.5,
          recommendation: 'OVER',
          edge: '+22%',
          time: '8:00 PM CT'
        }
      ]
    },
    nhl: {
      name: 'NHL',
      icon: '🏒',
      games: 6,
      lines: 134,
      avgEdge: '18.9%',
      featured: [
        {
          player: 'Connor McDavid',
          stat: 'Points',
          line: 1.5,
          recommendation: 'OVER',
          edge: '+19%',
          time: '9:30 PM CT'
        }
      ]
    }
  };

  const currentSport = sportData[selectedSport];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weapon Selection</Text>
        <Text style={styles.headerSubtitle}>Choose your sporting arsenal for today's slaughter</Text>
      </View>

      {/* Sport Selection */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportSelection}>
        {Object.entries(sportData).map(([key, sport]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.sportButton,
              selectedSport === key && styles.sportButtonActive
            ]}
            onPress={() => setSelectedSport(key)}
          >
            <Text style={styles.sportIcon}>{sport.icon}</Text>
            <Text style={styles.sportName}>{sport.name}</Text>
            <Text style={styles.sportDetails}>
              {sport.games} games • {sport.lines} lines
            </Text>
            <Text style={styles.sportEdge}>Avg: {sport.avgEdge}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Current Sport Details */}
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.sportHeader}>
          <View style={styles.sportTitleContainer}>
            <Text style={styles.sportTitleIcon}>{currentSport.icon}</Text>
            <View>
              <Text style={styles.sportTitle}>{currentSport.name}</Text>
              <Text style={styles.sportSubtitle}>Today's lines and opportunities</Text>
            </View>
          </View>
          <View style={styles.linesCount}>
            <Text style={styles.linesNumber}>{currentSport.lines}</Text>
            <Text style={styles.linesLabel}>Active Lines</Text>
          </View>
        </View>

        {/* Featured Predictions */}
        <Text style={styles.featuredTitle}>Today's Featured Carnage</Text>
        
        <View style={styles.predictionsList}>
          {currentSport.featured?.map((pred, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.predictionCard}
              onPress={() => Alert.alert(
                'Butcher Analysis',
                `${pred.player} - ${pred.stat}\n\nRecommendation: ${pred.recommendation}\nEdge: ${pred.edge}\n\nThis pick is based on advanced mathematical analysis and current market conditions.`,
                [{ text: 'Close', style: 'cancel' }]
              )}
            >
              <View style={styles.predictionHeader}>
                <Text style={styles.predictionPlayer}>{pred.player}</Text>
                <Text style={styles.predictionTime}>{pred.time}</Text>
              </View>
              <Text style={styles.predictionStat}>{pred.stat}</Text>
              
              <View style={styles.predictionFooter}>
                <View style={styles.recommendationContainer}>
                  <Text style={[
                    styles.predictionRecommendation,
                    { color: pred.recommendation === 'OVER' ? '#10b981' : '#ef4444' }
                  ]}>
                    {pred.recommendation} {pred.line}
                  </Text>
                </View>
                <Text style={styles.predictionEdge}>{pred.edge} edge</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* All Lines Section */}
        <Text style={styles.sectionTitle}>All Available Lines</Text>
        <View style={styles.allLinesContainer}>
          <Text style={styles.allLinesText}>
            View all {currentSport.lines} lines for {currentSport.name}
          </Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View Complete Lines</Text>
          </TouchableOpacity>
        </View>
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
  sportSelection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sportButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sportButtonActive: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  sportIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  sportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  sportDetails: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 2,
  },
  sportEdge: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  sportHeader: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dc262620',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sportTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportTitleIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  sportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sportSubtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  linesCount: {
    alignItems: 'flex-end',
  },
  linesNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  linesLabel: {
    fontSize: 12,
    color: '#888888',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 12,
  },
  predictionsList: {
    marginBottom: 20,
  },
  predictionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dc262640',
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  predictionPlayer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  predictionTime: {
    fontSize: 12,
    color: '#888888',
  },
  predictionStat: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 12,
  },
  predictionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendationContainer: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  predictionRecommendation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  predictionEdge: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 12,
    marginTop: 10,
  },
  allLinesContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dc262620',
  },
  allLinesText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  viewAllButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});