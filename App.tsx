import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LiveClock } from './components/LiveClock';
import { TodayDashboard } from './components/TodayDashboard';
import { SportsLines } from './components/SportsLines';
import { Analytics } from './components/Analytics';
import { Watchlist } from './components/Watchlist';
import { Settings } from './components/Settings';
import { WebSocketProvider } from './context/WebSocketContext';

// Theme - Bookie Butcher Premium
const theme = {
  colors: {
    primary: '#0a0a0a',        // Deep black
    secondary: '#1a1a1a',      // Charcoal
    tertiary: '#2d2d2d',       // Dark gray
    surface: '#3a3a3a',        // Medium gray
    accent: '#dc2626',         // Blood red
    accentGold: '#f59e0b',     // Gold
    accentSecondary: '#b91c1c', // Dark red
    text: '#ffffff',           // White
    textSecondary: '#cccccc',   // Light gray
    success: '#10b981',        // Green
    warning: '#f59e0b',        // Orange
    danger: '#ef4444',         // Red
    info: '#3b82f6',           // Blue
  },
  gradients: {
    blood: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    gold: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    premium: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)',
    meat: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
  }
};

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          {/* Header */}
          <header className="bg-gray-900 border-b border-red-500/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🥩</span>
                    </div>
                    <span className="text-xl font-bold text-red-500">The Bookie Butcher</span>
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-8">
                  <Link 
                    to="/" 
                    className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Today's Slaughter
                  </Link>
                  <Link 
                    to="/sports" 
                    className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Weapon Selection
                  </Link>
                  <Link 
                    to="/watchlist" 
                    className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Butcher's Block
                  </Link>
                  <Link 
                    to="/analytics" 
                    className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Slaughterhouse
                  </Link>
                  <Link 
                    to="/settings" 
                    className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    The Locker
                  </Link>
                </nav>

                {/* Live Clock */}
                <LiveClock />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<TodayDashboard />} />
              <Route path="/sports" element={<SportsLines />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 border-t border-red-500/20 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  The Bookie Butcher - Professional Sports Analytics Platform
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Powered by mathematical slaughter • For analytical purposes only
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;