-- The Bookie Butcher - Database Initialization Script
-- Professional Sports Analytics Platform

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create schemas
CREATE SCHEMA IF NOT EXISTS butchery;
CREATE SCHEMA IF NOT EXISTS analytics;

-- Create enum types
CREATE TYPE confidence_level AS ENUM ('EXECUTION', 'DEMOLITION', 'MEAT', 'SCRAP');
CREATE TYPE sport_type AS ENUM ('nba', 'nfl', 'cbb', 'nhl');
CREATE TYPE recommendation_type AS ENUM ('OVER', 'UNDER');

-- Create tables in butchery schema
CREATE TABLE butchery.players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    team VARCHAR(50) NOT NULL,
    position VARCHAR(20),
    sport sport_type NOT NULL,
    external_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE butchery.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id VARCHAR(100) UNIQUE NOT NULL,
    sport sport_type NOT NULL,
    home_team VARCHAR(50) NOT NULL,
    away_team VARCHAR(50) NOT NULL,
    start_time_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    venue VARCHAR(255),
    status VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE butchery.predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prediction_id VARCHAR(100) UNIQUE NOT NULL,
    player_id UUID REFERENCES butchery.players(id) ON DELETE CASCADE,
    event_id UUID REFERENCES butchery.events(id) ON DELETE CASCADE,
    stat_type VARCHAR(100) NOT NULL,
    line_value DECIMAL(10,2) NOT NULL,
    recommendation recommendation_type NOT NULL,
    confidence DECIMAL(5,4) NOT NULL,
    confidence_level confidence_level NOT NULL,
    analysis TEXT,
    reasoning TEXT NOT NULL,
    edge_percentage DECIMAL(5,4) NOT NULL,
    posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE butchery.prop_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prediction_id UUID REFERENCES butchery.predictions(id) ON DELETE CASCADE,
    line_value DECIMAL(10,2) NOT NULL,
    market_value DECIMAL(6,2),
    posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    source VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE butchery.scrape_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sport sport_type NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    finished_at TIMESTAMP WITH TIME ZONE,
    success BOOLEAN NOT NULL DEFAULT false,
    records_processed INTEGER DEFAULT 0,
    records_created INTEGER DEFAULT 0,
    records_updated INTEGER DEFAULT 0,
    error_message TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics schema tables
CREATE TABLE analytics.performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prediction_id UUID REFERENCES butchery.predictions(id) ON DELETE CASCADE,
    actual_result DECIMAL(10,2),
    hit BOOLEAN,
    profit_loss DECIMAL(10,2),
    evaluation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE analytics.user_watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- For future user management
    prediction_id UUID REFERENCES butchery.predictions(id) ON DELETE CASCADE,
    alert_price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, prediction_id)
);

CREATE TABLE analytics.system_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    total_predictions INTEGER DEFAULT 0,
    execution_level INTEGER DEFAULT 0,
    demolition_level INTEGER DEFAULT 0,
    meat_level INTEGER DEFAULT 0,
    avg_confidence DECIMAL(5,4),
    avg_edge DECIMAL(5,4),
    accuracy_rate DECIMAL(5,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- Create indexes for performance
CREATE INDEX idx_predictions_sport ON butchery.predictions(sport);
CREATE INDEX idx_predictions_confidence_level ON butchery.predictions(confidence_level);
CREATE INDEX idx_predictions_posted_at ON butchery.predictions(posted_at);
CREATE INDEX idx_predictions_status ON butchery.predictions(status);
CREATE INDEX idx_predictions_event_player ON butchery.predictions(event_id, player_id);
CREATE INDEX idx_events_sport_date ON butchery.events(sport, start_time_utc);
CREATE INDEX idx_prop_history_prediction ON butchery.prop_history(prediction_id);
CREATE INDEX idx_prop_history_posted_at ON butchery.prop_history(posted_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create updated_at triggers
CREATE TRIGGER update_butchery_players_updated_at 
    BEFORE UPDATE ON butchery.players 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_butchery_predictions_updated_at 
    BEFORE UPDATE ON butchery.predictions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create sample data for demonstration
INSERT INTO butchery.players (name, team, position, sport, external_id) VALUES
('LeBron James', 'LAL', 'SF', 'nba', 'lebron-james-lal'),
('Victor Wembanyama', 'SAS', 'C', 'nba', 'victor-wembanyama-sas'),
('Josh Allen', 'BUF', 'QB', 'nfl', 'josh-allen-buf'),
('Christian McCaffrey', 'SF', 'RB', 'nfl', 'christian-mccaffrey-sf'),
('Cade Cunningham', 'DET', 'PG', 'nba', 'cade-cunningham-det');

INSERT INTO butchery.events (event_id, sport, home_team, away_team, start_time_utc, venue, status) VALUES
('nba-2025-10-31-001', 'nba', 'LAL', 'MIA', '2025-10-31T23:30:00Z', 'Crypto.com Arena', 'scheduled'),
('nba-2025-10-31-002', 'nba', 'SAS', 'DAL', '2025-11-01T01:00:00Z', 'Frost Bank Center', 'scheduled'),
('nba-2025-10-31-003', 'nba', 'DET', 'CHI', '2025-10-31T20:00:00Z', 'Little Caesars Arena', 'scheduled'),
('nfl-2025-10-31-001', 'nfl', 'PHI', 'BUF', '2025-10-31T18:00:00Z', 'Lincoln Financial Field', 'scheduled'),
('nfl-2025-10-31-002', 'nfl', 'SF', 'KC', '2025-10-31T21:25:00Z', 'Levi\'s Stadium', 'scheduled');

-- Create a view for active predictions with player and event details
CREATE VIEW butchery.active_predictions AS
SELECT 
    p.prediction_id,
    pl.name as player_name,
    pl.team,
    p.sport,
    e.home_team,
    e.away_team,
    e.start_time_utc,
    e.venue,
    p.stat_type,
    p.line_value,
    p.recommendation,
    p.confidence,
    p.confidence_level,
    p.analysis,
    p.reasoning,
    p.edge_percentage,
    p.posted_at,
    p.expires_at
FROM butchery.predictions p
JOIN butchery.players pl ON p.player_id = pl.id
JOIN butchery.events e ON p.event_id = e.id
WHERE p.status = 'active'
ORDER BY p.confidence DESC, p.edge_percentage DESC;

-- Create functions for common queries
CREATE OR REPLACE FUNCTION get_todays_predictions(sport_filter TEXT DEFAULT 'all')
RETURNS TABLE(
    prediction_id VARCHAR,
    player_name VARCHAR,
    team VARCHAR,
    sport VARCHAR,
    stat_type VARCHAR,
    line_value DECIMAL,
    recommendation VARCHAR,
    confidence DECIMAL,
    confidence_level VARCHAR,
    analysis TEXT,
    reasoning TEXT,
    edge_percentage DECIMAL,
    posted_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ap.prediction_id,
        ap.player_name,
        ap.team,
        ap.sport::VARCHAR,
        ap.stat_type,
        ap.line_value,
        ap.recommendation::VARCHAR,
        ap.confidence,
        ap.confidence_level::VARCHAR,
        ap.analysis,
        ap.reasoning,
        ap.edge_percentage,
        ap.posted_at
    FROM butchery.active_predictions ap
    WHERE (sport_filter = 'all' OR ap.sport::VARCHAR = sport_filter)
    AND DATE(ap.posted_at) = CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT USAGE ON SCHEMA butchery TO bookie;
GRANT USAGE ON SCHEMA analytics TO bookie;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA butchery TO bookie;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA analytics TO bookie;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA butchery TO bookie;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA analytics TO bookie;

-- Comment on tables
COMMENT ON TABLE butchery.players IS 'Player information and canonical mapping';
COMMENT ON TABLE butchery.events IS 'Sports events and game information';
COMMENT ON TABLE butchery.predictions IS 'Main predictions table with butcher analysis';
COMMENT ON TABLE butchery.prop_history IS 'Historical line movement tracking';
COMMENT ON TABLE butchery.scrape_runs IS 'Scraper execution tracking and monitoring';
COMMENT ON TABLE analytics.performance_metrics IS 'Prediction performance tracking';
COMMENT ON TABLE analytics.user_watchlists IS 'User saved predictions and alerts';
COMMENT ON TABLE analytics.system_stats IS 'Daily aggregated system statistics';

-- Database initialization complete
INSERT INTO analytics.system_stats (date, total_predictions, execution_level, demolition_level, meat_level)
VALUES (CURRENT_DATE, 0, 0, 0, 0)
ON CONFLICT (date) DO NOTHING;