"""
The Bookie Butcher - Backend API
Professional Sports Analytics Platform
"""

import asyncio
import json
import os
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
import aioredis
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
from contextlib import asynccontextmanager

# Pydantic Models
class Prediction(BaseModel):
    prediction_id: str
    player_name: str
    team: str
    sport: str
    stat_type: str
    line_value: float
    recommendation: str
    confidence: float
    analysis: str
    reasoning: str
    edge_percentage: float
    confidence_level: str
    posted_at: str

class Prop(BaseModel):
    prop_id: str
    event_id: str
    player_name: str
    sport: str
    stat_type: str
    line_value: float
    recommendation: str
    confidence: float
    reasoning: str
    edge_percentage: float
    posted_at: str

class TimeResponse(BaseModel):
    server_utc: str
    server_timezone: str = "UTC"

# Global variables
redis_pool = None
active_connections: List[WebSocket] = []

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global redis_pool
    redis_pool = await aioredis.create_redis_pool("redis://localhost:6379")
    print("🥩 Butcher connected to Redis cache")
    yield
    # Shutdown
    if redis_pool:
        redis_pool.close()
        await redis_pool.wait_closed()
    print("🔪 Butcher shutdown complete")

# FastAPI app
app = FastAPI(
    title="The Bookie Butcher API",
    description="Professional PrizePicks Analytics Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

# Sample data for demonstration
SAMPLE_PREDICTIONS = [
    Prediction(
        prediction_id="bb-001",
        player_name="LeBron James",
        team="LAL",
        sport="nba",
        stat_type="Points",
        line_value=24.5,
        recommendation="OVER",
        confidence=0.92,
        analysis="Advanced mathematical slaughter based on comprehensive analysis",
        reasoning="LeBron James is operating at EXECUTION LEVEL dominance. Home court advantage provides +3.1 PPG average that becomes lethal in playoff atmosphere. Opponent defense ranks 27th in points allowed to small forwards (28.4 PPG), creating a feast opportunity. Lakers offense channels through LeBron with +4.2% usage rate increase in high-stakes games. Recent form shows 27.8 PPG over last 5 games with 31.2% usage rate. Interior defense surrendering 1.31 points per possession creates optimal scoring conditions.",
        edge_percentage=0.31,
        confidence_level="EXECUTION",
        posted_at="2025-10-31T13:20:00Z"
    ),
    Prediction(
        prediction_id="bb-002",
        player_name="Josh Allen",
        team="BUF",
        sport="nfl",
        stat_type="Passing Yards",
        line_value=249.5,
        recommendation="UNDER",
        confidence=0.82,
        analysis="DEMOLITION LEVEL prediction based on historical road performance",
        reasoning="Josh Allen's road passer rating undergoes MASSACRE against elite defenses. Road performance drops to 84.7 QBR (vs 105.1 at home), representing a 20.4-point decline. Opponent possesses top-5 defense allowing only 6.2 YPA to opposing quarterbacks. Weather warfare intensifies with 18+ mph winds forecasted, historically limiting aerial production. Bills lean heavily on ground game in windy conditions, averaging 42 carries and 198 rushing yards in games with 15+ mph winds.",
        edge_percentage=0.18,
        confidence_level="DEMOLITION",
        posted_at="2025-10-31T14:45:00Z"
    ),
    Prediction(
        prediction_id="bb-003",
        player_name="Victor Wembanyama",
        team="SAS",
        sport="nba",
        stat_type="Blocks",
        line_value=3.5,
        recommendation="OVER",
        confidence=0.88,
        analysis="DEMOLITION LEVEL prediction based on matchup and recent form",
        reasoning="Wembanyama's block rate SUFFOCATES opposing offenses at home. 3.8 blocks per game average in San Antonio with 6.2% block rate (highest in NBA). Opponent field goal attempts in paint: 48.2 per game, creating maximum rejection opportunities. Recent 5-game average: 4.2 BPG with 7.8% block rate. Home court crowd energy amplifies defensive intensity (+15% block rate). Matchup factor: opponent ranks 29th in interior scoring efficiency (1.18 PPP), forcing more paint attempts.",
        edge_percentage=0.24,
        confidence_level="DEMOLITION",
        posted_at="2025-10-31T15:10:00Z"
    ),
    Prediction(
        prediction_id="bb-004",
        player_name="Christian McCaffrey",
        team="SF",
        sport="nfl",
        stat_type="Rushing Yards",
        line_value=85.5,
        recommendation="OVER",
        confidence=0.79,
        analysis="MEAT LEVEL prediction with solid underlying factors",
        reasoning="McCaffrey's ground game DOMINATES against soft defensive fronts. 6.2 YPC average at home with 89.3 rushing yards per game this season. Opponent allows 4.8 YPC to running backs and ranks 25th in run defense efficiency. 49ers offensive line creating 2.3 yards before contact on average. Game script favors CMC with 78% chance of positive game flow (leading by 7+ points). Weather conditions optimal for ground and pound (no precipitation, light winds).",
        edge_percentage=0.15,
        confidence_level="MEAT",
        posted_at="2025-10-31T16:30:00Z"
    ),
    Prediction(
        prediction_id="bb-005",
        player_name="Cade Cunningham",
        team="DET",
        sport="nba",
        stat_type="Assists",
        line_value=7.5,
        recommendation="UNDER",
        confidence=0.74,
        analysis="MEAT LEVEL prediction based on assist conversion rates",
        reasoning="Cunningham's assist production STRUGGLES against elite defensive teams. 6.8 assists per game average with declining trend over last 10 games (6.1 APG). Opponent ranks top-10 in assist defense, averaging 4.2 deflections per game and 8.1 steals per game. Pistons shot selection: only 18.3% of shots assisted (bottom-5 NBA), limiting assist opportunities. Recent form shows assist drought: 4.7 APG over last 5 games.",
        edge_percentage=0.12,
        confidence_level="MEAT",
        posted_at="2025-10-31T17:45:00Z"
    )
]

# API Routes

@app.get("/", response_model=Dict[str, str])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "🥩 The Bookie Butcher API",
        "version": "1.0.0",
        "status": "Professional Sports Analytics Platform",
        "docs": "/docs"
    }

@app.get("/v1/time", response_model=TimeResponse)
async def get_server_time():
    """Get current server time for client synchronization"""
    now = datetime.now(timezone.utc)
    return TimeResponse(
        server_utc=now.isoformat(),
        server_timezone="UTC"
    )

@app.get("/v1/predictions/today", response_model=List[Prediction])
async def get_today_predictions(
    sport: Optional[str] = None,
    confidence: Optional[str] = None,
    min_edge: Optional[float] = 0.0
):
    """Get today's slaughter predictions"""
    predictions = SAMPLE_PREDICTIONS.copy()
    
    # Filter by sport
    if sport and sport != "all":
        predictions = [p for p in predictions if p.sport.lower() == sport.lower()]
    
    # Filter by confidence level
    if confidence:
        confidence_map = {
            "execution": "EXECUTION",
            "demolition": "DEMOLITION", 
            "meat": "MEAT",
            "scrap": "SCRAP"
        }
        if confidence in confidence_map:
            level = confidence_map[confidence]
            predictions = [p for p in predictions if p.confidence_level == level]
    
    # Filter by minimum edge
    if min_edge > 0:
        predictions = [p for p in predictions if p.edge_percentage >= min_edge]
    
    return predictions

@app.get("/v1/predictions/{prediction_id}", response_model=Prediction)
async def get_prediction(prediction_id: str):
    """Get detailed prediction with full analysis"""
    prediction = next((p for p in SAMPLE_PREDICTIONS if p.prediction_id == prediction_id), None)
    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return prediction

@app.get("/v1/props/live", response_model=List[Prop])
async def get_live_props():
    """Get live PrizePicks lines"""
    # Convert predictions to props for live feed
    props = []
    for pred in SAMPLE_PREDICTIONS:
        prop = Prop(
            prop_id=pred.prediction_id,
            event_id=f"event-{pred.prediction_id}",
            player_name=pred.player_name,
            sport=pred.sport,
            stat_type=pred.stat_type,
            line_value=pred.line_value,
            recommendation=pred.recommendation,
            confidence=pred.confidence,
            reasoning=pred.reasoning,
            edge_percentage=pred.edge_percentage,
            posted_at=pred.posted_at
        )
        props.append(prop)
    return props

@app.get("/v1/events")
async def get_events():
    """Get events for specific date"""
    # Sample events data
    return {
        "events": [
            {
                "event_id": "nba-2025-10-31-001",
                "sport": "nba",
                "home_team": "LAL",
                "away_team": "MIA",
                "start_time_utc": "2025-10-31T23:30:00Z",
                "venue": "Crypto.com Arena",
                "status": "scheduled"
            },
            {
                "event_id": "nfl-2025-10-31-001",
                "sport": "nfl", 
                "home_team": "PHI",
                "away_team": "BUF",
                "start_time_utc": "2025-10-31T18:00:00Z",
                "venue": "Lincoln Financial Field",
                "status": "scheduled"
            }
        ]
    }

# WebSocket endpoint
@app.websocket("/ws/props")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time slaughter updates"""
    await manager.connect(websocket)
    try:
        # Send welcome message
        welcome_message = {
            "type": "connection",
            "message": "🥩 Butcher connected to slaughter feed",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await manager.send_personal_message(json.dumps(welcome_message), websocket)
        
        # Send sample update
        sample_update = {
            "type": "carnage_update",
            "payload": {
                "prediction_id": "bb-001",
                "player": "LeBron James",
                "stat": "Points", 
                "line": 24.5,
                "recommendation": "OVER",
                "confidence": 0.92,
                "analysis": "Advanced mathematical slaughter based on comprehensive analysis",
                "edge": 0.31,
                "level": "EXECUTION"
            },
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await manager.send_personal_message(json.dumps(sample_update), websocket)
        
        # Keep connection alive
        while True:
            try:
                data = await websocket.receive_text()
                # Echo back for testing
                echo_message = {
                    "type": "echo",
                    "message": data,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
                await manager.send_personal_message(json.dumps(echo_message), websocket)
            except WebSocketDisconnect:
                break
            except Exception as e:
                print(f"WebSocket error: {e}")
                break
                
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(websocket)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse(
        status_code=200,
        content={
            "status": "healthy",
            "service": "The Bookie Butcher API",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "features": [
                "Real-time slaughter predictions",
                "WebSocket live updates", 
                "Mathematical edge analysis",
                "Sport-specific terminology"
            ]
        }
    )

# Stats endpoint
@app.get("/v1/stats")
async def get_platform_stats():
    """Get platform statistics"""
    return {
        "total_predictions": len(SAMPLE_PREDICTIONS),
        "execution_level": len([p for p in SAMPLE_PREDICTIONS if p.confidence_level == "EXECUTION"]),
        "demolition_level": len([p for p in SAMPLE_PREDICTIONS if p.confidence_level == "DEMOLITION"]),
        "meat_level": len([p for p in SAMPLE_PREDICTIONS if p.confidence_level == "MEAT"]),
        "avg_confidence": sum(p.confidence for p in SAMPLE_PREDICTIONS) / len(SAMPLE_PREDICTIONS),
        "avg_edge": sum(p.edge_percentage for p in SAMPLE_PREDICTIONS) / len(SAMPLE_PREDICTIONS),
        "sports_supported": list(set(p.sport for p in SAMPLE_PREDICTIONS)),
        "last_updated": datetime.now(timezone.utc).isoformat()
    }

# Background task for broadcasting updates
async def broadcast_updates():
    """Background task to broadcast periodic updates"""
    while True:
        try:
            # Send periodic update
            update_message = {
                "type": "heartbeat",
                "message": "Slaughter feed active",
                "connected_clients": len(manager.active_connections),
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
            await manager.broadcast(json.dumps(update_message))
            
            # Wait 30 seconds before next broadcast
            await asyncio.sleep(30)
            
        except Exception as e:
            print(f"Broadcast error: {e}")
            await asyncio.sleep(5)

# Start background tasks
@app.on_event("startup")
async def startup_event():
    """Start background tasks on startup"""
    asyncio.create_task(broadcast_updates())
    print("🚀 Butcher server started successfully")

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )