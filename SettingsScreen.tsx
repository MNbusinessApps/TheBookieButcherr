import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    timezone: 'America/Chicago',
    notifications: {
      execution: true,
      demolition: true,
      edge: true,
      lineMovement: false
    },
    display: {
      showPercentages: true,
      showEdges: true,
      compactView: false
    },
    alerts: {
      minConfidence: 0.80,
      minEdge: 0.15,
      soundEnabled: true,
      emailAlerts: false
    }
  });

  const toggleNotification = (key: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const toggleDisplay = (key: string) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: !prev.display[key]
      }
    }));
  };

  const handleConfidenceChange = (value: number) => {
    setSettings(prev => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        minConfidence: value
      }
    }));
  };

  const handleEdgeChange = (value: number) => {
    setSettings(prev => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        minEdge: value
      }
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Locker</Text>
        <Text style={styles.headerSubtitle}>Configure your slaughter preferences</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Time & Regional Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time & Regional</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Timezone</Text>
            <View style={styles.timezoneInfo}>
              <Text style={styles.timezoneValue}>
                {new Date().toLocaleString('en-US', { 
                  timeZone: settings.timezone,
                  timeStyle: 'medium',
                  dateStyle: 'full'
                })}
              </Text>
            </View>
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.dropdownText}>Central Time (CT)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Notifications</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>EXECUTION Level Picks</Text>
              <Text style={styles.settingDesc}>90%+ confidence predictions</Text>
            </View>
            <Switch
              value={settings.notifications.execution}
              onValueChange={() => toggleNotification('execution')}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.notifications.execution ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>DEMOLITION Level Picks</Text>
              <Text style={styles.settingDesc}>80-89% confidence predictions</Text>
            </View>
            <Switch
              value={settings.notifications.demolition}
              onValueChange={() => toggleNotification('demolition')}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.notifications.demolition ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>High Edge Opportunities</Text>
              <Text style={styles.settingDesc}>When edge exceeds threshold</Text>
            </View>
            <Switch
              value={settings.notifications.edge}
              onValueChange={() => toggleNotification('edge')}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.notifications.edge ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Line Movement</Text>
              <Text style={styles.settingDesc}>Significant odds changes</Text>
            </View>
            <Switch
              value={settings.notifications.lineMovement}
              onValueChange={() => toggleNotification('lineMovement')}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.notifications.lineMovement ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>
        </View>

        {/* Display Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display Preferences</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Show Confidence Percentages</Text>
              <Text style={styles.settingDesc}>Display numerical confidence levels</Text>
            </View>
            <Switch
              value={settings.display.showPercentages}
              onValueChange={() => toggleDisplay('showPercentages')}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.display.showPercentages ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Show Market Edges</Text>
              <Text style={styles.settingDesc}>Display mathematical advantage percentages</Text>
            </View>
            <Switch
              value={settings.display.showEdges}
              onValueChange={() => toggleDisplay('showEdges')}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.display.showEdges ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Compact View</Text>
              <Text style={styles.settingDesc}>Show more predictions per screen</Text>
            </View>
            <Switch
              value={settings.display.compactView}
              onValueChange={() => toggleDisplay('compactView')}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.display.compactView ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>
        </View>

        {/* Alert Thresholds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Thresholds</Text>
          
          <View style={styles.thresholdItem}>
            <Text style={styles.thresholdLabel}>Minimum Confidence Level</Text>
            <View style={styles.thresholdValueContainer}>
              <Text style={styles.thresholdValue}>
                {Math.round(settings.alerts.minConfidence * 100)}%
              </Text>
            </View>
            <Text style={styles.thresholdDesc}>
              Only alert on predictions above this confidence level
            </Text>
          </View>

          <View style={styles.thresholdItem}>
            <Text style={styles.thresholdLabel}>Minimum Edge Percentage</Text>
            <View style={styles.thresholdValueContainer}>
              <Text style={styles.thresholdValue}>
                {Math.round(settings.alerts.minEdge * 100)}%
              </Text>
            </View>
            <Text style={styles.thresholdDesc}>
              Alert when mathematical edge exceeds this threshold
            </Text>
          </View>
        </View>

        {/* Sound & Communication */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound & Communication</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Sound Notifications</Text>
              <Text style={styles.settingDesc}>Play sound for high-priority alerts</Text>
            </View>
            <Switch
              value={settings.alerts.soundEnabled}
              onValueChange={() => setSettings(prev => ({
                ...prev,
                alerts: {
                  ...prev.alerts,
                  soundEnabled: !prev.alerts.soundEnabled
                }
              }))}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.alerts.soundEnabled ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Email Alerts</Text>
              <Text style={styles.settingDesc}>Send email notifications for major opportunities</Text>
            </View>
            <Switch
              value={settings.alerts.emailAlerts}
              onValueChange={() => setSettings(prev => ({
                ...prev,
                alerts: {
                  ...prev.alerts,
                  emailAlerts: !prev.alerts.emailAlerts
                }
              }))}
              trackColor={{ false: '#333333', true: '#dc2626' }}
              thumbColor={settings.alerts.emailAlerts ? '#ffffff' : '#666666'}
            />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutName}>The Bookie Butcher</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0</Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutDesc}>
              Professional sports analytics platform for analytical purposes only.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.aboutButton}>
            <Text style={styles.aboutButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aboutButton}>
            <Text style={styles.aboutButtonText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <View style={styles.saveContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Butcher's Preferences</Text>
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
  scrollContainer: {
    flex: 1,
  },
  section: {
    backgroundColor: '#1a1a1a',
    margin: 15,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dc262620',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 14,
    color: '#cccccc',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  timezoneInfo: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  timezoneValue: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
  },
  dropdownButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  dropdownText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  thresholdItem: {
    marginBottom: 20,
  },
  thresholdLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  thresholdValueContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  thresholdValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  thresholdDesc: {
    fontSize: 12,
    color: '#888888',
  },
  aboutItem: {
    marginBottom: 16,
  },
  aboutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    color: '#cccccc',
  },
  aboutDesc: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  aboutButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  aboutButtonText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  saveContainer: {
    padding: 15,
  },
  saveButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});