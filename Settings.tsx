import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    timezone: 'America/Chicago',
    notifications: {
      execution: true,
      demolition: true,
      edge: true,
      lineMovement: false
    },
    display: {
      darkMode: true,
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

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleDisplayChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value
      }
    }));
  };

  const handleAlertChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2">The Locker</h1>
        <p className="text-gray-400">Configure your slaughter preferences and alerts</p>
      </div>

      {/* Time & Regional Settings */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Time & Regional</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Timezone
            </label>
            <select 
              value={settings.timezone}
              onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
            >
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-400">
            Current time: {new Date().toLocaleString('en-US', { 
              timeZone: settings.timezone,
              timeStyle: 'medium',
              dateStyle: 'full'
            })}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Alert Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">EXECUTION Level Picks</div>
              <div className="text-sm text-gray-400">90%+ confidence predictions</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.notifications.execution}
              onChange={(e) => handleNotificationChange('execution', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">DEMOLITION Level Picks</div>
              <div className="text-sm text-gray-400">80-89% confidence predictions</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.notifications.demolition}
              onChange={(e) => handleNotificationChange('demolition', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">High Edge Opportunities</div>
              <div className="text-sm text-gray-400">When edge exceeds threshold</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.notifications.edge}
              onChange={(e) => handleNotificationChange('edge', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Line Movement</div>
              <div className="text-sm text-gray-400">Significant odds changes</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.notifications.lineMovement}
              onChange={(e) => handleNotificationChange('lineMovement', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
        </div>
      </div>

      {/* Display Preferences */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Display Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Show Confidence Percentages</div>
              <div className="text-sm text-gray-400">Display numerical confidence levels</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.display.showPercentages}
              onChange={(e) => handleDisplayChange('showPercentages', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Show Market Edges</div>
              <div className="text-sm text-gray-400">Display mathematical advantage percentages</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.display.showEdges}
              onChange={(e) => handleDisplayChange('showEdges', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Compact View</div>
              <div className="text-sm text-gray-400">Show more predictions per screen</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.display.compactView}
              onChange={(e) => handleDisplayChange('compactView', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Alert Thresholds</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Minimum Confidence Level
            </label>
            <div className="flex items-center space-x-4">
              <input 
                type="range" 
                min="0.60" 
                max="0.95" 
                step="0.05"
                value={settings.alerts.minConfidence}
                onChange={(e) => handleAlertChange('minConfidence', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white font-semibold w-16">
                {Math.round(settings.alerts.minConfidence * 100)}%
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Only alert on predictions above this confidence level
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Minimum Edge Percentage
            </label>
            <div className="flex items-center space-x-4">
              <input 
                type="range" 
                min="0.05" 
                max="0.35" 
                step="0.05"
                value={settings.alerts.minEdge}
                onChange={(e) => handleAlertChange('minEdge', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white font-semibold w-16">
                {Math.round(settings.alerts.minEdge * 100)}%
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Alert when mathematical edge exceeds this threshold
            </div>
          </div>
        </div>
      </div>

      {/* Sound & Email */}
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Sound & Communication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Sound Notifications</div>
              <div className="text-sm text-gray-400">Play sound for high-priority alerts</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.alerts.soundEnabled}
              onChange={(e) => handleAlertChange('soundEnabled', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <div>
              <div className="font-semibold text-white">Email Alerts</div>
              <div className="text-sm text-gray-400">Send email notifications for major opportunities</div>
            </div>
            <input 
              type="checkbox" 
              checked={settings.alerts.emailAlerts}
              onChange={(e) => handleAlertChange('emailAlerts', e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500" 
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-8 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200">
          Save Butcher's Preferences
        </button>
      </div>
    </div>
  );
};