import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TimeData {
  server_utc: string;
  server_timezone: string;
}

export const LiveClock: React.FC = () => {
  const [now, setNow] = useState(Date.now());
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [skew, setSkew] = useState(0);

  // Fetch server time to calculate skew
  const syncWithServer = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/time');
      const data = await response.json();
      setTimeData(data);
      
      // Calculate skew between server and client time
      const serverTime = new Date(data.server_utc).getTime();
      const clientTime = Date.now();
      setSkew(serverTime - clientTime);
    } catch (error) {
      console.error('Failed to sync time with server:', error);
      // Use local time as fallback
    }
  };

  useEffect(() => {
    // Sync with server on component mount
    syncWithServer();
    
    // Sync every 5 minutes to correct drift
    const syncInterval = setInterval(syncWithServer, 5 * 60 * 1000);
    
    // Update clock every second
    const clockInterval = setInterval(() => {
      setNow(Date.now() + skew);
    }, 1000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(clockInterval);
    };
  }, [skew]);

  // Calculate Central Time with skew correction
  const getCentralTime = () => {
    const adjustedTime = now + skew;
    return new Date(adjustedTime).toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getCurrentDate = () => {
    return new Date(now + skew).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{getCentralTime()}</Text>
      <Text style={styles.timezoneText}>CT</Text>
      <Text style={styles.dateText}>{getCurrentDate()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  timezoneText: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 2,
  },
  dateText: {
    fontSize: 10,
    color: '#888888',
  },
});